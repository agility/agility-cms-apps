import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Example App',
	description: 'An example app showing the capabilities of the Agility App SDK v2',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" className="h-full">
			<body className="h-full">{children}</body>
		</html>
	)
}
