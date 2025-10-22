'use client'

import { useEffect } from "react"

export default function AgilityAPI() {
	useEffect(() => {
		let active = true
		const params = window.location.search
		let code = ""
		let state = ""
		let redirect_uri = ""
		if (params) {
			console.log("PARAMS", params)

			const urlParams = new URLSearchParams(params)
			redirect_uri = urlParams.get("redirect_uri") || ""
			code = urlParams.get("code") || ""
			state = urlParams.get("state") || ""

			console.log("redirect_uri", redirect_uri, "code", code, "state", state)

			if (code) {
				//todo: get the token...
				console.log("Got the code!", code)
				redirect_uri = state

				const formData = new FormData()
				formData.append("code", code)

				fetch("https://mgmt.aglty.io/oauth/token", {
					method: "post",
					body: formData
				})
					.then((res) => {
						if (!active) return
						res.text().then((str) => {
							if (res.ok) {
								console.log("GOT TOKEN RES", str)

								//kick back to the redirect uri with a hash code...
								const returnUrl = `${redirect_uri}#${encodeURIComponent(str)}`
								console.log("Return Url", returnUrl)
								window.location.href = returnUrl
							} else {
								console.error("Could not get token: ", res.status, res.statusText, str)
							}
						})
					})
					.catch((reason) => {
						if (!active) return
						console.error("Error getting token", reason)
					})

				return
			}
		}

		//build the auth string...
		let retUrl = window.location.href
		if (retUrl.includes("?")) retUrl = retUrl.substring(0, retUrl.indexOf("?"))

		//put the redirect url in the state so we know where to kick back to...
		const stateStr = redirect_uri
		const url = `https://mgmt.aglty.io/oauth/authorize?response_type=code&redirect_uri=${encodeURIComponent(
			retUrl
		)}&scope=offline_access&state=${encodeURIComponent(stateStr)}`

		console.log(url)
		window.location.href = url

		return () => {
			active = false
		}
	}, [])

	return (
		<main className="m-10">
			<h1 className="text-3xl font-bold">AUTH AGILITY API OFFLINE</h1>
		</main>
	)
}
