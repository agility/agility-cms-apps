import axios from "axios"
import { useEffect, useState } from "react"
import {
	setExtraConfigValues,
	useAgilityPreInstall,
	IConfig
} from "@agility/app-sdk"
import "@agility/plenum-ui/lib/tailwind.css"
import ComboBox from "./components/ComboBox"

type Property = {
	id: string
	name: string
	accountId: string
}

export interface IOAuthToken {
	access_token: string
	refresh_token: string
	token_type: string
	expiry_date: number
}

export default function Install() {
	const [properties, setProperties] = useState<Property[]>([])
	const [profiles, setProfiles] = useState<Property[]>([])

	const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
	const [selectedProfile, setSelectedProfile] = useState<Property | null>(null)
	const { configuration } = useAgilityPreInstall()
	const [oAuthToken, setOAuthToken] = useState<IOAuthToken | null>(null)

	// Get the auth token from the app install context
	useEffect(() => {
		if (!configuration) return
		if (configuration.length === 0) return

		const token = JSON.parse(configuration[0].Value ?? "{}") as IOAuthToken
		setOAuthToken(token)
	}, [configuration])

	useEffect(() => {
		//get the list of web properties from the API
		if (!oAuthToken) return
		axios({
			method: "post",
			url: "/api/get-ga-properties?accountId=~all",
			data: {
				oAuthToken: oAuthToken
			}
		})
			.then((response) => {
				setProperties(response.data)
				if (response.data.length > 0) {
					setSelectedProperty(response.data[0])
				}
			})
			.catch((error) => {
				console.log(error)
			})

		return () => {}
	}, [oAuthToken])

	useEffect(() => {
		//get the list of web properties from the API
		if (!oAuthToken) return
		if (!selectedProperty) return

		axios({
			method: "post",
			url: `/api/get-ga-views?accountId=${selectedProperty.accountId}&propertyId=${selectedProperty.id}`,
			data: {
				oAuthToken: oAuthToken
			}
		})
			.then((response) => {
				setProfiles(response.data)
				if (response.data.length > 0) {
					setSelectedProfile(response.data[0])
				}
			})
			.catch((error) => {
				console.log(error)
			})

		return () => {}
	}, [selectedProperty, oAuthToken])

	useEffect(() => {
		if (!selectedProperty) return
		if (!selectedProfile) return
		if (!configuration) return

		const extraConfigValues: IConfig[] = [
			{
				Name: "propertyId",
				Value: selectedProperty.id,
				Label: "Property ID",
				Type: "GoogleAnalyticsPropertyId"
			},
			{
				Name: "profileId",
				Value: selectedProfile.id,
				Label: "Profile ID",
				Type: "GoogleAnalyticsProfileId"
			}
		]
		const payload = [...configuration, ...extraConfigValues]

		const handleSetExtraConfigValues = async () => {
			await setExtraConfigValues(payload)
		}
		handleSetExtraConfigValues()
	}, [selectedProperty, selectedProfile, configuration])

	return (
		<div>
			<p className="mt-4 mb-4">Select a Google Analytics property and profile for us to get data from.</p>

			<div>
				<div>Properties & Apps</div>
				{properties && properties.length > 0 && (
					<ComboBox
						items={properties ?? []}
						selectedItem={selectedProperty}
						itemIdKey="id"
						itemLabelKey="name"
						setSelectedItem={setSelectedProperty}
					/>
				)}
			</div>

			<div>
				<div>View</div>
				{profiles && profiles.length > 0 && (
					<ComboBox
						items={profiles ?? []}
						selectedItem={selectedProfile}
						itemIdKey="id"
						itemLabelKey="name"
						setSelectedItem={setSelectedProfile}
					/>
				)}
			</div>
		</div>
	)
}
