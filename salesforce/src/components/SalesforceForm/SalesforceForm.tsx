import { useEffect, useState, useRef } from "react";
//@ts-ignore
import agilityAppSDK from "@agility/app-sdk";

export const SalesforceForm = (): JSX.Element => {
  // set up state
  const [value, setValue] = useState('');
  const [fieldConfig, setFieldConfig] = useState(null);
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({});
  const [forms, setForms] = useState([]);

  // set ref
  const containerRef = useRef(null);

  // fields
  const fields = [
    {
      id: "first_name",
      name: "First Name",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "last_name",
      name: "Last Name",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "email",
      name: "Email",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "company",
      name: "​Company",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "city",
      name: "​City",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "state",
      name: "​State/Province",
      isSelected: true,
      isDefault: true,
    },
    {
      id: "salutation",
      name: "Salutation",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "title",
      name: "Title",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "url",
      name: "Website",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "phone",
      name: "Phone",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "mobile",
      name: "Mobile",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "fax",
      name: "Fax",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "street",
      name: "Street",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "zip",
      name: "Zip",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "country",
      name: "Country",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "description",
      name: "Description",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "lead_source",
      name: "Lead Source",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "industry",
      name: "Industry",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "rating",
      name: "Rating",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "revenue",
      name: "Annual Revenue",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "employees",
      name: "Employees",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "Campaign_ID",
      name: "Campaign",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "member_status",
      name: "Campaign Member Status",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "emailOptOut",
      name: "Email Opt Out",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "faxOptOut",
      name: "Fax Opt Out",
      isSelected: false,
      isDefault: false,
    },
    {
      id: "doNotCall",
      name: "Do Not Call",
      isSelected: false,
      isDefault: false,
    },
  ]

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK: any) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  return (
    <div className="field-row" ref={containerRef}>
      <div className="flex align-middle mb-4">
        <select
          id="location"
          name="location"
          className="flex-shrink mr-2 border-2 block w-full pl-3 pr-10 py-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue="Canada"
        >
          <option>Select form</option>
          <option>Form 1</option>
          <option>Form 2</option>
        </select>
        <button className="bg-cta px-3 text-white rounded-md whitespace-nowrap mx-2">Create form</button>
        <button className="bg-cta px-3 text-white rounded-md whitespace-nowrap">Edit form</button>
      </div>

      <fieldset>
        <legend className="text-lg font-medium text-gray-900">Available Fields</legend>
        <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200 max-h-96 overflow-y-auto">
          {fields.map((field, fieldIdx) => (
            <div key={fieldIdx} className="relative flex items-start py-3 pr-5">
              <div className="min-w-0 flex-1 text-sm">
                <label htmlFor={`field-${field.id}`} className="font-medium text-gray-700 select-none">
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
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
        <button className="bg-cta p-3 mt-3 text-white rounded-md">Build form</button>
      </div>
      </fieldset>
      
    </div>
  );
}