
import { useAgilityAppSDK, contentItemMethods, openModal } from "@agility/app-sdk"
import { useState } from "react"

export default function ExampleField() {
	const { initializing, appInstallContext, instance, locale } = useAgilityAppSDK()
  const [contentItem, setContentItem] = useState()
  const [props, setProps] = useState()

	return (
		<div>
			<h1>Example App - Fields Application</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
      <div>Context: {JSON.stringify(appInstallContext)}</div>
      <div>Content Item: {JSON.stringify(contentItem)}</div>
      <div>Props: {JSON.stringify(props) }</div>
      <div>
				Open Modal {" "}
				<button
					onClick={async () => {
            await openModal({ 
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
						setContentItem(p)
					}}
				>
					SUBMIT
				</button>
			</div>
		</div>
	)
}