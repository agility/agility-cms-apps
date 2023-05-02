import { useAgilityAppSDK, configMethods, openModal, IAppConfigValue } from "@agility/app-sdk"
import { useEffect } from "react"

export default function HomeDashboard() {
	const { initializing, appInstallContext, instance, locale } = useAgilityAppSDK()

	// Define a function to handle the modal's "OK" button click event.
	const handleModalOKClick = (result: any) => {
		console.log(`Modal closed with result: ${JSON.stringify(result)}`);
	};
  
	// Define the modal props.
	const modalProps = {
		title: "Example Modal",
		message: "This is an example modal dialog."
	};

	useEffect(() =>{
		console.log('useEffect', {appInstallContext})
	},[appInstallContext])
  
	return (
		<div>
			<h1>Example App - Home Dashboard</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>
				Set config val{" "}
				<button
					style={{backgroundColor:'lightgrey', border:'none', padding:'5px 10px', borderRadius:'5px'}}
					onClick={async () => {
						console.log('Before update config')

						const payload: IAppConfigValue = {
							name: "test",
							value: "test"
						}
						debugger;
						const p = await configMethods.updateConfigurationValue(payload)
						console.log('end update config', p)
					}}
				>
					SUBMIT
				</button>
			</div>
			<div>
				open modal{" "}
				<button
					style={{backgroundColor:'lightgrey', border:'none', padding:'5px 10px', borderRadius:'5px'}}
					onClick={() => {
						console.log('Before open modal')
						const p = openModal({
							name: "ExampleModal",
							props: modalProps,
							callback: handleModalOKClick
						})
						console.log('end open modal', p)
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}
