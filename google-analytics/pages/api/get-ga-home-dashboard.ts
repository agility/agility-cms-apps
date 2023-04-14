// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { google } from "googleapis"
import { getAuthenticatedClient } from "@/lib/get-authenticated-client"

type Data = {
	id: string
	name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	const code = `${req.query.code}` || ""
	const duration = `${req.query.duration}` || "7daysAgo"
	const propertyID = `${req.query.propertID}` || ""

	const oauth2Client = getAuthenticatedClient()
	const analytics = google.analytics("v3")

	//TODO: get the data for this property to display on the home dashboard

	//CHECK THIS: https://developers.google.com/analytics/devguides/reporting/core/v3/reference

	// Generate the URL that will be used for the user to authorize access
	const authorizeUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: ["https://www.googleapis.com/auth/analytics.readonly"]
	})

	console.log("Authorize URL:", authorizeUrl)

	const token = {}
	// Set the access and refresh tokens on the OAuth2 client
	oauth2Client.setCredentials(token)

	// Use the Core Reporting API
	google.loa
	const analyticsreporting = google.analyticsreporting({ version: "v4", auth: oauth2Client })

	// Define the request parameters
	const requestBody = {
		reportRequests: [
			{
				viewId: "36647364",
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
						name: "ga:date"
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
				console.error("Error calling Core Reporting API", err)
				return
			}

			console.log("Core Reporting API response:", JSON.stringify(response?.data))

			if (response?.data) {
				res.status(200).json(response?.data)
			}
			res.status(400)
		}
	)
}
