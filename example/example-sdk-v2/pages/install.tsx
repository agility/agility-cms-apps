
import { setExtraConfigValues, useAgilityPreInstall, IConfig } from "@agility/app-sdk"

export default function Install() {
	const { initializing, appInstallContext, instance, locale } = useAgilityPreInstall()

	if (initializing) return <div>Loading...</div>

	return <div>
		<h1 className="font-bold text-lg">Install Screen</h1>
		<p>Install the stuff that this app needs.</p>


		<div className="mt-20">
			<button className="btn" className="border border-gray-300 p-1 px-3 rounded-md hover:bg-gray-50 focus:bg-gray-100" onClick={() => {
				setExtraConfigValues([])
			}}>Complete Install</button>
		</div>

	</div>
}