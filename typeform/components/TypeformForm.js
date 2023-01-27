import { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";
import axios from "axios";
import EditForm from "./EditForm";
import Select from "./Select";
import AddForm from "./AddForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function TypeformForm() {
  // set up state
  const [fieldConfig, setFieldConfig] = useState(null);
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({});
  const [forms, setForms] = useState([]);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formResponseMsg, setFormResponseMsg] = useState(null);

  // set ref
  const containerRef = useRef();

  // initialize field
  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      setSDK(fieldSDK);
      const field = JSON.parse(fieldSDK.field.value);
      setSelectedWorkspace(field.workspace);
      setSelectedForm(field.formId);
      setConfigValues(fieldSDK.configValues);
      setFieldConfig(fieldSDK.field);
    });
  }, []);

  // fetch forms from typeform
  useEffect(() => {
    (async () => {
      if (configValues.accessToken) {
        let { data: workspaceData } = await axios.get("/api/getWorkspaces", {
          params: { accessToken: configValues.accessToken },
        });

        const mappedWorkspaceData = workspaceData.items.map((wspace) => ({
          name: wspace.name,
          workspaceId: wspace.id,
          accountId: wspace.account_id,
        }));
        setWorkspaces(mappedWorkspaceData);
      }
    })();
  }, [configValues]);

  useEffect(() => {
    (async () => {
      if (configValues.accessToken) {
        if (selectedWorkspace && selectedWorkspace !== "") {
          const { data: typeFormData } = await axios.get("/api/getForms", {
            params: {
              accessToken: configValues.accessToken,
              workspaceId: selectedWorkspace.workspaceId,
            },
          });

          const mappeFormData = typeFormData.items.map((form) => ({
            name: form.title,
            formId: form.id,
          }));
          setForms(mappeFormData);
        }
      }
    })();
  }, [configValues, selectedWorkspace]);


  useEffect(() => {
    (async () => {
      if (configValues.accessToken) {
        if (selectedForm) {
          await fetchFormResponses(selectedForm);
        }else{
          setFormResponseMsg(null);
        }
      }
    })();
  }, [configValues, selectedForm]);

  const fetchFormResponses = async (fId) => {
    const { data: formResponses } = await axios.get("/api/getResponses", {
      params: {
        accessToken: configValues.accessToken,
        formId: fId,
      },
    });
    setFormResponseMsg((formResponses.total_items > 0) ? `${formResponses.total_items} response(s) to this form` : `No one has responded to this form...yet!`)
  }

  // update workspace value
  const updateWorkspace = (e) => {
    const workspaceId = e.target.value;

    const wkSpace = workspaces.find(
      (space) => space.workspaceId === workspaceId
    ) ?? {
      name: "Select a Workspace to continue...",
      workspaceId: null,
      accountId: null,
    };

    setSelectedWorkspace(wkSpace);
    setSelectedForm(null);
  };

  // update form value
  const updateFormValue = (e) => {
    const formID = e.target.value;
    setSelectedForm(formID);

    const form = forms.find((form) => form.formId === formID) ?? {
      name: "Select a Form to continue...",
      formId: "",
    };
    form.workspace = selectedWorkspace;
    let data = JSON.stringify(form);
    data = data && data !== "{}" ? data : "";
    sdk.updateFieldValue({ fieldValue: data });
  };

  if (!configValues.accessToken) {
    return (
      <div className="field-row" ref={containerRef}>
        No access token found! Add an access token to see your workspaces.
      </div>
    );
  }

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
          {fieldConfig.required && !selectedWorkspace?.workspaceId ? (
            <span
              className="required"
              title="This value is required."
            >
              This is a required field
            </span>
          ) : null}
        </label>

        <div className="control-select">
          <Select
            required={fieldConfig.required}
            items={workspaces}
            updateValue={updateWorkspace}
            value={
              selectedWorkspace?.workspaceId
                ? selectedWorkspace.workspaceId
                : null
            }
            itemKey={"workspaceId"}
            emptyText={"Select a Workspace to continue..."}
          />
        </div>

        {selectedWorkspace && selectedWorkspace.workspaceId ? (
          <>
            <label className="control-label">
              {fieldConfig.required && !selectedForm ? (
                <span
                  className="required"
                  title="This value is required."
                >
                  This is a required field
                </span>
              ) : null}
            </label>
            <div className="control-select">
              <Select
                required={fieldConfig.required}
                items={forms}
                updateValue={updateFormValue}
                value={selectedForm}
                itemKey={"formId"}
                emptyText={"Select a Form to continue..."}
              />
              {selectedForm && <EditForm formId={selectedForm} />}
              <AddForm
                workspaceId={selectedWorkspace.workspaceId}
                accountId={selectedWorkspace.accountId}
              />
            </div>
            <label className="control-label">
                <span>
                  {formResponseMsg}
                </span>
            </label>
          </>
        ) : null}
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
