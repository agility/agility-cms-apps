import { useAgilityAppSDK, configMethods, IAppConfigValue } from "@agility/app-sdk"
import { useState } from "react"

export default function HomeDashboard() {
	const { initializing, locale } = useAgilityAppSDK()
	const [config, setConfig] = useState<IAppConfigValue>()

	return (
		<div>
			<h1>Example App - Home Dashboard</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>Config: {JSON.stringify(config)}</div>
			<div>
				Set config val{" "}
				<button
					onClick={async () => {
						const res = await configMethods.updateConfigurationValue({ name: "test", value: "test" })
						setConfig(res)
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}
