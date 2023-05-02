// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {	google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/get-authenticated-client';
import { IOAuthToken } from '../install';

type Data = {
	id: string
	name: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[]>
) { 

	const accountId = `${req.query.accountId}` || ""
    const propertyId = `${req.query.propertyId}` || ""

	const oauthToken: IOAuthToken = req.body.oAuthToken

	const oauth2Client = getAuthenticatedClient()
	oauth2Client.setCredentials(oauthToken)
	const analytics = google.analytics('v3');

    const profiles = await analytics.management.profiles.list({
        auth: oauth2Client,
        accountId: accountId,
        webPropertyId: propertyId
      });

	const retVal = profiles?.data?.items?.map((property) => {
		return {
			id: property.id || "",
			name: property.name || ""
		}
	}) || []


	res.status(200).json(retVal)
}
