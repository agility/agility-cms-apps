import { useEffect, useState, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'

function BasicCustomField() {

  const [value, setValue] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldID, setFieldID] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [configValues, setConfigValues] = useState({});
  const containerRef = useRef();

  const location = agilityAppSDK.APP_LOCATION_CUSTOM_FIELD;

  useEffect(() => {
    agilityAppSDK.initializeField({
      location, 
      containerRef,
      //when field is ready, get the params (i.e. value and auth) from the CMS
      onReady: (params) => {
          //set the actual value of the field
          setValue(params.fieldValue ? params.fieldValue : "");
          setFieldID(params.fieldID);
          setFieldName(params.fieldName);
          setFieldLabel(params.fieldLabel);
          setConfigValues(params.configValues);
      }
    })

  }, [location]);

  const updateValue = (newVal) => {
    //update the react state
    setValue(newVal);
    //notify Agility CMS of the new value
    agilityAppSDK.updateFieldValue({ value: newVal, location, fieldName, fieldID });
  }

  const openCustomFlyout = () => {
    
    agilityAppSDK.openFlyout({
      title: 'Flyout Title',
      size: null,
      appLocationName: 'ShowFlyout',
      onClose: (params) => {
        //passes the parameters back from the app component that closed the flyout
        console.log(params);
      },
      fieldID,
      fieldName,
      params: {
        key: 'value'
      }
    })
  }

  return (
    <div className="BasicCustomField" ref={containerRef}>
      <label>
        {fieldLabel}
        <input style={{display: 'block', width: '100%'}} type="text" value={value} onChange={e => updateValue(e.target.value)} />
      </label>
      <p>API Key: {configValues.apiKey}</p>
      <button onClick={openCustomFlyout}>Open Flyout</button>
    </div>
  );
}

export default BasicCustomField;
