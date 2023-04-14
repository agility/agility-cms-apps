import { Dropdown, ItemProp } from "@agility/plenum-ui"
import { BsChevronDown } from "react-icons/bs"

interface Props {
	onChange: (duration: string) => void
}
export default function DurationPicker({ onChange }: Props) {
	const durations: ItemProp[][] = [
		[{ label: "7 days ago", onClick: () => onChange("7daysAgo") }],
		[{ label: "1 month ago", onClick: () => onChange("30daysAgo") }],
		[{ label: "1 year ago", onClick: () => onChange("12monthsAgo") }]
	]
	//lang selection
	return (
		<Dropdown
            label="Duration"
			items={durations}
			IconElement={() => <BsChevronDown className="h-4 w-4 text-gray-500 group-hover:text-gray-700" />}
			className="group p-1 text-sm font-medium leading-5 text-gray-700 hover:text-gray-900 absolute right-0"
		/>
	)
}
