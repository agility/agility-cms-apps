import { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import Select from "./Select";
import EditForm from "./EditForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function FormstackField() {
  // set up state
  const [value, setValue] = useState("");
  const [fieldConfig, setFieldConfig] = useState(null);
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({});
  const [forms, setForms] = useState([]);

  // set ref
  const containerRef = useRef();

  // get form data
  let formData;

  if (value) {
    formData = JSON.parse(value);
  }

  // get form
  const form = forms.find((f) => f.guid === formData?.guid);

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      setSDK(fieldSDK);
      setValue(fieldSDK.field.value);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  // fetch forms from formstack
  useEffect(() => {
    const init = async () => {
      if (configValues.accessToken) {
        const { data } = await axios.get("/api/getForms", {
          params: { accessToken: configValues.accessToken },
        });
        setForms(data);
      }
    };
    init();
  }, [configValues]);

  // update value
  const updateValue = (e) => {
    const formID = e.target.value;
    const form = forms.find((f) => f.guid === formID);
    const data = JSON.stringify({
      name: form?.name,
      guid: form?.guid,
      url: form?.url,
    });
    setValue(data && data !== "{}" ? data : "");
    sdk.updateFieldValue({ fieldValue: data && data !== "{}" ? data : "" });
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
