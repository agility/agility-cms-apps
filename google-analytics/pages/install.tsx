import axios from "axios"
import { useEffect, useState } from "react"

type Property = {
	id: string
	name: string
}

export default function Install() {
	const [properties, setProperties] = useState<Property[]>([])
	const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

	useEffect(() => {
		//get the list of web properties from the API
		axios({
			method: "get",
			url: "/api/get-ga-properties?accountId=~all"
		})
			.then((response) => {
				console.log(response)
				setProperties(response.data)
			})
			.catch((error) => {
				console.log(error)
			})

		return () => {}
	}, [])

	return (
		<div>
			<h1>Install</h1>
			<p>Install the stuff that this app needs.</p>
			<p>We need to fire an OK callback for this to allow the install process to continue.</p>

			<div>
				<select
					onChange={(e) => {
						setSelectedProperty(properties.find((property) => property.id === e.target.value) || null)
					}}
				>
					{properties.map((property) => (
						<option key={property.id} value={property.id}>
							{property.name}
						</option>
					))}
				</select>
			</div>


			<div>Selected Property: {selectedProperty?.name}</div>

		</div>
	)
}
