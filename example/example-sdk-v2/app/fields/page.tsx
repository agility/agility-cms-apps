'use client'

import { useAgilityAppSDK, contentItemMethods, setHeight, openModal, useResizeHeight, assetsMethods, setVisibility } from "@agility/app-sdk"
import { useEffect, useState } from "react"

export default function Fields() {
	const { initializing, locale, field, contentItem } = useAgilityAppSDK()
	const [normalizedCI, setNormalizedCI] = useState()
	const [title, setTitle] = useState()
	const elemRef = useResizeHeight()

	useEffect(() => {
		setTitle(contentItem?.values.Title)
	}, [contentItem?.values.Title])

	return (
		<div ref={elemRef}>
			<p> Title: {title}</p>
			<p> Field: {field?.id} </p>

			<h1>Example App - Fields Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>Normalized Content Item: {JSON.stringify(normalizedCI)}</div>
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
				Hide Field{" "}
				<button
					className="btn"
					onClick={() => {
						setVisibility({ fieldName: field!.name, visibility: false })
					}}
				>
					GO
				</button>
			</div>
			<div>
				Add Field Listener to Title{" "}
				<button
					className="btn"
					onClick={async () => {
						await contentItemMethods.addFieldListener({ fieldName: "Title", onChange: (t) => setTitle(t) })
					}}
				>
					GO
				</button>
			</div>
			<div>
				Remove Field Listener to Title{" "}
				<button
					className="btn"
					onClick={async () => {
						await contentItemMethods.removeFieldListener({ fieldName: "Title" })
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
				Get Content Item{" "}
				<button
					className="btn"
					onClick={async () => {
						const p = await contentItemMethods.getContentItem()
						setNormalizedCI(p as any)
					}}
				>
					GO
				</button>
			</div>
		</div>
	)
}
