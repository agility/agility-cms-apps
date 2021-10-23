import { useEffect, useRef } from 'react';
import { setAppConfig } from './agility-utils'

function AppConfig({ appConfig }) {

    const containerRef = useRef();
    useEffect(() => {
        setAppConfig(appConfig);
    }, [appConfig]);

    return (
        <div className="AppConfig" ref={containerRef}>
            <h1>App Config</h1>
        </div>
    );
}

export default AppConfig;
