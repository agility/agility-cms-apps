import { contentItemMethods, openModal, useAgilityAppSDK, assetsMethods, IContentItem } from "@agility/app-sdk"
import { useEffect, useState } from "react"

export default function ContentItemSidebar() {
	const { initializing, locale, contentItem } = useAgilityAppSDK()
  const [normalizedCI, setNormalizedCI] = useState<IContentItem | null>()
  const [title, setTitle] = useState()

  useEffect(() => {
    setTitle(contentItem?.values.Title)
  }, [contentItem, contentItem?.values.Title])

	return (
    <div>
      <p> Title: {title}</p>
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
        Add Field Listener to Title {" "}
        <button
            onClick={async () => {
              await contentItemMethods.addFieldListener({ fieldName: "Title", onChange: (t) => setTitle(t) })
            }}
          >
            SUBMIT
        </button>
      </div>
      <div>
        Remove Field Listener to Title {" "}
        <button
            onClick={async () => {
              await contentItemMethods.removeFieldListener({ fieldName: "Title" })
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