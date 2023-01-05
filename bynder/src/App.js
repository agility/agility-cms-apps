import agilityAppSDK from "@agility/app-sdk";
import ImageField from "./Components/ImageField";
import VideoField from "./Components/VideoField";
import MediaSelector from "./Components/MediaSelector";

function App() {
  const Components = {
    ImageField,
    VideoField,
    MediaSelector,
  };

  const appConfig = {
    name: "Bynder App",
    version: "1",
    configValues: [
      { name: "bynderurl", label: "Bynder URL", type: "string" }
    ],
    appComponents: [
      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: "Bynder Image",
        name: "BynderImageField",
        componentToRender: "ImageField",
        hideLabel: true,
      },

      {
        location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
        label: "Bynder Video",
        name: "BynderVideoField",
        componentToRender: "VideoField",
        hideLabel: true,
      },

      {
        location: agilityAppSDK.types.APP_LOCATION_FLYOUT,
        componentToRender: "MediaSelector",
        name: "BynderMediaSelector",
      },
    ],
  };

  const componentRequested = agilityAppSDK.resolveAppComponent(appConfig);

  if (componentRequested === "AppConfig") {
    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(appConfig);
  } else {
    //determine the React component we want to render based on what the CMS has requested...
    const ComponentToRender = Components[componentRequested];

    if (ComponentToRender) {
      return <ComponentToRender appConfig={appConfig} />;
    } else {
      return <h2>Warning: App must be loaded within Agility CMS.</h2>;
    }
  }

  return null;
}

export default App;
