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
  const form = forms.find((f) => f.guid === formData?.formId);

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
      console.log("INIT", fieldSDK.field.value)
    });
  }, []);

  // fetch forms from hubspot
  useEffect(() => {
    (async () => {
      if (configValues.accessToken) {
        const { data } = await axios.get("/api/getForms", {
          params: { accessToken: configValues.accessToken },
        });
        setForms(data);
      }
    })();
  }, [configValues]);

  // update value
  const updateValue = (e) => {
    const formID = e.target.value;
    const form = forms.find((form) => form.guid === formID);
    const { portalId, guid, name } = form || {};
    let data = JSON.stringify({
      name,
      portalId,
      formId: guid
    });
    data = data && data !== "{}" ? data : "";
    console.log("SAVE", data)
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
