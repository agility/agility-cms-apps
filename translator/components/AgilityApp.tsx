import type {NextPage} from "next"
import styles from "../styles/Home.module.css"
import agilityAppSDK from "@agility/app-sdk"
import GoogleTranslateField from "../components/GoogleTranslateField"
import {ComponentType, useEffect, useState} from "react"

const Components: { [id: string]: ComponentType } = {
	GoogleTranslateField: GoogleTranslateField
}

const AppConfig = {
	name: "Translator",
	version: "1.0.0",
	documentationLink: "",
	configValues: [
		{
			name: "google_projectID",
			label: "Google Cloud Project ID",
			type: "string",
		},
		{
			name: "google_client_email",
			label: "Google Cloud Service Account Email",
			type: "string",
		},
		{
			name: "google_private_key",
			label: "Google Cloud Service Account Private Key",
			type: "string",
		},
	],
	appComponents: [
		{
			location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
			label: "Google Translator Field",
			name: "GoogleTranslateField",
			componentToRender: "GoogleTranslateField",
		},
	],
}

export default function AgilityApp () {
	const [componentRequested, setComponentRequested] = useState<string>("")

	useEffect(() => {
		const component = agilityAppSDK.resolveAppComponent(AppConfig)
		setComponentRequested(component)
	}, [componentRequested])

	if (componentRequested === "AppConfig") {
		//provide the CMS information about your app configuration
		agilityAppSDK.setAppConfig(AppConfig)
	} else {

		// render form builder if not on app config page
		const ComponentToRender = Components[componentRequested]

		if (ComponentToRender) {
			return <ComponentToRender />
		}
		return <h2>Warning: App must be loaded within Agility CMS.</h2>
	}
	return null
}

