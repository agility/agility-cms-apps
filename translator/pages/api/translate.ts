// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { v2, TranslationServiceClient } from "@google-cloud/translate"
const Translate = v2.Translate


type Data = {
	value: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

	const projectId = 'agility-apps-examples';
	const key =  "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCqnLlyKUSraWA/\nuueTehFBbPEErnT8T9wOQrvtSo4oe90lcbPlB9WstupmilamMRikuSN7At7jsQFb\nXwHVppwkrZ1wblSjJc1GhdsWNPOS5z9BpBhLlKgKw3ExmYvfg/nSoCdENqJTcx5X\nZifzgTtmyf5NtZX/FglLAXPICtxQrxss34tGQzHEg0x/1Y2Sm7/B5mVZrPFZPxve\nV3roQAZdLWuAQz6o2OlVmHuIsSbxZrMTUinpVtPQIJLQdl23OqjUfxzfBr9WeYJp\no/27rtWyGjPHumegTrtT2Vxn6140PVpilx/sluQbg1Zd7LUIhVaUOO3+GBYRDllY\n8zM/UQS5AgMBAAECggEAKDWOmSKzveg0WGC+0imLJo270dwh0xMpLC07KCYRkeX7\nTSdae+hYSf/EB42j9UAN7Eh73bJkAGqHhNbD0mwVUamfOM+v39F5ax0B8N5i52Tb\nqic32Jw87Gh6ZXOoHPH4L1UyW+e6Ywt3A6ceVEvJSaTia8MXikpRv10kwekZWmQ/\n7Uux9L2je54j+Tvit8O9DPpcPoI8vhknNbIDDu5P69P9WCUMt3oGdKUpq1F3NAeH\nHZfD9SzTn6DlkkP3bNh+OXkqWOP0PDwDbXACtd0XOINpQ8hOf3kPTPKEpj4ZpNKk\nnGQ8kvF5zNHC4tVxUzsiCwTOHipZtAWNG6HRj+IAGQKBgQDVqrDnvoT91G4v7Xj5\ngZ4oXhBZyql3ueMw9c+iimfvmkmehDGVXFgxOE5F5k0Z6ITh9RBMpMIF3d/uGkOi\nDvJKdnkkT4VuuCjlxe/f6tIdGS38S/yUb1lMhUDkr2fUNzCUUL421NGbelbfPbT7\n759hDrBO/7j+o+zOv5cfrMlQhQKBgQDMakelOM5I3fbvtxWmJYTKt6NGKN2l65ph\npl7HI3Ai/aoHG95mI49dInnH+FftJ2Zo41ZVN8XX28kbACTugsBVQH1Tgv6oIu5O\nbxbSqUtJnQfuzSdf2oWxIz57zVGgh+wOkuosX6lLNdY5rLalr41SqLLkTuxwsrsk\nf2fGVzFTpQKBgQCBh5LrSrJw9sE9yObXy15H9o5PAO8vp781RS90yBcuSAhtUpKE\ni5DjddDtyynelPlJyjjxXchJqjJAtCdgLVNxFNVnz9WCQ553fUFoK4DpJwSbuK0M\nh1xJaVbny/ZTzoliwHgv4WCYstfLSitXt/KU8kSr/5b0uAetZrSE/UilyQKBgB41\nUpMrGukPzE9OmidsgfxHORzEK0U61Ry7LmR1azvwirD0QGCNvsD/uEmB/NRyLyMu\n/XIohNdKhqSz18FblzrCBgNSZ3nHd7ollpTZKeQeDa8PqFL1Ay7TS4eWJwr3Kz5Y\nHb0jAey4bwkk6fUARX1CqvUsaKqa7ycMoPRhrEt1AoGBAMiiMfz7gGTMJ1kFRPWj\nhuBXxFDbedYl4OrN6S/sg37nApf6w5ZqdJ9nZW92FoE/7T5isPHlQIxArkoifAHm\ns7tzqdzY5UUKPSMJBXAe+Vm1VdqdtgJpWKGJLtJdHtJ/DxzV2o/SpOTwhSUoIjmv\nXzTLqe7DnV9cwLQB8oQAo6He\n-----END PRIVATE KEY-----\n"

	console.log("key", key)

	const translate = new Translate({
		projectId,
		credentials: {
			private_key: key,
			client_email: "agilityappsexamples-joelvarty@agility-apps-examples.iam.gserviceaccount.com"
		}
	});

	const text = 'Hello, world!';

	// The target language
	const target = 'fr';

	// Translates some text into Russian
	const [translation] = await translate.translate(text, target);


	res.status(200).json({ value: `${translation}` })


}
