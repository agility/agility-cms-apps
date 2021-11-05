import { useEffect, useState, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'

function BasicCustomField() {

  const [value, setValue] = useState("");
  const [fieldLabel, setFieldLabel] = useState("");
  const [configValues, setConfigValues] = useState({});
  const [sdk, setSDK] = useState({})
  const containerRef = useRef();

  useEffect(() => {
      agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {

        //set the SDK that we can use later...
        setSDK(fieldSDK);
      
        //set the actual value of the field
        setValue(fieldSDK.fieldValue);
        setFieldLabel(fieldSDK.fieldLabel);
        setConfigValues(fieldSDK.configValues);

        fieldSDK.subscribeToFieldValueChanges({
          fieldName: 'Title',
          onChange: ({fieldName, fieldValue}) => {
            //when the 'Title' changes, get notified, and do something...
            console.log(fieldName, fieldValue);
          }
        })
      });
  }, []);

  const updateValue = (newVal) => {
    //update the react state
    setValue(newVal);

    //notify Agility CMS of the new value
    sdk.updateFieldValue({ fieldValue: newVal });
  }

  const openCustomFlyout = () => {
    
    sdk.openFlyout({
      title: 'Flyout Title',
      size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
      name: 'Flyout1',
      onClose: (params) => {
        //passes the parameters back from the app component that closed the flyout
        console.log(params);
      },
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
