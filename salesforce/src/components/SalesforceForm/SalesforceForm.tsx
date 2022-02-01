import React, { useEffect, useState, useRef, useCallback } from "react";
import agilityAppSDK from "@agility/app-sdk";
import { ReactSortable } from "react-sortablejs";
import { MenuIcon } from '@heroicons/react/solid'

import { useForm } from "../../hooks/useForm";

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState(null);
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
    if(value) {
      setForm(JSON.parse(value));
    }
  }, [value, setForm]);

  const handleChange = useCallback((id: string) => {
    // update the form with the selected item and save
    updateForms(id)
    sdk.updateFieldValue({ fieldValue: JSON.stringify(form) });
  }, [form, sdk, updateForms]); 

  const handleArrange = () => {
    // update the form with the re-arranged list
    setForm(form);
    sdk.updateFieldValue({ fieldValue: JSON.stringify(form) });
  }; 

  return (
    <div className="field-row" ref={containerRef}>
      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Form Builder</legend>
        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200 max-h-96 overflow-y-auto">
          <ReactSortable list={form} setList={setForm} handle=".sortButton" onEnd={handleArrange}>
            {form.map((field) => (
              <div key={field.id} className="relative flex items-start py-3 pr-5">
                <div className="min-w-0 flex-1 text-sm">
                  <label htmlFor={`field-${field.id}`} className="font-medium text-gray-700 select-none flex">
                    <MenuIcon className="h-5 mr-3 cursor-pointer sortButton" />
                    {field.name}
                  </label>
                </div>
                <div className="ml-3 flex items-center h-5">
                  <input
                    id={`field-${field.id}`}
                    name={`field-${field.id}`}
                    type="checkbox"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
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