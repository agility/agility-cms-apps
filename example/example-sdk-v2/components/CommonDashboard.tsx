import { useAgilityAppSDK, IAppConfigValue, useResizeHeight, assetsMethods, openModal } from "@agility/app-sdk"
import { useState } from "react"

export default function CommonDashboard() {
	const { initializing, locale, appInstallContext } = useAgilityAppSDK()
	const [config, setConfig] = useState<IAppConfigValue>()

	const ref = useResizeHeight()

	return (
		<div ref={ref}>
			<h1>Example App - Dashboard</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>Config: {JSON.stringify(appInstallContext?.configuration)}</div>
			<div>
				Select Assets{" "}
				<button
					className="btn"
					onClick={() => {
						assetsMethods.selectAssets({
							title: "Hi",
							singleSelectOnly: false,
							callback: (v: any) => alert("Selected " + JSON.stringify(v))
						})
					}}
				>
					GO
				</button>
			</div>

			<div>
				Open Modal{" "}
				<button
					className="btn"
					onClick={async () => {
						openModal({
							title: "Example Modal",
							name: "example-modal",
							props: {
								hi: "there",
								dt: new Date()
							},
							callback: (result: any) => {
								console.log("CLOSED MODAL", result)
								alert("Returned from modal: " + JSON.stringify(result))
							}
						})
					}}
				>
					GO
				</button>
			</div>
		</div>
	)
}