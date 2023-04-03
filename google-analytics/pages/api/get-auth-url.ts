
import { getOauth2Client } from '@/lib/get-oauth2-client';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
	url: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	const state = req.body.state || ""

	console.log("Gen url with state", req.body)

	const redirectUrl = process.env.GOOGLE_REDIRECT_URI;


	const oauth2Client = getOauth2Client()

	// generate a url that asks permissions for Blogger and Google Calendar scopes
	const scopes = [
		'https://www.googleapis.com/auth/analytics.readonly'
	];

	const url = oauth2Client.generateAuthUrl({
		// 'online' (default) or 'offline' (gets refresh_token)
		access_type: 'offline',

		// If you only need one scope you can pass it as a string
		scope: scopes,
		state: state,
		redirect_uri: redirectUrl

	});


	console.log("Generated URL", url)

	res.status(200).json({ url })
}
