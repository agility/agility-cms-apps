import { useAgilityAppSDK, assetsMethods, openModal, pageMethods, IPageItem, IAppConfigValue } from "@agility/app-sdk"
import { useState } from "react"

export default function PagesSidebar() {
	const { initializing, locale, pageItem } = useAgilityAppSDK()
	const [page, setPage] = useState<IPageItem|null>()

	return (
		<div>
			<h1>Example App - Pages Sidebar</h1>
			<div>Initializing: {initializing.toString()}</div>
			<div>Locale: {locale}</div>
			<div>
				Get Page Item {" "}
				<button
					onClick={async () => {
						const p = await pageMethods.getPageItem()
						setPage(p)
					}}
				>
					SUBMIT
				</button>
			</div>
			<div>
				Select Assets {" "}
				<button
					onClick={() => {
           assetsMethods.selectAssets({ title: "Hi", singleSelectOnly: false, callback: (v: any) => console.log("hi 3")})
					}}
				>
					SUBMIT
				</button>
			</div>
			<div>
				Open Modal {" "}
				<button
					onClick={async () => {
            openModal({ 
              title: "Tester Page Sidebar", 
              callback: (props: any) => {}
            })
					}}
				>
					SUBMIT
				</button>
			</div>
			<div>Page : {JSON.stringify(page)}</div>
		</div>
	)
}
