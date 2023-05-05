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
			<div>normalizedCI: {JSON.stringify(normalizedCI)}</div>
			<div>
				Select Assets {" "}
				<button
					onClick={() => {
           assetsMethods.selectAssets({ title: "Hi", singleSelectOnly: false, callback: (v: any) => console.log("hi 3")})
					}}
				>
					SUBMIT
				</button>
			</div>
      <div>
        Add Field Listener to Heading {" "}
        <button
            onClick={async () => {
              await contentItemMethods.addFieldListener({ fieldName: "Heading", onChange: (t) => setHeading(t) })
            }}
          >
            SUBMIT
        </button>
      </div>
      <div>
        Remove Field Listener to Heading {" "}
        <button
            onClick={async () => {
              await contentItemMethods.removeFieldListener({ fieldName: "Heading" })
            }}
          >
            SUBMIT
        </button>
      </div>
      <div>
				Open Modal {" "}
				<button
					onClick={async () => {
            openModal({ 
              title: "Tester Content Item Sidebar", 
              callback: (props: any) => {}
            })
					}}
				>
					SUBMIT
				</button>
			</div>
			<div>
				Get Content Item {" "}
				<button
					onClick={async () => {
            const p = await contentItemMethods.getContentItem()
						setNormalizedCI(p as any)
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}