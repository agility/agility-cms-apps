import { useEffect, useRef } from 'react';
import { setAppConfig } from './agility-utils'

function AppConfig() {

    const containerRef = useRef();
    useEffect(() => {
        setAppConfig({
            name: 'Basic App',
            version: '1',
            params: [
                { name: 'apiKey', label: 'API Key', type: 'string'}
            ]
        })
    }, []);

    return (
        <div className="AppConfig" ref={containerRef}>
            <h1>Hello World</h1>
        </div>
    );
}

export default AppConfig;
