import { contentItemMethods, openModal, useAgilityAppSDK, assetsMethods, IContentItem } from "@agility/app-sdk"
import { useEffect, useState } from "react"

export default function ContentItemSidebar() {
	const { initializing, locale, contentItem } = useAgilityAppSDK()
  const [normalizedCI, setNormalizedCI] = useState<IContentItem | null>()
  const [heading, setHeading] = useState()

  useEffect(() => {
    setHeading(contentItem?.values.Heading)
  }, [contentItem, contentItem?.values.Heading])

	return (
		<div>
			<p> Heading: {heading}</p>
			<h1>Example App - ContentItemSidebar Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>Content Item: {JSON.stringify(normalizedCI)}</div>

			<div>
				Save Content Item:
				<button
					className="btn"
					onClick={async () => {
						await contentItemMethods.saveContentItem()
					}}
				>
					Save
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
				Add Field Listener to Heading{" "}
				<button
					className="btn"
					onClick={async () => {
						await contentItemMethods.addFieldListener({
							fieldName: "Heading",
							onChange: (t) => setHeading(t)
						})
					}}
				>
					GO
				</button>
			</div>
			<div>
				Remove Field Listener to Heading{" "}
				<button
					className="btn"
					onClick={async () => {
						await contentItemMethods.removeFieldListener({ fieldName: "Heading" })
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