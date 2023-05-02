import { CHART_DURATIONS } from "@/constants"
import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"


export interface Report {
	columnHeader: {
		dimensions: string[]
		metricHeader: {
			metricHeaderEntries: {
				name: string
				type: string
			}[]
		}
	}
	data: {
		rows: {
			dimensions: string[]
			metrics: {
				values: string[]
			}[]
		}[]
	}
}

interface Props {
	reportData: Report,
	isUserViewSelected: boolean,
	isNewUserViewSelected: boolean,
	isPageViewSelected: boolean,
	isPageDurationViewSelected: boolean,
	duration: string
}

function formatDate(dateString: string) {
	const year = dateString.substring(0, 4)
	const month = dateString.substring(4, 6)
	const day = dateString.substring(6, 8)
	const date = new Date(`${year}-${month}-${day}`)
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(/\//g, "/")
}

function formatMonth(monthString: string): string | null {
	const monthMap: { [key: string]: string } = {
	  '01': 'Jan',
	  '02': 'Feb',
	  '03': 'Mar',
	  '04': 'Apr',
	  '05': 'May',
	  '06': 'Jun',
	  '07': 'Jul',
	  '08': 'Aug',
	  '09': 'Sep',
	  '10': 'Oct',
	  '11': 'Nov',
	  '12': 'Dec'
	};
  
	const abbreviation = monthMap[monthString];
  
	return abbreviation || null;
  }

const LineChartComponent: React.FC<Props> = ({ reportData, isNewUserViewSelected, isUserViewSelected, isPageDurationViewSelected, isPageViewSelected, duration }) => {
	const data = reportData.data.rows.map((row) => {
		return {
			date: duration === CHART_DURATIONS["365daysAgo"] ? formatMonth(row.dimensions[0]) : formatDate(row.dimensions[0]),
			users: parseInt(row.metrics[0].values[0]),
			newUsers: parseInt(row.metrics[0].values[1]),
			pageViews: parseInt(row.metrics[0].values[2]),
			avgSessionDuration: Math.round(parseFloat(row.metrics[0].values[3])/60),
		}
	})

	return (
		<ResponsiveContainer width={"96%"} height={360} >
			<LineChart data={data}>
				<XAxis dataKey="date" tickSize={0} tickMargin={16} />
				<YAxis axisLine={{ stroke: "transparent" }} tickSize={0} tickMargin={16} />
				<CartesianGrid horizontal vertical={false} stroke="#eee" />
				<Tooltip />
				{isUserViewSelected ? <Line type="linear" dataKey="users" stroke="#4600AA" dot={false} strokeWidth={3} /> : null}
				{isNewUserViewSelected ? <Line type="linear" dataKey="newUsers" stroke="#691AD8" dot={false} strokeWidth={3} /> : null}
				{isPageViewSelected ? <Line type="linear" dataKey="pageViews" stroke="#BC99EE" dot={false} strokeWidth={3} /> : null}q
				{isPageDurationViewSelected ? <Line type="linear" dataKey="avgSessionDuration" stroke="#111827" dot={false} strokeWidth={3} /> : null}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default LineChartComponent
