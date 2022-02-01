//@ts-ignore
import agilityAppSDK from "@agility/app-sdk";
import React, { useState, useEffect } from "react"
import { SalesforceForm } from "../components/SalesforceForm";
import getConfig from "../contstants/getConfig";

const AppConfig = getConfig(agilityAppSDK.types);

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
    if (componentRequested === SalesforceForm.name) {
      return <SalesforceForm />;
    }
    return <h2>Warning: App must be loaded within Agility CMS.</h2>;
  }
  return null;
}