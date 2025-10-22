'use client'

import { openModal, useAgilityAppSDK, contentItemMethods, refresh, assetsMethods } from "@agility/app-sdk"
import { useState } from "react"

export default function ContentListSidebar() {
	const { initializing, locale } = useAgilityAppSDK()
	const [selected, setSelectedItems] = useState<any>([])
	return (
		<div>
			<h1>Example App - ContentListSidebar Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>Selected: {JSON.stringify(selected)}</div>
			<div>
				Select Assets{" "}
				<button
					className="btn"
					onClick={() => {
						assetsMethods.selectAssets({
							title: "Hi",
							singleSelectOnly: false,
							callback: (v: any) => console.log("hi 3")
						})
					}}
				>
					GO
				</button>
			</div>
			<div>
				Refresh{" "}
				<button
					className="btn"
					onClick={() => {
						refresh()
					}}
				>
					GO
				</button>
			</div>
			<div>
				Add Listener to Selected Items{" "}
				<button
					className="btn"
					onClick={async () => {
						contentItemMethods.addSelectedItemListener({ onChange: (s) => setSelectedItems(s) })
					}}
				>
					GO
				</button>
			</div>
			<div>
				Remove Listener to Selected Items{" "}
				<button
					className="btn"
					onClick={async () => {
						contentItemMethods.removeSelectedItemListener()
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
			<div>
				Get Selected Items{" "}
				<button
					className="btn"
					onClick={async () => {
						const s = await contentItemMethods.getSelectedItems()
						setSelectedItems(s)
					}}
				>
					GO
				</button>
			</div>
		</div>
	)
}
