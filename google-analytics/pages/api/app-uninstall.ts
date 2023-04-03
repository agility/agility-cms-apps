// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	status: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//TODO: perform any app uninstall operations neccessary...
	//NOTE: this will be called as part of a "fire and forget operation"
	console.log("UNINSTALL ACTION FIRED")
	res.status(200).json({ status: 'OK' })
}
