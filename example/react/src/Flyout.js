import { useEffect, useRef, useState } from 'react';
import agilityAppSDK from '@agility/app-sdk/src/index';

function Flyout({ appConfig }) {

    const containerRef = useRef();
    const [sdk, setSDK] = useState({})
    const [flyout, setFlyout] = useState({});
    //const [configValues, setConfigValues] = useState({});
    
    useEffect(() => {
        agilityAppSDK.initializeFlyout({containerRef}).then((flyoutSDK) => {
            setSDK(flyoutSDK);
            setFlyout(flyoutSDK.flyout);

            //You can also get access to this properties:
            //setConfigValues(flyoutSDK.configValues);    

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
            { sdk && sdk.initiator &&
            <div>
                <div>This is a custom flyout {flyout.title} that was initialized by the {sdk.initiator.name} field.</div>
                <button onClick={closeThisFlyout}>Close Flyout</button>
            </div>
            }            
        </div>
    );
}

export default Flyout;
