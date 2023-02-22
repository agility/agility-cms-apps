import { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import EditForm from "./EditForm";
import Select from "./Select";
import AddForm from "./AddForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { APP_CONFIG } from "../common/config";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import useSDK from "./useSDK";

export interface FormProps {
  name: string,
  formId: string
  portalId: string
}

export default function HubspotForm() {
  // set up state
  const containerRef = useRef();
  const [ value, fieldConfig, configValues, sdk, setValue ] = useSDK(containerRef)
  const [forms, setForms] = useState<FormProps[]>([]);

  // get form data
  let formData = value ? JSON.parse(value) : null;

  // get addFormId to use on add form link
  const addFormId = forms.length && forms[0]?.portalId;

  // get form
  const form: FormProps = forms.find((f) => f.formId === formData?.formId);

  // fetch forms from hubspot
  useEffect(() => {
    (async () => {
      if (configValues?.accessToken) {
        const { data } = await axios.get("/api/getForms", {
          params: { accessToken: configValues?.accessToken },
        });
        // ignore unecessary data then map guid to formID so users don't have to massage the data on client-side
        const mappeFormData = data.map(form => ({name: form.name, portalId: form.portalId, formId: form.guid }));
        setForms(mappeFormData);
      }
    })();
  }, [configValues]);

  // update value
  const updateValue = (formID) => {
    const form = forms.find((form) => form.formId === formID);
    let data = JSON.stringify(form);
    data = data && data !== "{}" ? data : "";
    setValue(data);
    sdk.updateFieldValue({ fieldValue: data });
  };

  if (fieldConfig) {
    return (
      <div ref={containerRef}>
        <div className="flex xs:flex-col xs:items-start md:items-end md:flex-row gap-2">
         { forms.length > 0 ? 
            <>
              <Select
                label={fieldConfig?.label} 
                forms={forms} 
                updateValue={updateValue} 
                value={value} 
                isRequired={fieldConfig?.required}/>
                {fieldConfig?.description && (
                  <FontAwesomeIcon
                    icon={faInfoCircle as IconProp}
                    className="pr-1"
                    title={fieldConfig?.description}
                  />
              )}
              <div>
                {value && value !== "" && <EditForm form={form} />}
                <AddForm addFormId={addFormId} />
              </div>
            </>
          : 
            <span className="m-2 text-sm">
              <p>
                {`This App couldn't render any forms from ${APP_CONFIG.NAME}.`}
              </p>
              <p>
                {`Log in to your ${APP_CONFIG.NAME} account to create a new form.`}
              </p>
            </span>
          }
        </div>
      </div>
    );
  } else {
    return (
      <div ref={containerRef}>
          <span className="m-2 text-sm">Loading...</span>
      </div>
    );
  }
}
