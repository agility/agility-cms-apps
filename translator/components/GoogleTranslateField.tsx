import { useEffect, useRef, useState } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import languages from "../data/locales.json";
import { Checkbox, Select, Button, Dropdown } from "@agility/plenum-ui";
import { IconChevronDown } from "@tabler/icons";

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
  const [languageCode, setLanguageCode] = useState<string>("");

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
      setLanguageCode(languageCode);
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
      className='border-l-[3px] pl-3 transition-all border-l-gray-300 font-muli  focus-within:border-l-purple-600 hover:border-l-purple-600'
      ref={containerRef}
    >
      <header className='flex justify-between items-center w-full'>
        <h2 className='text-gray-700'>Google Translate</h2>
        <Button
          onClick={() => {
            console.log(locale.code);
            translate();
          }}
          type='secondary'
          icon='TranslateIcon'
          size='sm'
          isDisabled={processing || !selectedFields.length}
          isLoading={processing}
          title={!processing ? "Translate" : "Processing"}
          label={!processing ? "Translate" : "Processing"}
        />
      </header>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quos unde
      nam ipsam repellendus quod vel temporibus dignissimos assumenda. Quidem
      repellendus dolores quibusdam porro, obcaecati minus autem qui atque magni
      necessitatibus culpa, pariatur neque inventore odio commodi eveniet.
      Nobis, debitis officia! In blanditiis tenetur eligendi hic iste, numquam
      sint explicabo vitae quibusdam necessitatibus aut libero animi molestiae
      consectetur doloribus! Facilis dolor, ut eaque repellat dolore, officia et
      commodi, culpa est beatae dolorem nobis inventore ipsam consequuntur iure
      laboriosam doloremque. Atque, dolorum tenetur nobis error tempora
      molestiae quam modi, deserunt explicabo provident dolore eaque aut
      similique distinctio tempore cupiditate esse doloremque, numquam velit?
      Ipsam nostrum amet, beatae praesentium, error et molestiae quibusdam vel
      nisi, molestias ratione inventore nemo quas ipsa repudiandae consequatur
      corrupti id? Corporis nulla iste, atque possimus aut doloremque et
      tempore? Consequatur facilis perspiciatis, quaerat dolores quis, nihil
      dolor ducimus sequi impedit, eligendi ea quasi modi sed quos iste maxime
      officiis! Laboriosam expedita asperiores quos. Reprehenderit eaque cum
      aperiam tenetur, voluptatem facilis nam. Ipsa voluptatem mollitia
      consequuntur possimus eos numquam voluptatum nisi aliquid libero
      repellendus quia, alias, quasi excepturi, expedita beatae incidunt ex
      saepe. In provident voluptatem blanditiis quo fugit molestias nemo aliquid
      pariatur libero, natus ipsam harum et nobis consequuntur laborum expedita
      cumque quas. Ut fugiat modi tenetur facilis atque aspernatur dolor
      repellendus odio laudantium dolorem, placeat sapiente nobis! Laboriosam
      quam nulla ullam quia magnam dolore porro veniam fuga mollitia, non qui
      error sunt asperiores ab aliquam, illum alias veritatis amet earum optio
      cum labore, corporis deleniti repellat? Pariatur perferendis minima
      provident laborum, iusto illum adipisci rerum quae, nisi, corrupti
      deleniti praesentium. Laudantium doloribus reprehenderit quae tempora, ea
      veritatis veniam possimus! Officiis iure beatae est eius at distinctio
      voluptates ducimus harum repudiandae, modi ex adipisci consequatur ea
      voluptatibus voluptate labore ipsa porro corporis assumenda aliquid vero,
      laudantium tempore. Maiores rerum soluta nihil dicta eligendi iure
      officiis officia, odit voluptatum velit tenetur atque suscipit quaerat
      facilis vitae saepe modi iusto ducimus esse a mollitia. Odio ducimus
      dolore quos aliquid numquam quaerat repellendus autem totam soluta?
      Delectus recusandae quod architecto sapiente blanditiis error laudantium
      suscipit amet repudiandae consectetur officiis placeat praesentium
      asperiores iure, laboriosam iste nemo alias tempore assumenda libero
      impedit quasi voluptas optio. Deserunt rerum illum, voluptates dolores
      inventore tenetur ratione optio asperiores minus soluta natus ad magnam
      assumenda maiores. Ea veniam quo omnis veritatis eligendi vel rerum, esse
      facere aliquam quasi, ipsum consequuntur perferendis libero optio earum
      architecto cum ipsam! Deserunt officiis suscipit aut dolor dolorum nisi
      placeat et incidunt quia assumenda autem, voluptatem nihil asperiores vero
      voluptas facilis ad ab. Vel voluptate facere laboriosam commodi amet quos
      cum. Modi iste doloremque maiores quisquam a quasi? Aliquid, quod
      laboriosam sunt, autem similique error mollitia neque eaque reiciendis
      consequatur laudantium voluptatibus! Earum suscipit dolore sit quibusdam
      dicta aspernatur, saepe molestiae rem praesentium excepturi enim
      distinctio necessitatibus voluptates assumenda ipsa qui incidunt ratione
      quasi commodi impedit delectus illo cupiditate doloribus et. Nam suscipit
      eaque architecto, enim quas ea consequatur excepturi et magnam
      necessitatibus quod facere distinctio eligendi ipsum vero laborum sit. Qui
      numquam eligendi quidem odio nisi perspiciatis soluta fuga tenetur dolor
      hic doloribus, in, debitis nesciunt! Sed nam reiciendis eum eos quasi odio
      tenetur, dolores temporibus fuga amet ipsa ex recusandae velit expedita,
      quisquam magni. Aliquid eligendi quaerat suscipit nostrum dolore, minima
      doloremque vel dolor ullam consequatur incidunt totam pariatur fuga
      repellendus deserunt blanditiis quos, atque in maiores illum quibusdam.
      Atque quis deserunt ratione laboriosam, temporibus eaque expedita
      consequuntur est cumque eius quod debitis culpa error numquam labore.
      Asperiores beatae recusandae vero harum iure impedit natus iste earum, eos
      hic! Nesciunt facere accusamus animi mollitia tempore quod ex molestiae
      tempora unde repellat, quo voluptatibus. Saepe voluptatum odio optio vero
      voluptas quaerat vitae doloribus nostrum consequatur. Excepturi rerum
      eveniet facilis quam voluptates minima atque aspernatur odit tenetur, id
      et iste possimus sit mollitia neque fuga a vero asperiores illum eius.
      Modi rem mollitia voluptate amet eum nisi consequuntur suscipit aliquid
      voluptas culpa? Quasi ab temporibus modi sunt reiciendis dicta sequi
      accusantium labore alias perspiciatis. Molestiae expedita ducimus quos
      illum cum provident eligendi nisi beatae. Delectus repellat excepturi
      consectetur quisquam! Odit, nisi est perferendis odio minima repellendus
      ipsum sequi nulla quis voluptatem, omnis assumenda corporis quisquam
      laborum quia commodi qui hic repellat maxime consequuntur corrupti? Eaque
      optio reiciendis laudantium laborum porro quasi possimus voluptatum est et
      cupiditate quam molestiae, tempore culpa incidunt repellat odit ullam
      neque! Corporis iusto distinctio, quia laudantium repellendus eaque facere
      quis veritatis quaerat doloremque, rem beatae nisi! Vero assumenda
      corporis, delectus voluptate itaque ratione amet debitis ad!
      {(contentItem?.contentID || 0) > 0 && (
        <div className='border border-gray-300 rounded p-3 mt-2 focus-within:border-purple-600'>
          {userFields.length && (
            <fieldset className='flex items-center justify-between flex-wrap '>
              <div>
                <legend className='pb-1 text-sm'>
                  Select the fields you wish to translate.
                  {selectedFields.length === 0 ? (
                    <p className='p-1 bg-red-200 text-red-500 w-max items-center justify-center rounded-sm'>
                      At least one field must be selected to translate
                    </p>
                  ) : msg ? (
                    <p className='p-1 bg-green-200 text-green-500 w-max rounded-sm'>
                      {msg}
                    </p>
                  ) : (
                    ""
                  )}
                </legend>
                <ul className='pt-3 flex gap-4 flex-wrap'>
                  {userFields.map((field) => (
                    <li
                      key={field.label}
                      className=' items-center flex text-sm font-light'
                    >
                      <Checkbox
                        isChecked={selectedFields.includes(field)}
                        onChange={() => handleFieldChange(field)}
                        label=''
                        id={field.name}
                      />
                      <label className='-ml-1 mr-1' htmlFor={field.name}>
                        {field.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
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
              </div>
            </fieldset>
          )}
        </div>
      )}
    </div>
  );
}
