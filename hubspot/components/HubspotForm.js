import { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import EditForm from "./EditForm";
import Select from "./Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import AddForm from "./AddForm";

export default function HubspotForm() {
  // set up state
  const [value, setValue] = useState("");
  const [fieldConfig, setFieldConfig] = useState(null);
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({});
  const [forms, setForms] = useState([]);

  // set ref
  const containerRef = useRef();

  // get form data
  let formData = value ? JSON.parse(value) : null;

  // get addFormId to use on add form link
  const addFormId = forms.length && forms[0]?.portalId;

  // get form
  const form = forms.find((f) => f.formId === formData?.formId);

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  // fetch forms from hubspot
  useEffect(() => {
    (async () => {
      if (configValues.accessToken) {
        const { data } = await axios.get("/api/getForms", {
          params: { accessToken: configValues.accessToken },
        });
        // ignore unecessary data then map guid to formID so users don't have to massage the data on client-side
        const mappeFormData = data.map(form => ({name: form.name, portalId: form.portalId, formId: form.guid }));
        setForms(mappeFormData);
      }
    })();
  }, [configValues]);

  // update value
  const updateValue = (e) => {
    const formID = e.target.value;
    const form = forms.find((form) => form.formId === formID);
    let data = JSON.stringify(form);
    data = data && data !== "{}" ? data : "";
    setValue(data);
    sdk.updateFieldValue({ fieldValue: data });
  };

  if (fieldConfig) {
    return (
      <div className="field-row" ref={containerRef}>
        <label className="control-label">
          <span>{fieldConfig.label}</span>
          {fieldConfig.required && (
            <span className="required" title="This field is required.">
              *
            </span>
          )}
          {fieldConfig.description && (
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="field-description"
              title={fieldConfig.description}
            />
          )}
        </label>
        <div className="control-select">
          <Select forms={forms} updateValue={updateValue} value={value} />
          {value && value !== "" && <EditForm form={form} />}
          <AddForm addFormId={addFormId} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="field-row" ref={containerRef}>
        <label>
          <span>Loading...</span>
        </label>
      </div>
    );
  }
}
