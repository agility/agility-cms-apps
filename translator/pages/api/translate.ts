// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { v2, TranslationServiceClient } from "@google-cloud/translate"
const Translate = v2.Translate


type Data = {
	value: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	const projectId = "";
	const key =  ""

	console.log("key", key)

	const translate = new Translate({
		projectId,
		credentials: {
			private_key: key,
			client_email: ""
		}
	});

	const text = 'Hello, world!';

	// The target language
	const target = 'fr';

	// Translates some text into Russian
	const [translation] = await translate.translate(text, target);


	res.status(200).json({ value: `${translation}` })


}
