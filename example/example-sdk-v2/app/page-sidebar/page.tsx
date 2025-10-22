'use client'

import { useAgilityAppSDK, assetsMethods, openModal, pageMethods, IPageItem } from "@agility/app-sdk"
import { useState } from "react"

export default function PagesSidebar() {
	const { initializing, locale, pageItem } = useAgilityAppSDK()
	const [page, setPage] = useState<IPageItem | null>()

	return (
		<div>
			<h1>Example App - Pages Sidebar</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>
				Get Page Item{" "}
				<button
					className="btn"
					onClick={async () => {
						const p = await pageMethods.getPageItem()
						setPage(p)
					}}
				>
					GO
				</button>
			</div>
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
			<div>Page : {JSON.stringify(page)}</div>
		</div>
	)
}
