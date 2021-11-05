import './App.css';

import agilityAppSDK from '@agility/app-sdk'

import BasicCustomField from './BasicCustomField';
import AppConfig from './AppConfig'
import Flyout from './Flyout';

function App() {

  const Components = {
    BasicCustomField,
    AppConfig,
    Flyout
  }

  const appConfig = {
    name: 'Basic App',
    desription: 'NEED description',
    image: 'someimg',
    version: '1',
    params: [
        { name: 'apiKey', label: 'API Key', type: 'string'}
    ],
    appComponents: [
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_APP_CONFIG,
        name: 'AppConfig',
        componentToRender: 'AppConfig'
      },
      {
        location: agilityAppSDK.types.APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout',
        name: 'Flyout1'
      }
    ]
  };

  //determine the React component we want to render based on what the CMS has requested...
  const ComponentToRender = Components[agilityAppSDK.resolveAppComponent(appConfig)];
  
  if(ComponentToRender) {
    return <ComponentToRender appConfig={appConfig} />;
  } else {
    return <h2>Warning: App must be loaded within Agility CMS.</h2>
  }

}

export default App;
