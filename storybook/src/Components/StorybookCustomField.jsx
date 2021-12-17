import { useEffect, useState, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import '../styles/FieldStyles.scss'

export default function BasicCustomField() {

	const [value, setValue] = useState("");
	const [fieldConfig, setFieldConfig] = useState(null)
	const [configValues, setConfigValues] = useState({});
	const [sdk, setSDK] = useState({})
	const containerRef = useRef();

	useEffect(() => {
		agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {

			//set the SDK that we can use later...
			setSDK(fieldSDK);

			//set the actual value of the field
			setValue(fieldSDK.field.value);

			//config values
			setConfigValues(fieldSDK.configValues);

			//field settings
			setFieldConfig(fieldSDK.field)

			// fieldSDK.subscribeToFieldValueChanges({
			// 	fieldName: 'Title',
			// 	onChange: ({ fieldName, fieldValue }) => {
			// 		//when the 'Title' changes, get notified, and do something...
			// 		console.log(fieldName, fieldValue);
			// 	}
			// })

		});
	}, []);

	const openCustomFlyout = () => {
		//mock getContentItem
		const contentItem = {
			referenceName: 'home_TextBlockWithImage',
			values: {
				Title: 'From short breaks to long adventures.',
				Image: {
					label: 'Overhead photo of an island',
					url: 'https://cdn.aglty.io/dc9hn1nh/posts/gaddafi-rusli-2ueUnL4CkV8-unsplash%201.jpg'
				},
				TagLine: 'Wander The World',
				ImagePosition: 'right'
			}
		}
		sdk.openFlyout({
			title: 'Storybook Component',
			size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
			name: 'StoryBookFlyout',
			onClose: ({ params }) => {
				//passes the parameters back from the app component that closed the flyout
			},
			params: {
				contentItem: contentItem
			}
		})
	}

	if (fieldConfig) {

		return (
			<div className="field-row" ref={containerRef}>
				
				<button type="button" onClick={openCustomFlyout}>Preview Storybook Component</button>
			</div>
		);
	} else {
		return (
			<div className="field-row" ref={containerRef}>
				<label>
					<span>Loading...</span>
				</label>
			</div>
		);
	}
}

