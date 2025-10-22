'use client'

import { closeModal, useAgilityAppSDK } from "@agility/app-sdk"

export default function ExampleModal() {
	const { initializing, modalProps } = useAgilityAppSDK()

	if (initializing) {
		return <div>Initializing...</div>
	}

	return (
		<div className="flex h-full flex-col">
			<h2 className="text-lg font-bold">Example Modal</h2>
			<div className="flex-1">
				<div>Modal Props</div>
				<div className="mb-32">{modalProps && JSON.stringify(modalProps)}</div>
			</div>
			<div className="flex gap-2">
				<button
					className="btn"
					onClick={() => {
						const obj = { btn: "ok" }
						closeModal(obj)
					}}
				>
					OK
				</button>
				<button
					className="btn"
					onClick={() => {
						closeModal({ btn: "cancel" })
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	)
}
