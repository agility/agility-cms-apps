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
}

function formatDate(dateString: string) {
	const year = dateString.substring(0, 4)
	const month = dateString.substring(4, 6)
	const day = dateString.substring(6, 8)
	const date = new Date(`${year}-${month}-${day}`)
	return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }).replace(/\//g, "/")
}

const LineChartComponent: React.FC<Props> = ({ reportData, isNewUserViewSelected, isUserViewSelected, isPageDurationViewSelected, isPageViewSelected }) => {
	const data = reportData.data.rows.map((row) => {
		return {
			date: formatDate(row.dimensions[0]),
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
				<Tooltip/>
				<Legend />
				{isUserViewSelected ? <Line type="monotone" dataKey="users" stroke="#4600AA" dot={false} strokeWidth={3} /> : null}
				{isNewUserViewSelected ? <Line type="monotone" dataKey="newUsers" stroke="#691AD8" dot={false} strokeWidth={3} /> : null}
				{isPageViewSelected ? <Line type="monotone" dataKey="pageViews" stroke="#BC99EE" dot={false} strokeWidth={3} /> : null}q
				{isPageDurationViewSelected ? <Line type="monotone" dataKey="avgSessionDuration" stroke="#111827" dot={false} strokeWidth={3} /> : null}
			</LineChart>
		</ResponsiveContainer>
	)
}

export default LineChartComponent
