// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	status: string
}

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	//TODO: perform any app install operations neccessary...
	res.status(200).json({ status: 'OK' })
}
