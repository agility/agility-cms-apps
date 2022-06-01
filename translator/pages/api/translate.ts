// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 } from "@google-cloud/translate"
const Translate = v2.Translate


type Data = {
	values: any
}

export default async function translate(req: NextApiRequest, res: NextApiResponse<Data>) {

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

	// // The target language
	const target = req.body.locale;


	// // Translates some text into Russian
	const values:any = {}
	for (let key in req.body.textValues) {
		const valueToTranslate = req.body.textValues[key]

		try {
			const [value] = await translate.translate(valueToTranslate, target);
			values[key] = value
		} catch (error) {
			console.log("COULD NOT TRANSLATE", key, error)
			values[key] = null
		}
	}



	res.status(200).json({ values })


}
