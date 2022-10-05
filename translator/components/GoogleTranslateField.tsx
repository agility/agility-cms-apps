import { useEffect, useRef, useState } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import languages from "../data/locales.json";
import { Checkbox, Select, Button } from "@agility/plenum-ui";

interface FieldConfig {
  label?: string;
  required?: boolean;
  description?: string;
  readOnly?: boolean;
}

interface ContentItem {
  contentID: number;
  referenceName: string;
  values: { [id: string]: any };
}

interface ContentField {
  label: string;
  name: string;
  dataField: boolean;
  description: string;
  designerOnly: boolean;
  editable: boolean;
  fieldType: string;
  hidden: boolean;
  itemOrder: number;
}

interface ContentModel {
  modelID: number;
  title: string;
  referenceName: string;
  fields: [ContentField];
}

export default function GoogleTranslateField() {
  const [value, setValue] = useState("");
  const [contentItem, setContentItem] = useState<ContentItem | null>(null);
  const [contentModel, setContentModel] = useState<ContentModel | null>(null);
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [configValues, setConfigValues] = useState<{ leadOID: string } | null>(
    null
  );
  const [sdk, setSDK] = useState<any>({});
  const [locale, setLocale] = useState<any>(null);
  const [processing, setProcessing] = useState(false);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const [detected, setDetected] = useState(false);
  const [needsTranslation, setNeedsTranslation] = useState(false);
  const [userFields, setUserFields] = useState<ContentField[]>([]);
  const [selectedFields, setSelectedFields] = useState<ContentField[]>([]);

  // set ref
  const containerRef = useRef(null);

  // function to handle filtering contentModel fields
  const fitlerTranslatableFields = (array: ContentField[]) => {
    return array.filter(
      (field: ContentField) =>
        field.dataField &&
        !field.hidden &&
        (field.fieldType === "Text" ||
          field.fieldType === "HTML" ||
          field.fieldType === "LongText")
    );
  };
  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK: any) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
      setContentItem(fieldSDK.contentItem);
      setContentModel(fieldSDK.contentModel);
      setUserFields(fitlerTranslatableFields(fieldSDK.contentModel?.fields));
      !selectedFields.length &&
        setSelectedFields(
          fitlerTranslatableFields(fieldSDK.contentModel?.fields)
        );
      let languageCode: string = fieldSDK.locale;
      if (languageCode.length > 2)
        languageCode = languageCode.substring(0, 2).toLowerCase();

      changeLocale(languageCode);

      //on load, we should be checking the language of the content against the current language
      // and HIDE this if we do NOT need to translate it
      detectCurrentLanguage(fieldSDK, languageCode);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeLocale = (languageCode: string) => {
    console.log(languageCode);
    if (!languageCode) {
      setLocale(null);
    } else {
      const theLocale = languages.find((l) => l.code === languageCode);
      if (theLocale) setLocale(theLocale);
    }
  };

  const detectCurrentLanguage = async (fieldSDK: any, languageCode: string) => {
    try {
      const item: ContentItem = fieldSDK.contentItem;

      if (item.contentID < 1) return;

      const model: ContentModel = fieldSDK.contentModel;
      let body: any = {
        configValues: fieldSDK.configValues,
        textValues: {},
      };

      //loop all the field fields and pull out the text or html that are NOT hidden
      fitlerTranslatableFields(model?.fields).forEach((field) => {
        body.textValues[field.name] = item.values[field.name];
      });

      //send the request to our translation function....
      const res = await axios.post("/api/detect", body);

      if (res.data?.detectedLanguage !== languageCode) {
        setNeedsTranslation(true);
      } else {
        console.log(
          "detected lang: ",
          res.data?.detectedLanguage,
          "current lang: ",
          languageCode
        );
      }
    } catch (error) {
      //TODO: figure out how to show an error message here...
      console.error("An error occurred while detecting language: ", error);
    } finally {
      setDetected(true);
    }
  };

  const translate = async () => {
    if (!locale) {
      //TODO: show an error here...
      setErrorMsg("Please select a locale to translate to.");
      return;
    }
    if (!selectedFields.length) {
      setErrorMsg("Please select field(s) to translate.");
      return;
    }
    setProcessing(true);
    setErrorMsg(null);

    try {
      const item: ContentItem = await sdk.getContentItem();
      let body: any = {
        locale: locale.code,
        configValues,
        textValues: {},
      };
      //loop all the user selected field fields and pull out the text or html that are NOT hidden
      selectedFields.forEach((field) => {
        body.textValues[field.name] = item.values[field.name];
      });
      //send the request to our translation function....
      const res = await axios.post("/api/translate", body);
      let fieldsUpdateCount = 0;
      for (let fieldName in res.data.values) {
        const fieldValue = res.data.values[fieldName];

        if (fieldValue) {
          sdk.updateFieldValue({ fieldName, fieldValue });
          fieldsUpdateCount++;
        }
      }

      setMsg(`${fieldsUpdateCount} field(s) updated.`);
    } catch (error) {
      setErrorMsg("An error occurred while translating.");
      console.error("An error occurred while translating: ", error);
    } finally {
      setProcessing(false);
    }
  };
  const handleFieldChange = (field: ContentField) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  return (
    <div
      className='border-l-[3px] pl-3 transition-all border-l-gray-300  focus-within:border-l-purple-600 hover:border-l-purple-600'
      ref={containerRef}
    >
      {(contentItem?.contentID || 0) > 0 && !detected && (
        <div className='text-xs'>Detecting current language...</div>
      )}
      {(contentItem?.contentID || 0) > 0 && needsTranslation && (
        <div className='border border-gray-300 rounded p-3'>
          <div className='flex items-center justify-between pb-2'>
            <div className='text-base font-medium text-gray-700'>
              GOOGLE TRANSLATE
            </div>
            {errorMsg && (
              <div className='rounded  px-2.5 py-0.5 text-xs font-normal text-gray-800 bg-red-100'>
                {errorMsg}{" "}
              </div>
            )}
            {!errorMsg && msg && (
              <div className='rounded  px-2.5 py-0.5 text-xs font-normal text-gray-800 bg-green-100'>
                {msg}{" "}
              </div>
            )}
          </div>
          {userFields ? (
            <fieldset className='grid gap-2 grid-cols-2'>
              {userFields.map((field) => (
                <Checkbox
                  label={field.label}
                  key={field.name}
                  isChecked={selectedFields.includes(field)}
                  onChange={() => handleFieldChange(field)}
                />
              ))}
            </fieldset>
          ) : (
            setErrorMsg("Error getting fields")
          )}
          <div className=''>
            <Select
              value={locale?.code}
              onChange={(value: string) => changeLocale(value)}
              id='selectLanguage'
              name='select'
              label='Select Language'
              options={[
                { label: "Select Locale", value: "" },
                ...languages.map((lang) => ({
                  label: lang.name,
                  value: lang.code,
                })),
              ]}
            />
            <div>
              <Button
                onClick={() => translate()}
                type='primary'
                icon='TranslateIcon'
                isDisabled={processing}
                isLoading={processing}
                title={!processing ? "Translate" : "Processing"}
                label={!processing ? "Translate" : "Processing"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
