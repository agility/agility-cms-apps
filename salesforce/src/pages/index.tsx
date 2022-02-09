import agilityAppSDK from "@agility/app-sdk";
import React, { useState, useEffect } from "react"
import { SalesforceForm } from "../components/SalesforceForm";

type ComponentType = {
  [key: string]: () => JSX.Element
}

const Components: ComponentType = { SalesforceForm };

const AppConfig = {
  name: "Salesforce",
  version: "1.0.0",
  documentationLink: "https://agilitycms.com/docs/developers/salesforce-lead",
  configValues: [
    { name: "leadOID", label: "Salesforce Lead OID", type: "string" },
  ],
  appComponents: [
    {
      location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
      label: "Salesforce Form",
      name: "SalesforceForm",
      componentToRender: "SalesforceForm",
    },
  ],
}

export default function App(): JSX.Element | null {
  const [componentRequested, setComponentRequested] = useState<string>('');
  useEffect(() => {
    const component = agilityAppSDK.resolveAppComponent(AppConfig);
    setComponentRequested(component);
  }, [componentRequested]);

  if (componentRequested === "AppConfig") {
    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(AppConfig);
  } else {
    // render form builder if not on app config page
    const ComponentToRender = Components[componentRequested];

    if (ComponentToRender) {
      return <ComponentToRender />;
    }
    return <h2>Warning: App must be loaded within Agility CMS.</h2>;
  }
  return null;
}