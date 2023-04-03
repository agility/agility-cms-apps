import Head from "next/head"
import { useEffect } from "react"
import axios, { Method } from "axios"

export default function GoogleAPI() {
	const initialize = () => {
		const params = window.location.search
		const urlParams = new URLSearchParams(params)
		const redirect_uri = urlParams.get("redirect_uri") || ""

		const stateStr = redirect_uri

		axios({
			method: "POST",
			url: "/api/get-auth-url",
			data: { state: stateStr }
		})
			.then((res) => {
				console.log("GOT auth url", res.data.url)
				window.location.href = res.data.url
			})
			.catch((err) => {
				console.error("Error getting auth url", err)
			})
	}

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

				const body = new FormData()
				body.append("code", code)

				axios({
					method: "POST",
					url: "/api/get-auth-token",
					data: { code: code }
				})
					.then((res) => {
						console.log("GOT TOKEN RES", res.data)
						const str = JSON.stringify(res.data.tokens)
						//kick back to the redirect uri with a hash code...
						const returnUrl = `${redirect_uri}#${encodeURIComponent(str)}`
						console.log("Return Url", returnUrl)
						window.location.href = returnUrl
					})
					.catch((err) => {
						console.error("Error getting token", err)
					})

				return
			}
		}

		//get the auth url and redirect to it...
		initialize()


	}, [])

	return (
		<>
			<Head>
				<title>Example App</title>
				<meta name="description" content="An example app showing the capabilities of the Agility App SDK v2" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="m-10">
				<h1 className="text-3xl font-bold">Connecting to Google Analytics</h1>
			</main>
		</>
	)
}
