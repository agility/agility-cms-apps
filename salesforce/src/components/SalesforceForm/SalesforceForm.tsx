import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import { ReactSortable } from "react-sortablejs";
import { InformationCircleIcon } from '@heroicons/react/solid'

import { useForm } from "../../hooks/useForm";
import { actionURL } from "../../constants/formData";
import { Checkbox } from "../Checkbox";
import { InputText } from "../InputText";
import { Description } from "../Description";

interface FieldConfig {
  label?: string,
  required?: boolean,
  description?: string
  readOnly?: boolean
}

const DEFAULT_RETURN_URL = 'https://www.agilitycms.com/';
const DEFAULT_SUBMIT_TEXT = 'Submit';

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [configValues, setConfigValues] = useState<{ leadOID: string } | null>(null);
  const [sdk, setSDK] = useState<any>({});
  const [form, setForm, updateForms] = useForm();
  const [retURL, setRetURL] = useState<string>('');
  const [submitText, setSubmitText] = useState<string>('');

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
      const { formData, retURL, submitText } = JSON.parse(value)
      setForm(formData);
      setRetURL(retURL !== '' ? retURL : '');
      setSubmitText(submitText !== '' ? submitText : '');
    };
  }, [value, setForm]);

  // build form data payload on dependency change
  useEffect(() => {
    (() => {
      let payload = {
        formData: form,
        leadOID: configValues?.leadOID,
        actionURL,
        retURL,
        submitText
      };
      // if there are no fields selected return a falsy value to trigger a required field error
      const shouldFormSave = form?.some((field: any) => field.isSelected === true);
      sdk.updateFieldValue && sdk.updateFieldValue({ fieldValue: shouldFormSave ? JSON.stringify(payload) : '' });
    })();
  }, [form, retURL, submitText]);

  return (
    <div className="field-row" ref={containerRef}>
      <label className="flex mb-1 text-sm">
        <span>{fieldConfig?.label}</span>
        {fieldConfig?.required && <span className="pl-1 text-red-500">*</span>}
        {fieldConfig?.description &&
          <small className="inline" title={fieldConfig?.description}>
            <InformationCircleIcon className="inline-block h-4 pl-1 text-gray-500" />
          </small>
        }
      </label>
      <div className="border-border border-[1px] pb-3 px-3">
        <fieldset>
          <label className="inline-block pt-4 pr-2 text-sm font-bold">Available fields</label>
          <Description text="Choose the fields that will appear on your lead form" />
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
          placeholder={DEFAULT_RETURN_URL}
          description="The return URL after submitting the form"
          handleChange={setRetURL}
        />
        <InputText
          type="text"
          name="Submit text"
          value={submitText}
          id="submitText"
          isDisabled={fieldConfig?.readOnly}
          placeholder={DEFAULT_SUBMIT_TEXT}
          description="Submit button text"
          handleChange={setSubmitText}
        />
      </div>
    </div>
  );
}