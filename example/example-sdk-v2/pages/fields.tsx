
import { useElementHeight } from "@/hooks"
import { useAgilityAppSDK, contentItemMethods, assetsMethods } from "@agility/app-sdk"
import { useEffect, useState } from "react"


export default function ExampleField() {
	const { initializing, locale, field, contentItem, contentModel } = useAgilityAppSDK()
  const [normalizedCI, setNormalizedCI] = useState()
  const [title, setTitle] = useState()
  const [props, setProps] = useState()
  const [setRef, height] = useElementHeight()

  useEffect(() => {
    assetsMethods.setHeight({ height })
  }, [height])

  useEffect(() => {
    setTitle(contentItem?.Values.Title)
  }, [contentItem?.Values.Title])

	return (
    <div ref={setRef}>
      <p> Title: {title}</p>
      <p>{`The square height is ${height}px`}</p>
			<h1>Example App - Fields Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
      <div>Field: {JSON.stringify(field)}</div>
      <div>Content Item: {JSON.stringify(contentItem)}</div>
      <div>Normalized Content Item: {JSON.stringify(normalizedCI)}</div>
      <div>Content Model: {JSON.stringify(contentModel)}</div>
      <div>Props: {JSON.stringify(props) }</div>
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
				Open Modal {" "}
				<button
					onClick={async () => {
            await assetsMethods.openModal({ 
              name: "Tester", 
              props: {
                a: 1,
                b: 2
              }, 
              callback: (props: any) => setProps(props)
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