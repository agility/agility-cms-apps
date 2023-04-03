// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import {	google } from 'googleapis';
import { getAuthenticatedClient } from '@/lib/get-authenticated-client';



type Data = {
	id: string | null | undefined,
	name: string | null | undefined
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data[]>
) {

	const oauth2Client = getAuthenticatedClient()
	const analytics = google.analytics('v3');

	const accounts = await analytics.management.accounts.list({
		auth: oauth2Client
	})


	console.log("accounts", accounts)

	const retVal = accounts?.data?.items?.map((account) => {
		return {
			id: account.id,
			name: account.name
		}
	}) || []


	res.status(200).json(retVal)
}
