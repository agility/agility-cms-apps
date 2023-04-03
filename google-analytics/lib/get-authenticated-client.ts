import { getOauth2Client } from "./get-oauth2-client"

export const getAuthenticatedClient = () => {

	const oauth2Client = getOauth2Client()

	//TODO: get these from config
	oauth2Client.setCredentials({
		"access_token": "ya29.a0Ael9sCM3zDsCht2VHnhKB5hwoERUFyIuhp1beKkyZSIgsAkXp040vJ7IKAoM8bwDY7sSvRjykezz4O4UwYooaKztttuCI1qHGIUHgUP9_lHAHwYQW_Fl5Fm4_kHARdmbrubwOTBZf3iRyUVO8TlpiQpzBILtaCgYKAaISARESFQF4udJhpwIRncaSkmRPDWuhCdlK2g0163",
		"refresh_token": "1//01D-6TLubLnJgCgYIARAAGAESNwF-L9Ir3UsY9D6ad0TcGmW2chIykzb7ojncZO5GgcmWfpf06Lx-d-jUwi_tHdvmyS6EDtXQhnk",
		"scope": "https://www.googleapis.com/auth/analytics.readonly",
		"token_type": "Bearer",
		"expiry_date": 1680119884276
	})

	return oauth2Client

}