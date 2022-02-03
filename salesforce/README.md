# Agility CMS Salesforce Lead App

This is the reference implementation of the Salesforce Web-to-lead form builder.

This uses the [@agility/apps-sdk](https://www.npmjs.com/package/@agility/app-sdk) - see here for docs to facilitate communication with Agility CMS.

## Using this App

In order to use an App in Agility CMS, you must register this app within your Organization in Agility CMS. Then, you can install this app within any Instance in your Organization.

### Getting your Salesforce Web-to-Lead OID

1. Go to your Salesforce dashboard
2. Click on settings (cog icon) next to your profile
3. Search for 'Web-to-lead' in the quick find search bar.
4. Fill out the necessary fields and generate a form.
5. On th output HTML text search for a hidden field with the OID value

## Running this app

### Remote

1. Clone the repository
2. Deploy to a static host such as Netlify or Vercel
3. Register the App within Agility CMS in your Organization - you must be an Organization Admin
4. Install the App in your instance(s)

### Local

This is a app is running on [Next.js](https://nextjs.org/)

1. Clone the repository
2. CD to the `salesforce` folder and run `npm install`
3. Run the app with `npm run dev` OR `yarn dev`
4. Your app should now be running on `localhost:3000`
5. Install the App in your instance(s)

## Embedding the Salesforce app response

Once you've installed and applied the app as custom field to your page, you can then use the sample component below to parse and build the form on your site. 

We are using NextJS.

```
import React from "react";

const InputText = ({ id, name, metaData }) => {
  return (
    <div className="input-field">
      <label htmlFor={id}>
        {name}
      </label>
      <input id={id} maxLength={metaData.maxlength} name={id} type={metaData.type} />
    </div>
  )
}

const Select = ({ id, name, metaData }) => {
  return (
    <div className="select-field">
      <label htmlFor={id}>{name}</label>
      <select id={id} name={id}>
        <option value="">--None--</option>
        {metaData.options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

const Textarea = ({ id, name, metaData }) => {
  return (
    <div className="textarea-field">
      <label htmlFor={id}>{name}</label>
      <textarea name={id}></textarea>
    </div>
  )
}

const Checkbox = ({ id, name, metaData }) => {
  return (
    <div className="checkbox-field">
      <label for={id}>{name}</label>
      <input id={id} name={id} type={metaData.type} value={metaData.value} />
    </div>
  )
}

const HiddenText = ({ name, value }) => {
  return (
    <input type="hidden" name={name} value={value} />
  )
}

const renderFields = (param, index) => {
  if (!param.isSelected) return null;
  switch (param.metaData.type) {
    case 'text':
      return <InputText {...param} key={index} />;
    case 'textarea':
      return <Textarea {...param} key={index} />;
    case 'select':
      return <Select {...param} key={index} />;
    case 'checkbox':
      return <Checkbox {...param} key={index} />;
    default:
      return null;
  }
}


const SalesforceLead = ({ module }) => {
  // replace salesforceLead with the property name you set your custom field to
  const { fields: { salesforceLead = undefined } } = module;
  if (!salesforceLead) return null;

  const { leadOID, actionURL, formData, retURL } = JSON.parse(salesforceLead);

  return (
    <div className="form-container">
      <h1>{module.fields.title}</h1>
      <form action={actionURL} method="POST">
        <HiddenText name="oid" value={leadOID} />
        <HiddenText name="retURL" value={retURL} />
        {formData.map((field, index) => (
          renderFields(field, index)
        ))}
        {formData.length && <input type="submit" value="Submit" />}
      </form>
    </div>
  );
};

export default SalesforceLead;
```
