import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import { ReactSortable } from "react-sortablejs";
import { InformationCircleIcon } from '@heroicons/react/solid'

import { useForm } from "../../hooks/useForm";
import { actionURL } from "../../contstants/formData";
import { Checkbox } from "../Checkbox";
import { InputText } from "../InputText";

interface FieldConfig {
  label?: string,
  required?: boolean,
  description?: string
  readOnly?: boolean
}

const DEFAULT_RETURNURL = 'https://www.agilitycms.com/';

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [configValues, setConfigValues] = useState<{ leadOID: string } | null>(null);
  const [sdk, setSDK] = useState<any>({});
  const [form, setForm, updateForms] = useForm();
  const [retURL, setRetURL] = useState<string>('');

  // set ref
  const containerRef = useRef(null);

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK: any) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  useEffect(() => {
    // fetch data saved by sdk and populate the form builder
    if (value) {
      const {formData, retURL} = JSON.parse(value)
      setForm(formData);
      setRetURL(retURL !== DEFAULT_RETURNURL ? retURL : '');
    };
  }, [value, setForm]);

  // include form action and OID in the data to save
  useEffect(() => {
    (()=> {
      let payload = {
        formData: form,
        leadOID: configValues?.leadOID,
        actionURL,
        retURL
      };
      // if there are no fields selected return a falsy value to trigger a required field error
      const shouldFormSave = form?.some((field: any) => field.isSelected === true);
      sdk.updateFieldValue && sdk.updateFieldValue({ fieldValue: shouldFormSave ? JSON.stringify(payload) : '' });
    })();
  }, [form, retURL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const returnURL = e.target.value;
    setRetURL(returnURL !== '' ? returnURL : DEFAULT_RETURNURL);
  }

  return (
    <div className="field-row" ref={containerRef}>
      <label className="flex text-sm">
        <span>{fieldConfig?.label}</span>
        {fieldConfig?.required && <span className="pl-1 text-red-500">*</span>}
        {fieldConfig?.description &&
          <small className="inline" title={fieldConfig?.description}>
            <InformationCircleIcon className="inline-block h-4 pl-1 text-gray-500" />
          </small>
        }
      </label>
      <div className="border-border border-[1px] py-2 px-3">
        <fieldset>
          <div className="pl-2 mt-2 overflow-y-auto border border-gray-200 divide-y divide-gray-200 max-h-96">
            <ReactSortable list={form} setList={setForm} handle=".sortButton" onEnd={() => setForm(form)}>
              {form?.map((field) => (
                <Checkbox
                  key={field.id}
                  id={field.id}
                  name={field.name}
                  isDisabled={fieldConfig?.readOnly}
                  isChecked={field.isSelected}
                  handleChange={() => updateForms(field.id)}
                />
              ))}
            </ReactSortable>
          </div>
        </fieldset>
        <InputText
          type="text"
          name="Return URL"
          value={retURL}
          id="retURL"
          isDisabled={fieldConfig?.readOnly}
          placeholder={DEFAULT_RETURNURL}
          handleChange={handleInputChange}
        />
      </div>
    </div>
  );
}