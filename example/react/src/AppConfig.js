import { useEffect, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'

function AppConfig({ appConfig }) {

    useEffect(() => {
        //provide the CMS information about your app configuration
        agilityAppSDK.initializeAppConfig(appConfig);
    }, [appConfig]);

    //your AppConfig does not render any HTML, no need to output anything...
    return null;
}

export default AppConfig;
