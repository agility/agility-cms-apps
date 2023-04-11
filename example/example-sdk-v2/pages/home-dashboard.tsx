
import { useAgilityAppSDK } from '@agility/app-sdk'

export default function HomeDashboard() {

	const {  initializing, appInstallContext, instance, locale} = useAgilityAppSDK()

	return (
		<div>
			<h1>Example App - Home Dashboard</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
		</div>
	)
}