// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 } from "@google-cloud/translate"
const Translate = v2.Translate


type Data = {
	detectedLanguage: string | null
}

export default async function detect(req: NextApiRequest, res: NextApiResponse<Data>) {

	const projectId = req.body.configValues.google_projectID
	const client_email = req.body.configValues.google_client_email
	let private_key:string = req.body.configValues.google_private_key
	private_key = private_key.replace(/\\n/g, "\n")

	const translate = new Translate({
		projectId,
		credentials: {
			private_key,
			client_email
		}
	});


	// // Translates some text into Russian
	let detectedLanguage:string|null = null
	for (let key in req.body.textValues) {
		const valueToTranslate = req.body.textValues[key]

		try {
			const value = await translate.detect(valueToTranslate);

			if (value[0].confidence === 1) {
				detectedLanguage = value[0].language
				break
			}

		} catch (error) {
			console.log("COULD NOT detect language", key, error)
		}
	}



	res.status(200).json({ detectedLanguage })


}
