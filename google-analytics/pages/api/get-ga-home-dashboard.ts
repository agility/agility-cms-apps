// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { CHART_DURATIONS } from "@/constants"
import { IOAuthToken } from "../install"
import { google } from "googleapis"
import { getAuthenticatedClient } from "@/lib/get-authenticated-client"

type Data = {
	id: string
	name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const duration = `${req.query.duration}` || "7daysAgo"
	const profileId = `${req.query.profileId}` || ""

	const oauth2Client = getAuthenticatedClient()

	const oauthToken: IOAuthToken = req.body.oAuthToken

	// Set the access and refresh tokens on the OAuth2 client
	oauth2Client.setCredentials(oauthToken)

	// Use the Core Reporting API
	const analyticsreporting = google.analyticsreporting({ version: "v4", auth: oauth2Client })

	// Define the request parameters
	const requestBody = {
		reportRequests: [
			{
				viewId: profileId,
				dateRanges: [
					{
						startDate: duration,
						endDate: "today"
					}
				],
				metrics: [
					{
						expression: "ga:users"
					},
					{
						expression: "ga:newUsers"
					},
					{
						expression: "ga:pageviews"
					},
					{
						expression: "ga:sessionDuration"
					}
				],
				dimensions: [
					{
						name: duration === CHART_DURATIONS["365daysAgo"] ? "ga:month" : "ga:date"
					}
				]
			}
		]
	}

	// Call the Core Reporting API
	analyticsreporting.reports.batchGet(
		{
			requestBody: requestBody
		},
		// @ts-ignore
		(err, response) => {
			if (err) {
				console.error("Error calling Core Reporting API", err.message)
				return
			}
			if (response?.data) {
				res.status(200).json(response?.data)
			}
			res.status(400)
		}
	)
}
