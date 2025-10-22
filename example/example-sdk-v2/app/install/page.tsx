'use client'

import { setExtraConfigValues, useAgilityPreInstall, IConfig } from "@agility/app-sdk"

export default function Install() {
	const { initializing, appInstallContext, instance, locale } = useAgilityPreInstall()

	if (initializing) return <div>Loading...</div>

	return (
		<div>
			<h1 className="text-lg font-bold">Install Screen</h1>
			<p>Install the stuff that this app needs.</p>

			<div className="mt-20">
				<button
					className="btn"
					onClick={() => {
						setExtraConfigValues([])
					}}
				>
					Complete Install
				</button>
			</div>
		</div>
	)
}
