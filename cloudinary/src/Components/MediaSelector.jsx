

import { useEffect, useRef, useState } from 'react';
import agilityAppSDK from '@agility/app-sdk';
import useScript from 'react-script-hook';

export default function MediaSelector({ appConfig }) {

	const containerRef = useRef();

	const [sdk, setSDK] = useState({})
	const [search, setSearch] = useState(null)
	const [transformations, setTransformations] = useState(null)
	const [initialized, setInitialized] = useState(false)

	const [loading] = useScript({
		src: 'https://media-library.cloudinary.com/global/all.js',
		checkForExisting: true
	});

	useEffect(() => {
		//init the SDK in this component
		agilityAppSDK.initializeFlyout(containerRef).then((flyoutSDK) => {

			setSDK(flyoutSDK);

			setSearch(flyoutSDK.flyout.params.search)
			setTransformations(flyoutSDK.flyout.params.transformations)

		})
	}, [appConfig]);

	useEffect(() => {
		//only init the cloudinary ui once...
		if (!initialized && !loading && sdk.configValues) {
			setInitialized(true)
			initCloudinary()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, sdk])

	/**
	 * Initialize the cloudinary media browser
	 */
	const initCloudinary = () => {

		const cloud_name = sdk.configValues.cloudName;
		const api_key = sdk.configValues.apiKey;

		window.ml = window.cloudinary.openMediaLibrary({
			cloud_name,
			api_key,
			remove_header: true,
			//max_files: "1",
			multiple: false,
			insert_caption: 'APPLY',
			inline_container: "#media-container",
			integration: {
				type: 'agility_cloudinary_custom_field',
				platform: 'agilitycms',
				version: '2.0',
				environment: 'prod'
			},
			search: search,
			default_transformations: transformations
		}, {
			insertHandler: function (data) {

				sdk.closeFlyout({ params: data })
			}
		});
	}

	return (
		<div className="Flyout" ref={containerRef} style={{ height: "100vh" }} >
			<div id='media-container' style={{ height: "100%" }}></div>
		</div>
	)

}