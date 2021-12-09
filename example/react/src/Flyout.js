import { useEffect, useRef, useState } from 'react';
import agilityAppSDK from '@agility/app-sdk';

function Flyout({ appConfig }) {

    const containerRef = useRef();

    const [value, setValue] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [fieldLabel, setFieldLabel] = useState("");
    const [sdk, setSDK] = useState({})

    //const [fieldID, setFieldID] = useState("");
    //const [configValues, setConfigValues] = useState({});
    //const [flyoutParams, setFlyoutParams] = useState({});

    useEffect(() => {
        agilityAppSDK.initializeFlyout({containerRef}).then((flyoutSDK) => {
            setSDK(flyoutSDK);

            //set the actual value of the field
            setValue(flyoutSDK.fieldValue ? flyoutSDK.fieldValue : "");
            setFieldName(flyoutSDK.fieldName);
            setFieldLabel(flyoutSDK.fieldLabel);

            //You can also get access to this properties:
            //setFieldID(flyoutSDK.fieldID);
            //setConfigValues(flyoutSDK.configValues);
            //setFlyoutParams(flyoutSDK.flyoutParams);
        })
    }, [appConfig]);

    const closeThisFlyout = () => {
        sdk.closeFlyout({
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
