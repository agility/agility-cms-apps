import './App.css';
import { 
  resolveAppComponent,
  APP_LOCATION_CUSTOM_FIELD,
  APP_LOCATION_APP_CONFIG,
  APP_LOCATION_FLYOUT
 } from './agility-utils'
 
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
    version: '1',
    params: [
        { name: 'apiKey', label: 'API Key', type: 'string'}
    ],
    appComponents: [
      {
        location: APP_LOCATION_CUSTOM_FIELD,
        label: 'Basic Custom Field',
        name: 'BasicCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: APP_LOCATION_CUSTOM_FIELD,
        label: 'Other Custom Field',
        name: 'OtherCustomField',
        componentToRender: 'BasicCustomField',
        params: [
          { name: 'maxlength', label: 'Max Length', type: 'number'}
        ]
      },
      {
        location: APP_LOCATION_APP_CONFIG,
        name: 'AppConfig',
        componentToRender: 'AppConfig'
      },
      {
        location: APP_LOCATION_FLYOUT,
        componentToRender: 'Flyout'
      }
    ]
  };

  const ComponentToRender = Components[resolveAppComponent(appConfig)];
  
  return <ComponentToRender appConfig={appConfig} />;

}

export default App;
