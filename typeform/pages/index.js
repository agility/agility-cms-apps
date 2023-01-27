import dynamic from "next/dynamic";
import agilityAppSDK from "@agility/app-sdk";
import { useEffect, useState } from "react";
import { APP_CONFIG } from "../common/config";

const TypeformForm = dynamic(() => import("../components/TypeformForm"));

const Components = { TypeformForm };

const AppConfig = {
  name: APP_CONFIG.NAME,
  version: APP_CONFIG.VERSION,
  documentationLink: APP_CONFIG.DOCUMENTATION,
  configValues: [
    { name: "accessToken", label: "Typeform Access Token", type: "string" },
  ],
  appComponents: [
    {
      location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
      label: "Typeform Form",
      name: "Typeform Form",
      componentToRender: "TypeformForm",
    },
  ],
};

export default function App() {
  const [componentRequested, setComponentRequested] = useState(null);

  useEffect(() => {
    const component = agilityAppSDK.resolveAppComponent(AppConfig);
    setComponentRequested(component);
  }, [componentRequested]);

  if (componentRequested === "AppConfig") {
    console.log('here', AppConfig)
    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(AppConfig);
  } else {
    //determine the React component we want to render based on what the CMS has requested...
    const ComponentToRender = Components[componentRequested];

    if (ComponentToRender) {
      return <ComponentToRender appConfig={AppConfig} />;
    }
  }

  return <h2>Warning: App must be loaded within Agility CMS.</h2>;
}
