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
      "Mr.",
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

export const actionURL = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';

// fields
export const fields = [
  {
    id: "first_name",
    name: "First Name",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "last_name",
    name: "Last Name",
    isSelected: false,
    metaData: metaData.textLong
  },
  {
    id: "email",
    name: "Email",
    isSelected: false,
    metaData: metaData.textLong
  },
  {
    id: "company",
    name: "​Company",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "city",
    name: "​City",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "state",
    name: "​State/Province",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "salutation",
    name: "Salutation",
    isSelected: false,
    metaData: metaData.salutations
  },
  {
    id: "title",
    name: "Title",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "url",
    name: "Website",
    isSelected: false,
    metaData: metaData.textLong
  },
  {
    id: "phone",
    name: "Phone",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "mobile",
    name: "Mobile",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "fax",
    name: "Fax",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "street",
    name: "Street",
    isSelected: false,
    metaData: metaData.textArea
  },
  {
    id: "zip",
    name: "Zip",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "country",
    name: "Country",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "description",
    name: "Description",
    isSelected: false,
    metaData: metaData.textArea
  },
  {
    id: "lead_source",
    name: "Lead Source",
    isSelected: false,
    metaData: metaData.leadSource
  },
  {
    id: "industry",
    name: "Industry",
    isSelected: false,
    metaData: metaData.industry
  },
  {
    id: "rating",
    name: "Rating",
    isSelected: false,
    metaData: metaData.rating
  },
  {
    id: "revenue",
    name: "Annual Revenue",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "employees",
    name: "Employees",
    isSelected: false,
    metaData: metaData.textShort
  },
  {
    id: "emailOptOut",
    name: "Email Opt Out",
    isSelected: false,
    metaData: metaData.checkBox
  },
  {
    id: "faxOptOut",
    name: "Fax Opt Out",
    isSelected: false,
    metaData: metaData.checkBox
  },
  {
    id: "doNotCall",
    name: "Do Not Call",
    isSelected: false,
    metaData: metaData.checkBox
  },
];