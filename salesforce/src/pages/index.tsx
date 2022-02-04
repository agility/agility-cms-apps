import agilityAppSDK from "@agility/app-sdk";
import React, { useState, useEffect } from "react"
import { SalesforceForm } from "../components/SalesforceForm";
import getConfig from "../constants/getConfig";

const AppConfig = getConfig(agilityAppSDK.types);

export default function App(): JSX.Element | null {
  const [componentRequested, setComponentRequested] = useState<string>('');
  //https://agilitycms-salesforce-app.vercel.app?location=CustomField&fieldTypeName=SalesforceForm&fieldName=SFForm&fieldID=bbc11e8e-4050-41f1-91f4-4391fd87401b&initiatorName=system&initiatorID=null
  useEffect(() => {
    const component = agilityAppSDK.resolveAppComponent(AppConfig);
    setComponentRequested(component);
  }, [componentRequested]);

  if (componentRequested === "AppConfig") {
    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(AppConfig);
  } else {

    console.log("componentRequested", componentRequested, "SalesforceForm.name", SalesforceForm.name)

    // render form builder if not on app config page
    if (componentRequested === SalesforceForm.name) {
      return <SalesforceForm />;
    }
    return <h2>Warning: App must be loaded within Agility CMS.</h2>;
  }
  return null;
}