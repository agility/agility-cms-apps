'use client'

import { useAgilityAppSDK, contentItemMethods, useResizeHeight } from "@agility/app-sdk"

export default function ExampleField() {
	const { initializing, appInstallContext, fieldValue } = useAgilityAppSDK()
	const containerRef = useResizeHeight(10)

	if (initializing) return null

	return (
		<div>
			<div ref={containerRef} className="">
				<textarea
					className="w-full p-4 border border-gray-300 rounded"
					value={fieldValue as string}
					onChange={(e) => contentItemMethods.setFieldValue({ value: e.target.value })}
				/>
			</div>
		</div>
	)
}
