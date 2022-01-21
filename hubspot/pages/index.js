import dynamic from "next/dynamic";
import agilityAppSDK from "@agility/app-sdk";
import { useEffect, useState } from "react";

const HubspotField = dynamic(() => import("../components/HubspotField"));

const Components = {
  HubspotField,
};

const appConfig = {
  name: "Hubspot",
  version: "1.0.0",
  documentationLink: "https://agilitycms.com/docs/developers/hubspot",
  configValues: [
    { name: "accessToken", label: "Hubspot Access Token", type: "string" },
  ],
  appComponents: [
    {
      location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
      label: "Hubspot",
      name: "Hubspot",
      componentToRender: "HubspotField",
    },
  ],
};

export default function App() {
  const [componentRequested, setComponentRequested] = useState(null);

  useEffect(() => {
    const component = agilityAppSDK.resolveAppComponent(appConfig);
    setComponentRequested(component);
  }, [componentRequested]);

  if (componentRequested === "AppConfig") {
    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(appConfig);
  } else {
    //determine the React component we want to render based on what the CMS has requested...
    const ComponentToRender = Components[componentRequested];

    if (ComponentToRender) {
      return <ComponentToRender appConfig={appConfig} />;
    }
  }

  return <h2>Warning: App must be loaded within Agility CMS.</h2>;
}
