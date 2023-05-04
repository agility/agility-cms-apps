import { useAgilityAppSDK, configMethods, IAppConfigValue, openModal, assetsMethods} from "@agility/app-sdk"
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
				Select Assets {" "}
				<button
					onClick={() => {
           assetsMethods.selectAssets({ title: "Hi", singleSelectOnly: false, callback: (v: any) => console.log("hi 3")})
					}}
				>
					SUBMIT
				</button>
			</div>
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
			<div>
				Open Modal {" "}
				<button
					onClick={async () => {
            openModal({ 
              title: "Tester Home dashboard", 
              callback: (props: any) => {}
            })
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}
