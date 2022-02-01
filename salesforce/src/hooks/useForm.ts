import React, { useEffect, useState } from "react";
import { text } from "stream/consumers";

interface FieldType {
  id: number,
  name: string,
  isSelected: boolean,
  isDefault: boolean
}

const metaData = {
  textShort: {
    maxlength: 40,
    type: "text"
  },
  textLong: {
    maxlength: 80,
    type: "text"
  },
  textArea: {
    type: "textarea"
  },
  salutations: {
    type: "select",
    options: [
      "Ms.",
      "Mrs.",
      "Dr.",
      "Prof."
    ]
  },
  leadSource: {
    type: "select",
    options: [
      "Customer Event",
      "Employee Referral",
      "External Referral",
      "Google AdWords",
      "Other",
      "Partner",
      "Purchased List",
      "Trade Show",
      "Webinar",
      "Website",
    ]
  },
  industry: {
    type: "select",
    options: [
      "Apparel",
      "Banking",
      "Biotechnology",
      "Chemicals",
      "Communications",
      "Construction",
      "Consulting",
      "Education",
      "Electronics",
      "Energy",
      "Engineering",
      "Entertainment",
      "Environmental",
      "Finance",
      "Food &amp; Beverage",
      "Government",
      "Healthcare",
      "Hospitality",
      "Insurance",
      "Machinery",
      "Manufacturing",
      "Media",
      "Not For Profit",
      "Other",
      "Recreation",
      "Retail",
      "Shipping",
      "Technology",
      "Telecommunications",
      "Transportation",
      "Utilities"
    ]
  },
  rating: {
    type: "select",
    options: [
      "Warm",
      "Cold"
    ]
  },
  checkBox: {
    type: "checkbox",
    value: 1
  }
}

// fields
const fields = [
  {
    id: "first_name",
    name: "First Name",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textShort
  },
  {
    id: "last_name",
    name: "Last Name",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textLong
  },
  {
    id: "email",
    name: "Email",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textLong
  },
  {
    id: "company",
    name: "​Company",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textShort
  },
  {
    id: "city",
    name: "​City",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textShort
  },
  {
    id: "state",
    name: "​State/Province",
    isSelected: true,
    isDefault: true,
    metaData: metaData.textShort
  },
  {
    id: "salutation",
    name: "Salutation",
    isSelected: false,
    isDefault: false,
    metaData: metaData.salutations
  },
  {
    id: "title",
    name: "Title",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "url",
    name: "Website",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textLong
  },
  {
    id: "phone",
    name: "Phone",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "mobile",
    name: "Mobile",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "fax",
    name: "Fax",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "street",
    name: "Street",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textArea
  },
  {
    id: "zip",
    name: "Zip",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "country",
    name: "Country",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "description",
    name: "Description",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textArea
  },
  {
    id: "lead_source",
    name: "Lead Source",
    isSelected: false,
    isDefault: false,
    metaData: metaData.leadSource
  },
  {
    id: "industry",
    name: "Industry",
    isSelected: false,
    isDefault: false,
    metaData: metaData.industry
  },
  {
    id: "rating",
    name: "Rating",
    isSelected: false,
    isDefault: false,
    metaData: metaData.rating
  },
  {
    id: "revenue",
    name: "Annual Revenue",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "employees",
    name: "Employees",
    isSelected: false,
    isDefault: false,
    metaData: metaData.textShort
  },
  {
    id: "emailOptOut",
    name: "Email Opt Out",
    isSelected: false,
    isDefault: false,
    metaData: metaData.checkBox
  },
  {
    id: "faxOptOut",
    name: "Fax Opt Out",
    isSelected: false,
    isDefault: false,
    metaData: metaData.checkBox
  },
  {
    id: "doNotCall",
    name: "Do Not Call",
    isSelected: false,
    isDefault: false,
    metaData: metaData.checkBox
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