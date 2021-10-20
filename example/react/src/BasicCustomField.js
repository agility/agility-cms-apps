import { useEffect, useState, useRef } from 'react';
import { initializeField, updateFieldValue } from './agility-utils'

function BasicCustomField() {

  const [value, setValue] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [fieldID, setFieldID] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    initializeField({
      containerRef,
      //when field is ready, get the params (i.e. value and auth) from the CMS
      onReady: (params) => {
          //set the actual value of the field
          setValue(params.fieldValue ? params.fieldValue : "");
          setFieldID(params.fieldID);
          setFieldName(params.fieldName);
      }
    })

  }, []);

  const updateValue = (newVal) => {
    //update the react state
    setValue(newVal);
    //notify Agility CMS of the new value
    updateFieldValue({ value: newVal, fieldName, fieldID });
  }

  return (
    <div className="BasicCustomField" ref={containerRef}>
      <label>
        Basic Custom Field
        <input style={{display: 'block', width: '100%'}} type="text" value={value} onChange={e => updateValue(e.target.value)} />
      </label>
    </div>
  );
}

export default BasicCustomField;
