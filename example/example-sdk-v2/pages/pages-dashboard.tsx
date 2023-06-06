import CommonDashboard from "@/components/CommonDashboard"
import { useAgilityAppSDK, openModal, configMethods, assetsMethods, IAppConfigValue } from "@agility/app-sdk"
import { useState } from "react"

export default function PagesDashboard() {
	const { initializing, locale } = useAgilityAppSDK()
	const [config, setConfig] = useState<IAppConfigValue>()

	return <CommonDashboard />
}
