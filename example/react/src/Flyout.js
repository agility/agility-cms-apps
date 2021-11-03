import { useEffect, useRef, useState } from 'react';
import agilityAppSDK from '@agility/app-sdk';

function Flyout({ appConfig }) {

    const containerRef = useRef();

    const [value, setValue] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [fieldID, setFieldID] = useState("");
    const [fieldLabel, setFieldLabel] = useState("");
    const [configValues, setConfigValues] = useState({});
    const [flyoutParams, setFlyoutParams] = useState({});
    const [sdk, setSDK] = useState({})

    useEffect(() => {
        const init = async () => {
            const fieldSDK = await agilityAppSDK.initializeField({
                containerRef
            })

            setSDK(fieldSDK);

            //set the actual value of the field
            setValue(fieldSDK.fieldValue ? fieldSDK.fieldValue : "");
            setFieldID(fieldSDK.fieldID);
            setFieldName(fieldSDK.fieldName);
            setFieldLabel(fieldSDK.fieldLabel);
            setConfigValues(fieldSDK.configValues);
            setFlyoutParams(fieldSDK.flyoutParams);
        }
        init();

    }, []);

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
