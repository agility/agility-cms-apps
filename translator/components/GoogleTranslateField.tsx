import { useEffect, useRef, useState } from "react"
import agilityAppSDK from "@agility/app-sdk"

interface FieldConfig {
	label?: string
	required?: boolean
	description?: string
	readOnly?: boolean
}

interface ContentItem {
	contentID: number
	referenceName: string
	values: {[id: string]: any}
}

export default function GoogleTranslateField() {
	const [value, setValue] = useState("")
	const [contentItem, setContentItem] = useState<ContentItem | null>(null)
	const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null)
	const [configValues, setConfigValues] = useState<{leadOID: string} | null>(null)
	const [sdk, setSDK] = useState<any>({})

	// set ref
	const containerRef = useRef(null)

	// initialize field
	useEffect(() => {
		agilityAppSDK.initializeField({containerRef}).then((fieldSDK: any) => {
			setSDK(fieldSDK)
			setValue(fieldSDK.field.value)
			setConfigValues(fieldSDK.configValues)
			setFieldConfig(fieldSDK.field)

			fieldSDK.getContentItem().then((contentItem: ContentItem) => {
				setContentItem(contentItem)
			})

		})
	}, [])

	const translate = async () => {
		console.log("TRANSLATE IT ")

		const itemNow:ContentItem = await sdk.getContentItem()

		const fieldVal = sdk.getFieldValue("Category")

		console.log(itemNow.values, fieldVal)




	}

	return (
		<div ref={containerRef}>
			{(contentItem?.contentID || 0) > 0 &&
				<div>
					<div>GOOGLE TRANSLATE</div>
					<div>Click to translate this item.</div>
					<div>
						<button onClick={() => translate()} className="rounded-md bg-gray-100 py-1 px-3 hover:bg-gray-200 focus:bg-gray-200">Translate</button>
					</div>

				</div>
			}
		</div>
	)
}