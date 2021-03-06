import {useEffect, useRef, useState} from "react"
import agilityAppSDK from "@agility/app-sdk"
import axios from "axios"
import languages from "../data/locales.json"

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

interface ContentField {
	label: string
	name: string
	dataField: boolean
	description: string
	designerOnly: boolean
	editable: boolean
	fieldType: string
	hidden: boolean
	itemOrder: number
}

interface ContentModel {
	modelID: number
	title: string
	referenceName: string
	fields: [ContentField]
}

export default function GoogleTranslateField() {
	const [value, setValue] = useState("")
	const [contentItem, setContentItem] = useState<ContentItem | null>(null)
	const [contentModel, setContentModel] = useState<ContentModel | null>(null)
	const [fieldConfig, setFieldConfig] = useState<FieldConfig | null>(null)
	const [configValues, setConfigValues] = useState<{leadOID: string} | null>(null)
	const [sdk, setSDK] = useState<any>({})
	const [locale, setLocale] = useState<any>(null)
	const [processing, setProcessing] = useState(false)

	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [msg, setMsg] = useState<string | null>(null)

	const [detected, setDetected] = useState(false)
	const [needsTranslation, setNeedsTranslation] = useState(false)

	// set ref
	const containerRef = useRef(null)

	// initialize field
	useEffect(() => {
		agilityAppSDK.initializeField({containerRef}).then((fieldSDK: any) => {
			setSDK(fieldSDK)
			setValue(fieldSDK.field.value)
			setConfigValues(fieldSDK.configValues)
			setFieldConfig(fieldSDK.field)

			setContentItem(fieldSDK.contentItem)
			setContentModel(fieldSDK.contentModel)

			let languageCode: string = fieldSDK.locale
			if (languageCode.length > 2) languageCode = languageCode.substring(0, 2).toLowerCase()

			changeLocale(languageCode)

			//on load, we should be checking the language of the content against the current language
			// and HIDE this if we do NOT need to translate it
			detectCurrentLanguage(fieldSDK, languageCode)
		})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const changeLocale = (languageCode: string) => {
		if (!languageCode) {
			setLocale(null)
		} else {
			const theLocale = languages.find((l) => l.code === languageCode)
			if (theLocale) setLocale(theLocale)
		}
	}


	const detectCurrentLanguage = async (fieldSDK: any, languageCode: string) => {

		try {
			const item: ContentItem = fieldSDK.contentItem

			if (item.contentID < 1) return

			const model:ContentModel = fieldSDK.contentModel
			let body: any = {
				configValues: fieldSDK.configValues,
				textValues: {},
			}

			//loop all the field fields and pull out the text or html that are NOT hidden
			model?.fields
				.filter((f) => f.dataField && !f.hidden && (f.fieldType === "Text" || f.fieldType === "HTML"))
				.forEach((field) => {
					body.textValues[field.name] = item.values[field.name]
				})

			//send the request to our translation function....
			const res = await axios.post("/api/detect", body)

			if (res.data?.detectedLanguage !== languageCode) {
				setNeedsTranslation(true)
			} else {
				console.log("detected lang: ", res.data?.detectedLanguage, "current lang: ", languageCode)
			}

		} catch (error) {
			//TODO: figure out how to show an error message here...
			console.error("An error occurred while detecting language: ", error)
		} finally {
			setDetected(true)
		}
	}

	const translate = async () => {
		if (!locale) {
			//TODO: show an error here...
			setErrorMsg("Please select a locale to translate to.")
			return
		}

		setProcessing(true)
		setErrorMsg(null)

		try {
			const item: ContentItem = await sdk.getContentItem()

			let body: any = {
				locale: locale.code,
				configValues,
				textValues: {},
			}

			//loop all the field fields and pull out the text or html that are NOT hidden
			contentModel?.fields
				.filter((f) => f.dataField && !f.hidden && (f.fieldType === "Text" || f.fieldType === "HTML"))
				.forEach((field) => {
					body.textValues[field.name] = item.values[field.name]
				})

			//send the request to our translation function....
			const res = await axios.post("/api/translate", body)
			let fieldsUpdateCount = 0
			for (let fieldName in res.data.values) {
				const fieldValue = res.data.values[fieldName]

				if (fieldValue) {
					sdk.updateFieldValue({ fieldName, fieldValue })
					fieldsUpdateCount++
				}
			}

			setMsg(`${fieldsUpdateCount} field(s) updated.`)

		} catch (error) {
			setErrorMsg("An error occurred while translating.")
			console.error("An error occurred while translating: ", error)
		} finally {
			setProcessing(false)
		}
	}

	return (
		<div ref={containerRef}>
			{(contentItem?.contentID || 0) > 0 && !detected && <div className="text-xs">Detecting current language...</div>}
			{(contentItem?.contentID || 0) > 0 && needsTranslation && (
				<div className="border border-gray-300 rounded p-3">
					<div className="flex items-center justify-between pb-2">
						<div>GOOGLE TRANSLATE</div>
						{errorMsg && <div className="bg-red-200 text-red-600 text-xs rounded py-1 px-2">{errorMsg} </div>}
						{!errorMsg && msg && <div className="bg-blue-200 text-blue-600 text-xs rounded py-1 px-2">{msg} </div>}
					</div>
					<div className="flex items-center">
						<div className="flex-1">
							Click to translate the text values in this item to&nbsp;
							<select
								className="bg-blue-100 rounded-xl px-2"
								value={locale?.code}
								onChange={(e) => changeLocale(e.target.value)}
							>
								<option value="">Select Locale</option>
								{languages.map((lang) => (
									<option key={lang.code} value={lang.code}>
										{lang.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<button
								onClick={() => translate()}
								className="rounded-md w-48 bg-gray-200 py-1 px-3 hover:bg-gray-300 focus:bg-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
								disabled={processing}
							>
								{!processing && "Translate"}
								{processing && "Processing..."}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
