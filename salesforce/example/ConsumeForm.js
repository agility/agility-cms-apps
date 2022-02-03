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
  const { fields: { salesforceLead = undefined } } = module;
  if (!salesforceLead) return null;

  const { leadOID, actionURL, formData, retURL } = JSON.parse(salesforceLead);
  console.log(JSON.parse(salesforceLead));

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