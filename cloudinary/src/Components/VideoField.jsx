
import { useEffect, useState, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import numeral from 'numeral'

import { Video, CloudinaryContext } from 'cloudinary-react';

import '../styles/FieldStyles.scss'
import fileSizeFromBytes from '../util/fileSizeFromBytes';


export default function VideoField() {


	const [fieldConfig, setFieldConfig] = useState({});

	const [sdk, setSDK] = useState({})
	const containerRef = useRef();

	const [attachment, setAttachment] = useState(null)

	useEffect(() => {
		agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {

			//set the SDK that we can use later...
			setSDK(fieldSDK);

			//set the actual value of the field
			if (fieldSDK.field.value) {
				try {
					const existingAttachment = JSON.parse(fieldSDK.field.value)
					setAttachment(existingAttachment)
				} catch (error) { }
			}

			setFieldConfig(fieldSDK.field);

		});
	}, []);

	const removeAttachment = () => {
		setAttachment(null)
		sdk.updateFieldValue({ fieldValue: null });
	}


	const openMediaSelection = () => {

		sdk.openFlyout({
			title: 'Select a Video',
			size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
			name: 'MediaSelector',
			onClose: (args) => {
				//passes the parameters back from the app component that closed the flyout

				const asset = args?.params?.assets[0]
				if (!asset) return

				if (asset.resource_type !== "video") {
					alert("You can only select videos for this field.")
					return
				}

				removeAttachment()
				setTimeout(() => {
					setAttachment(asset)
					const newVal = JSON.stringify(asset)
					sdk.updateFieldValue({ fieldValue: newVal });
				}, 100)
			},
			params: {
				transformations: [
					[{ width: 306, height: 230, crop: "pad", fetch_format: "jpg", quality: "auto" }]
				],
				search: {
					expression: 'resource_type:video'
				}
			}
		})
	}

	return (
		<div className="field-row" ref={containerRef}>
			<label>
				<span>{fieldConfig.label}</span>
				{fieldConfig.required && <span className='required'>*</span>}
				{fieldConfig.description &&
					<FontAwesomeIcon icon={faInfoCircle} className='field-description' title={fieldConfig.description} />
				}
			</label>

			{/* <input className='form-control' type="text" defaultValue={value} onChange={e => updateValue(e.target.value)} /> */}

			<div className="agility-field-panel">
				<div className="panel-heading">

					<div className="panel-title">
						<img src="/cloudinary.svg" style={{ height: "1.8em", verticalAlign: "bottom" }} alt="Cloudinary" />
						{!attachment && <span> No video is attached yet.</span>}
						{attachment && <span> A video is attached to this item.</span>}
					</div>
					{fieldConfig.readOnly !== true &&
						<div className="top-buttons">
							{attachment &&
								<button type="button" className="trash btn btn-primary" onClick={removeAttachment}>Remove</button>
							}

							<button type="button" className="browse btn btn-primary" onClick={openMediaSelection}>Browse</button>
						</div>
					}
				</div>
				{attachment &&
					<div className="panel-body" >
						<div className="attachment-row" >
							<div className='agility-attachment-thm'>

								<CloudinaryContext cloudName={sdk.configValues.cloudName} secure="true" >
									<Video publicId={attachment.public_id} controls={true} />
								</CloudinaryContext>
							</div>

							<div className="attachment-meta-data">
								<div>
									<span>Type:</span>
									<span className="agility-attachment-type"> {attachment.resource_type} - {attachment.format}</span>
								</div>

								<div>
									<span>Size:</span>
									<span className="agility-attachment-size">{fileSizeFromBytes(attachment.bytes)}</span>
								</div>

								<div>
									<span>Width:</span>
									<span>{numeral(attachment.width).format('0,0')}px</span>
								</div>
								<div>
									<span>Height:</span>
									<span>{numeral(attachment.height).format('0,0')}px</span>
								</div>


								<div>
									<span>URL:</span>
									<a className="agility-attachment-url" href={attachment.secure_url} target="_blank" rel="noreferrer">{attachment.public_id}</a>
								</div>

							</div>

						</div>

					</div>
				}
			</div>

		</div>
	);

}