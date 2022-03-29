import type {NextPage} from "next"

import dynamic from "next/dynamic"

const AgilityApp = dynamic(() => import("../components/AgilityApp"), {ssr: false})



const Home: NextPage = () => {


	return (
		<AgilityApp />
	)
}

export default Home
