import React, { useEffect, useState } from "react";

interface FieldType {
  id: number,
  name: string,
  isSelected: boolean,
  isDefault: boolean
}

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
];

export const useForm = () => {
  const [form, setForm] = useState(fields);

  const updateForm = (id: string) => {
    const newForm = form.map(field => {
      if(field.id === id){
        field.isSelected = !field.isSelected;
      }
      return field;
    });
    setForm(newForm);
  }

  return [form, setForm, updateForm] as const;
}