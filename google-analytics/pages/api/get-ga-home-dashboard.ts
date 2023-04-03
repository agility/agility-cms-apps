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

	const propertyID = `${req.query.propertID}` || ""

	const oauth2Client = getAuthenticatedClient()
	const analytics = google.analytics('v3');

	//TODO: get the data for this property to display on the home dashboard

	//CHECK THIS: https://developers.google.com/analytics/devguides/reporting/core/v3/reference

	analytics.data.ga.get({
		auth: oauth2Client,

	})


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

