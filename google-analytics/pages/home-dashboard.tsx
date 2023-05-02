import { useEffect, useState } from "react"
import axios from "axios"
import LineChartComponent, { Report } from "./components/GoogleLineChart"
import GoogleAnalyticsLogo from "./components/GoogleAnalyticsLogo"
import DurationPicker from "./components/DurationPicker"
import "@agility/plenum-ui/lib/tailwind.css"
import GoogleAnalyticPane from "./components/GoogleAnalyticsPanel"
import { CHART_DURATIONS } from "@/constants"
import { useAgilityAppSDK, setHeight } from "@agility/app-sdk"
import { IOAuthToken } from "./install"

// function to get the cumulative number of users
function getCumulativeUsers(report: Report) {
	let cumulativeUsers = 0
	report.data.rows.forEach((row) => {
		cumulativeUsers += parseInt(row.metrics[0].values[0])
	})
	return cumulativeUsers
}

// function to get the cumulative number of new users
function getCumulativeNewUsers(report: Report) {
	let cumulativeNewUsers = 0
	report.data.rows.forEach((row) => {
		cumulativeNewUsers += parseInt(row.metrics[0].values[1])
	})
	return cumulativeNewUsers
}

// function to get the cumulative number of pageviews
function getCumulativePageviews(report: Report) {
	let cumulativePageviews = 0
	report.data.rows.forEach((row) => {
		cumulativePageviews += parseInt(row.metrics[0].values[2])
	})
	return cumulativePageviews
}

// function to get the cumulative session duration in seconds
function getCumulativeSessionDuration(report: Report) {
	let cumulativeSessionDuration = 0
	report.data.rows.forEach((row) => {
		cumulativeSessionDuration += parseInt(row.metrics[0].values[3])
	})
	return Math.round(cumulativeSessionDuration / 60)
}

export default function HomeDashboard() {
	const { appInstallContext } = useAgilityAppSDK()

	const [duration, setDuration] = useState(CHART_DURATIONS["7daysAgo"])
	const [reportData, setReportData] = useState<Report | null>(null)

	const [isUserViewSelected, setIsUserViewSelected] = useState(true)
	const [isNewUserViewSelected, setIsNewUserViewSelected] = useState(false)
	const [isPageDurationViewSelected, setIsPageDurationViewSelected] = useState(false)
	const [isPageViewSelected, setIsPageViewSelected] = useState(false)

	const [cumulativeUsers, setCumulativeUsers] = useState(0)
	const [cumulativeNewUsers, setCumulativeNewUsers] = useState(0)
	const [cumulativePageviews, setCumulativePageviews] = useState(0)
	const [cumulativeSessionDuration, setCumulativeSessionDuration] = useState(0)

	const [oAuthToken, setOAuthToken] = useState<IOAuthToken | null>(null)
	const [profileId, setProfileId] = useState<string | null>(null)

	useEffect(() => {
		setHeight({height: 600})
	}, [])

	useEffect(() => {
		if (appInstallContext?.configuration["Google Analytics Account"]) {
			const token = JSON.parse(appInstallContext.configuration["Google Analytics Account"]) as IOAuthToken
			setOAuthToken(token)
			setProfileId(appInstallContext.configuration["profileId"])
		}
	}, [appInstallContext])

	useEffect(() => {
		if (!profileId || !duration || !oAuthToken) return

		axios({
			method: "post",
			url: `/api/get-ga-home-dashboard?profileId=${profileId}&duration=${duration}`,
			data: { oAuthToken }
		})
			.then((response) => {
				if (response?.data?.reports[0]) {
					const data: Report = response.data.reports[0]
					setReportData(data)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}, [duration, oAuthToken, profileId])

	useEffect(() => {
		if (!reportData) return

		const cumulativeUsers = getCumulativeUsers(reportData)
		const cumulativeNewUsers = getCumulativeNewUsers(reportData)
		const cumulativePageviews = getCumulativePageviews(reportData)
		const cumulativeSessionDuration = getCumulativeSessionDuration(reportData)

		setCumulativeUsers(cumulativeUsers)
		setCumulativeNewUsers(cumulativeNewUsers)
		setCumulativePageviews(cumulativePageviews)
		setCumulativeSessionDuration(cumulativeSessionDuration)
	}, [reportData])

	return (
		<div className="overflow-hidden">
			<div className="flex flex-row items-center justify-between pb-4">
				<div className="left-element flex flex-row items-center">
					<GoogleAnalyticsLogo />
					<h1 className="ml-4 text-4xl font-medium text-gray-500">Analytics</h1>
				</div>
				<div className="right-element ml-auto items-center">
					<DurationPicker onChange={setDuration} currentDuration={duration} />
				</div>
			</div>
			<div className="mb-8 flex justify-between">
				<GoogleAnalyticPane
					title={"Users"}
					dataDisplay={`${cumulativeUsers}`}
					isSelected={isUserViewSelected}
					setSelected={setIsUserViewSelected}
				/>
				<GoogleAnalyticPane
					title={"New users"}
					dataDisplay={`${cumulativeNewUsers}`}
					isSelected={isNewUserViewSelected}
					setSelected={setIsNewUserViewSelected}
				/>
				<GoogleAnalyticPane
					title={"Page views"}
					dataDisplay={`${cumulativePageviews}`}
					isSelected={isPageViewSelected}
					setSelected={setIsPageViewSelected}
				/>
				<GoogleAnalyticPane
					title={"Avg. engagement time"}
					dataDisplay={`${cumulativeSessionDuration}m`}
					isSelected={isPageDurationViewSelected}
					setSelected={setIsPageDurationViewSelected}
				/>
			</div>

			{reportData ? (
				<LineChartComponent
					reportData={reportData}
					isUserViewSelected={isUserViewSelected}
					isNewUserViewSelected={isNewUserViewSelected}
					isPageViewSelected={isPageViewSelected}
					isPageDurationViewSelected={isPageDurationViewSelected}
					duration={duration}
				/>
			) : null}
		</div>
	)
}
