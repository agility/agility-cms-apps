import { NextResponse } from 'next/server'

export async function POST() {
	// TODO: perform any app uninstall operations necessary...
	// NOTE: this will be called as part of a "fire and forget operation"
	console.log("UNINSTALL ACTION FIRED")

	return NextResponse.json({ status: 'OK' })
}
