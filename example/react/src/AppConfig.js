import { useEffect, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'

function AppConfig({ appConfig }) {

    const containerRef = useRef();
    useEffect(() => {
        agilityAppSDK.setAppConfig(appConfig);
    }, [appConfig]);

    return (
        <div className="AppConfig" ref={containerRef}>
            <h1>App Config</h1>
        </div>
    );
}

export default AppConfig;
