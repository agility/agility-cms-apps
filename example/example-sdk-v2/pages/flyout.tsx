
import { useAgilityAppSDK, assetsMethods } from "@agility/app-sdk"

export default function ExampleField() {
	const { initializing, appInstallContext, instance, locale } = useAgilityAppSDK()

	return (
		<div>
			<h1>Example App - Flyout Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
      <div>Context: {JSON.stringify(appInstallContext)}</div>
      <div>Instance: {JSON.stringify(instance)}</div>
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
		</div>
	)
}