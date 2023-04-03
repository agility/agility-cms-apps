// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOauth2Client } from '@/lib/get-oauth2-client';
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
	tokens: any
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {

	console.log("GETTING CODE", req.body.code)

	const code = req.body.code || ""
	const oauth2Client = getOauth2Client()

	const { tokens } = await oauth2Client.getToken(code)


	console.log("got token", tokens)

	res.status(200).json({ tokens })
}
