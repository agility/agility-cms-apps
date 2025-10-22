export default function Home() {
	return (
		<main className="m-10">
			<h1 className="text-3xl font-bold">Example App</h1>
			<p>{"This app shows how to use all of the various capabilities of Agility's App SDK v2."}</p>
			<p>
				See the app definition file <a className="text-blue-500 hover:text-blue-600" href="/.well-known/agility-app.json">here</a>.
			</p>
		</main>
	)
}
