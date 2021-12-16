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

	const [message, setMessage] = useState(null)

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

			fieldSDK.subscribeToFieldValueChanges({
				fieldName: 'Title',
				onChange: ({ fieldName, fieldValue }) => {
					//when the 'Title' changes, get notified, and do something...
					console.log(fieldName, fieldValue);
				}
			})
		});
	}, []);

	const updateValue = (newVal) => {
		//update the react state
		setValue(newVal);

		//notify Agility CMS of the new value
		sdk.updateFieldValue({ fieldValue: newVal });
	}

	const openCustomFlyout = () => {

		sdk.openFlyout({
			title: 'Flyout Title',
			size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
			name: 'Flyout1',
			onClose: ({ params }) => {
				//passes the parameters back from the app component that closed the flyout


				if (!params || params === undefined) {
					setMessage("You clicked Cancel")
				} else {
					setMessage("You clicked OK!")
					console.log(params);

				}

			},
			params: {
				key: 'value'
			}
		})
	}


	if (fieldConfig) {
		return (
			<div className="field-row" ref={containerRef}>
				<label>
					<span>{fieldConfig.label}</span>
					{fieldConfig.required && <span className='required' title="This field is required.">*</span>}
					{fieldConfig.description &&
						<FontAwesomeIcon icon={faInfoCircle} className='field-description' title={fieldConfig.description} />
					}
					<input className='form-control' type="text" defaultValue={value} onChange={e => updateValue(e.target.value)} />
				</label>

				<div style={{ padding: 10, borderRadius: 10, backgroundColor: "#ebebeb", fontSize: "12px" }}>
					<strong>Config Value and Flyout Example</strong>
					<div>API Key: {configValues.apiKey}</div>
					<div style={{ marginTop: 10 }}>
						<button className='btn btn-primary' onClick={openCustomFlyout}>Open Flyout</button>
						<div>{message}</div>
					</div>
				</div>

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

