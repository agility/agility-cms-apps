// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {	google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/get-authenticated-client';



type Data = {
	id: string
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[]>
) {

	const accountId = `${req.query.accountId}` || ""
	const oauth2Client = getAuthenticatedClient()
	const analytics = google.analytics('v3');


	const properties = await analytics.management.webproperties.list({
		auth: oauth2Client,
		accountId
	})
	const retVal = properties?.data?.items?.map((property) => {
		return {
			id: property.id || "",
			name: property.name || ""
		}
	}) || []


	res.status(200).json(retVal)
}
