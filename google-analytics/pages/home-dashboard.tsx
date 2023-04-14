// @ts-nocheck
import { useEffect, useState } from "react"
import Script from "next/script"
import handler from "./api/get-ga-home-dashboard"
import axios from "axios"
import { Client } from "@analytics/google-analytics"
import { ReportData } from "./components/GoogleLineChart"
import GoogleLineChart from "./components/GoogleLineChart"
import GoogleLineChart2, { Report } from "./components/GoogleLineChart2"
import GoogleAnalyticsLogo from "./components/GoogleAnalyticsLogo"
import DurationPicker from "./components/DurationPicker"

export default function HomeDashboard() {
	const [authUrl, setAuthUrl] = useState("")
	const [duration, setDuration] = useState("7daysAgo")
	const [reportData, setReportData] = useState<Report>(null)

	const [isUserViewSelected, setIsUserViewSelected] = useState(true)
	const [isNewUserViewSelected, setIsNewUserViewSelected] = useState(false)
	const [isPageDurationViewSelected, setIsPageDurationViewSelected] = useState(false)
	const [isPageViewSelected, setIsPageViewSelected] = useState(false)

	useEffect(() => {
		//hard cord the token and property id for now
		//load some data from ga using the token and property id
		//
	}, [])

	useEffect(() => {
		axios({
			method: "get",
			url: "/api/get-auth-url"
		})
			.then((response) => {
				console.log("amihere a")
				console.log(response)
			})
			.catch((error) => {
				console.log("should not be here a")
				console.log(error)
			})

		return () => {}
	}, [authUrl])

	useEffect(() => {
		console.log("this is the useEffect that is supposed to load the data from the API")
		//get the list of web properties from the API
		axios({
			method: "get",
			url: `/api/get-ga-home-dashboard?duration=${duration}`
		})
			.then((response) => {
				console.log("amihere")
				console.log(response)
				if (response?.data?.reports[0]) {
					const data: Report = response.data.reports[0]
					console.log("data", data)
					setReportData(data)
				}
			})
			.catch((error) => {
				console.log("should not be here")
				console.log(error)
			})

		return () => {}
	}, [duration])

	return (
		<div class="overflow-hidden">
			<div className="flex flex-row items-center pb-4">
				<GoogleAnalyticsLogo />
				<h1 class="ml-4 text-4xl font-medium text-gray-500">Analytics</h1>
				<DurationPicker onChange={setDuration} />
			</div>
			<div class="my-4 flex justify-evenly">
				<GoogleAnalyticPane
					title={"Users"}
					dataDisplay={"51K"}
					isSelected={isUserViewSelected}
					setSelected={setIsUserViewSelected}
				/>
				<GoogleAnalyticPane
					title={"New users"}
					dataDisplay={"2K"}
					isSelected={isNewUserViewSelected}
					setSelected={setIsNewUserViewSelected}
				/>
				<GoogleAnalyticPane
					title={"Page views"}
					dataDisplay={"3K"}
					isSelected={isPageViewSelected}
					setSelected={setIsPageViewSelected}
				/>
				<GoogleAnalyticPane
					title={"Avg. engagement time"}
					dataDisplay={"1.46s"}
					isSelected={isPageDurationViewSelected}
					setSelected={setIsPageDurationViewSelected}
				/>
			</div>

			{reportData ? (
				<GoogleLineChart2
					reportData={reportData}
					isUserViewSelected={isUserViewSelected}
					isNewUserViewSelected={isNewUserViewSelected}
					isPageViewSelected={isPageViewSelected}
					isPageDurationViewSelected={isPageDurationViewSelected}
				/>
			) : null}
		</div>
	)
}

interface IGoogleAnalyticPane {
	title?: string
	dataDisplay?: string
	isSelected?: boolean
	setSelected?: (value: boolean) => void
}

const panelInfoColor = (title) => {
	switch (title) {
		case "Users":
			return "#4600AA"
		case "New users":
			return "#691AD8"
		case "Page views":
			return "#BC99EE"
		case "Avg. engagement time":
			return "#111827"
	}

	return "line-1"
}

const GoogleAnalyticPane: React.FC<IGoogleAnalyticPane> = ({ title, dataDisplay, isSelected, setSelected }) => {
	const panelDataClass = `text-3xl text-${panelInfoColor(title)} pt-2`

	console.log(panelDataClass)

	return (
		<div onClick={() => setSelected(!isSelected)} class="mx-2 h-32 w-64 cursor-pointer bg-white hover:bg-gray-100">
			{isSelected ? <div class="h-1 w-full bg-agility-purple"></div> : <div class="h-1 w-full bg-white"></div>}
			<div class="p-4">
				<h1 class="text-xl text-dashboard-title">{title}</h1>
				<h1 class="pt-2 text-3xl" style={{ color: panelInfoColor(title) }}>
					{dataDisplay}
				</h1>
			</div>
		</div>
	)
}
