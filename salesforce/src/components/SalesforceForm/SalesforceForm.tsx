import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import { ReactSortable } from "react-sortablejs";
import { InformationCircleIcon } from '@heroicons/react/solid'

import { useForm } from "../../hooks/useForm";
import { actionURL } from "../../contstants/formData";
import { Checkbox } from "../Checkbox";

interface FieldConfig {
  label?: string,
  required?: boolean,
  description?: string
  readOnly?: boolean
}

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [configValues, setConfigValues] = useState<{ leadOID: string } | null>(null);
  const [sdk, setSDK] = useState<any>({});
  const [form, setForm, updateForms] = useForm();

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
    if (value) setForm(JSON.parse(value)?.formData)
  }, [value, setForm]);

  // include form action and OID in the data to save
  const parseSaveData = (formData: any): void => {
    let payload = {
      formData,
      leadOID: configValues?.leadOID,
      actionURL
    };
    // if there are no fields selected return a falsy value to trigger a required field error
    const shouldFormSave = formData?.some((field: any) => field.isSelected === true);
    sdk.updateFieldValue({ fieldValue: shouldFormSave ? JSON.stringify(payload) : '' });
  };

  const handleChange = (id: string) => {
    // update the form with the selected item and save
    updateForms(id);
    parseSaveData(form);
  };

  const handleReorder = () => {
    // update the form with the re-arranged list
    setForm(form);
    parseSaveData(form);
  };

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
      <fieldset>
        <div className="mt-2 overflow-y-auto border-t border-b border-gray-200 divide-y divide-gray-200 max-h-96">
          <ReactSortable list={form} setList={setForm} handle=".sortButton" onEnd={handleReorder}>
            {form?.map((field) => (
              <Checkbox
                key={field.id}
                id={field.id}
                name={field.name}
                isDisabled={fieldConfig?.readOnly}
                isChecked={field.isSelected}
                handleChange={() => handleChange(field.id)}
              />
            ))}
          </ReactSortable>
        </div>
      </fieldset>
    </div>
  );
}