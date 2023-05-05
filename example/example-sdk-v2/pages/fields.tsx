
import { useAgilityAppSDK, contentItemMethods, setHeight, openModal, useElementHeight, assetsMethods, setVisibility } from "@agility/app-sdk"
import { useEffect, useState } from "react"


export default function ExampleField() {
	const { initializing, locale, field, contentItem } = useAgilityAppSDK()
  const [normalizedCI, setNormalizedCI] = useState()
  const [title, setTitle] = useState()
  const [setRef, height] = useElementHeight()

  useEffect(() => {
    setHeight({ height })
  }, [height])

  useEffect(() => {
    setTitle(contentItem?.values.Title)
  }, [contentItem?.values.Title])

	return (
    <div ref={setRef}>
      <p> Title: {title}</p>
      <p> Field: {field?.id} </p>
      <p>{`The square height is ${height}px`}</p>
			<h1>Example App - Fields Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
      <div>Normalized Content Item: {JSON.stringify(normalizedCI)}</div>
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
        Hide Field {" "}
        <button
					onClick={() => {
           setVisibility({ fieldID: field!.id, visibility: false })
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
              title: "Tester Fields", 
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
            console.log(`Setting content item`, p)
						setNormalizedCI(p as any)
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}