import './App.css';
import { 
  getAppLocation,
  APP_LOCATION_CUSTOM_FIELD,
  APP_LOCATION_APP_CONFIG
 } from './agility-utils'
 
import BasicCustomField from './BasicCustomField';
import AppConfig from './AppConfig'

function App() {

  const appLocation = getAppLocation()

  const AppComponents = [
    {
      location: APP_LOCATION_CUSTOM_FIELD,
      name: 'BasicCustomField',
      Component: BasicCustomField,
    },
    {
      location: APP_LOCATION_APP_CONFIG,
      name: 'AppConfig',
      Component: AppConfig
    }
  ]

  // Select a component depending on a location in which the app is rendered.
  const ComponentToRender = AppComponents.find((AppComponent) => {
    return AppComponent.location === appLocation.location && AppComponent.name === appLocation.name;
  });

  return <ComponentToRender.Component />;

}

export default App;
