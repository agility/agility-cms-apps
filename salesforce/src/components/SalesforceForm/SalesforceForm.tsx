import React, { useEffect, useState, useRef, useCallback } from "react";
import agilityAppSDK from "@agility/app-sdk";
import { ReactSortable } from "react-sortablejs";
import { MenuIcon, InformationCircleIcon } from '@heroicons/react/solid'

import { useForm } from "../../hooks/useForm";

interface FieldConfig {
  label?: string,
  required?: boolean,
  description?: string
}

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null);
  const [configValues, setConfigValues] = useState({});
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
    if(value) setForm(JSON.parse(value))
  }, [value, setForm]);

  const handleChange = useCallback((id: string) => {
    // update the form with the selected item and save
    updateForms(id)
    sdk.updateFieldValue({ fieldValue: JSON.stringify(form) });
  }, [form, sdk, updateForms]);

  const handleReorder = () => {
    // update the form with the re-arranged list
    setForm(form);
    sdk.updateFieldValue({ fieldValue: JSON.stringify(form) });
  };

  return (
    <div className="field-row" ref={containerRef}>
      <label className="flex text-sm">
        <span>{fieldConfig?.label}</span>
        {fieldConfig?.required && <span className="pl-1 text-red-500">*</span>}
        {fieldConfig?.description && 
          <small className="inline" title={fieldConfig?.description}>
            <InformationCircleIcon className="inline h-4 text-gray-500" />
          </small>
        }
      </label>
      <fieldset>
        <div className="mt-2 overflow-y-auto border-t border-b border-gray-200 divide-y divide-gray-200 max-h-96">
          <ReactSortable list={form} setList={setForm} handle=".sortButton" onEnd={handleReorder}>
            {form.map((field) => (
              <div key={field.id} className="relative flex items-start py-3 pr-5">
                <div className="flex-1 min-w-0 text-sm">
                  <label htmlFor={`field-${field.id}`} className="flex font-medium text-gray-700 select-none">
                   <MenuIcon className="h-5 mr-3 cursor-move sortButton" />
                    {field.name}
                  </label>
                </div>
                <div className="flex items-center h-5 ml-3">
                  <input
                    id={`field-${field.id}`}
                    name={`field-${field.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
                    disabled={field.isDefault}
                    checked={field.isSelected}
                    onChange={() => handleChange(field.id)}
                  />
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
      </fieldset>
    </div>
  );
}