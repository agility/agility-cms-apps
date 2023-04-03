
import { google } from 'googleapis'


export const getOauth2Client = () => {
	const clientID = process.env.GOOGLE_CLIENT_ID
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET
	const redirectUrl = process.env.GOOGLE_REDIRECT_URI

	const oauth2Client = new google.auth.OAuth2(
		clientID,
		clientSecret,
		redirectUrl
	);

	return oauth2Client
}