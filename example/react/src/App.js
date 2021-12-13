import './App.css';

import agilityAppSDK from '@agility/app-sdk/src/index'

import BasicCustomField from './BasicCustomField';
import Flyout from './Flyout';

function App() {
  
  const Components = {
    BasicCustomField,
    Flyout
  }
  
  const appConfig = {
    name: 'Basic App',
    version: '1',
    configValues: [
        { name: 'apiKey', label: 'API Key', type: 'string'}        
    ],
    appComponents: [
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField'
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField'
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout',
        name: 'Flyout1'
      }
    ]
  };
  
  const componentRequested = agilityAppSDK.resolveAppComponent(appConfig);

  if(componentRequested === 'AppConfig') {

    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(appConfig);

  } else {
    //determine the React component we want to render based on what the CMS has requested...
    const ComponentToRender = Components[componentRequested];
    
    if(ComponentToRender) {
      return <ComponentToRender appConfig={appConfig} />;
    } else {
      return <h2>Warning: App must be loaded within Agility CMS.</h2>
    }
  }

  return null;
}

export default App;
