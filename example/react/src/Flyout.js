import { useEffect, useRef, useState } from 'react';
import { initializeField, closeFlyout, APP_LOCATION_FLYOUT } from './agility-utils'

function Flyout({ appConfig }) {

    const containerRef = useRef();

    const [value, setValue] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [fieldID, setFieldID] = useState("");
    const [fieldLabel, setFieldLabel] = useState("");
    const [configValues, setConfigValues] = useState({});
    const [flyoutParams, setFlyoutParams] = useState({});

    useEffect(() => {
        initializeField({
            location: APP_LOCATION_FLYOUT,
            containerRef,
            //when field is ready, get the params (i.e. value and auth) from the CMS
            onReady: (params) => {
                console.log('params', params);
                //set the actual value of the field
                setValue(params.fieldValue ? params.fieldValue : "");
                setFieldID(params.fieldID);
                setFieldName(params.fieldName);
                setFieldLabel(params.fieldLabel);
                setConfigValues(params.configValues);
                setFlyoutParams(params.flyoutParams);
            }
        })

    }, []);

    const closeThisFlyout = () => {
        closeFlyout({
            fieldName,
            fieldID,
            params: {
                'somevalue': 'was set'
            }
        })
    }


    return (
        <div className="Flyout" ref={containerRef}>
            <div>
                <div>This is a custom flyout for {fieldLabel}, {fieldName} who has a field value of {value}</div>
                <button onClick={closeThisFlyout}>Close Flyout</button>
            </div>
        </div>
    );
}

export default Flyout;
