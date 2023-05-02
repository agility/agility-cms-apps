import React from "react"

interface IGoogleAnalyticPane {
	title?: string
	dataDisplay?: string
	isSelected?: boolean
	setSelected: (value: boolean) => void
}

const panelInfoColor = (title: string | undefined) => {
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

	return "#4600AA"
}


const GoogleAnalyticPane: React.FC<IGoogleAnalyticPane> = ({ title, dataDisplay, isSelected, setSelected }) => {
	const [isHovering, setIsHovering] = React.useState(false)

	const handleMouseEnter = () => {
		setIsHovering(true)
	}

	const handleMouseLeave = () => {
		setIsHovering(false)
	}

	const hoverIndicator = () => {
		if (isSelected){
		  	return <div style={{backgroundColor: panelInfoColor(title)}} className="h-1 w-full transition duration-300 ease-in-out" />;
		}
		if (isHovering){
		  return <div className="h-1 w-full bg-gray-100 transition duration-300 ease-in-out" />
		
		}
		return <div className="h-1 w-full bg-white transition duration-300 ease-in-out" />;
	  };

	return (
		<div
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => setSelected(!isSelected)}
			className="w-64 cursor-pointer bg-white"
		>
			<div className="p-4">
				<h1 className="text-xl text-dashboard-title">{title}</h1>
				<h1 className="pt-2 text-3xl" style={{ color: panelInfoColor(title) }}>
					{dataDisplay}
				</h1>
			</div>
			{hoverIndicator()}
		</div>
	)
}

export default GoogleAnalyticPane
