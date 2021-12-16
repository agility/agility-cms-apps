
import { useEffect, useState, useRef } from 'react';
import agilityAppSDK from '@agility/app-sdk';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import numeral from 'numeral'

import '../styles/FieldStyles.scss'
import fileSizeFromBytes from '../util/fileSizeFromBytes';


export default function ImageField() {

	const containerRef = useRef();
	const [fieldConfig, setFieldConfig] = useState({});
	const [sdk, setSDK] = useState({})
	const [attachment, setAttachment] = useState(null)

	useEffect(() => {
		//when the SDK initializes us...
		agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {

			//set the SDK and field config that we can use later...
			setSDK(fieldSDK);
			setFieldConfig(fieldSDK.field);
			//set the actual value of the field
			if (fieldSDK.field.value) {
				try {
					const existingAttachment = JSON.parse(fieldSDK.field.value)
					setAttachment(existingAttachment)
				} catch (error) { }
			}
		});
	}, []);

	const removeAttachment = () => {
		setAttachment(null)
		sdk.updateFieldValue({ fieldValue: null });
	}

	const setAltText = (alt) => {
		if (!attachment.context) attachment.context = {}
		if (!attachment.context.custom) attachment.context.custom = {}
		attachment.context.custom.alt = alt;

		setAttachment(attachment)

		const newVal = JSON.stringify(attachment)
		sdk.updateFieldValue({ fieldValue: newVal });

	}

	const openMediaSelection = () => {

		sdk.openFlyout({
			title: 'Select an Image',
			size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
			name: 'MediaSelector',
			onClose: (args) => {
				//passes the parameters back from the app component that closed the flyout
				const asset = args?.params?.assets[0]
				if (!asset) return


				if (asset.resource_type !== "image") {
					alert("You can only select images for this field.")
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
				//setup the transformation for the thumbnail that we'll show the user...
				transformations: [
					[{ width: 306, height: 230, crop: "pad", fetch_format: "auto", quality: "auto" }]
				]
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
						{!attachment && <span> No image is attached yet.</span>}
						{attachment && <span> An image is attached to this item.</span>}
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

							<a href={attachment.secure_url} className="agility-attachment-thm" target="_blank" rel="noreferrer">
								<img src={attachment.derived?.length > 0 ? attachment.derived[0].secure_url : attachment.secure_url} alt="" />
								<i className="fa fa-picture-o" aria-hidden="true"></i>
							</a>

							<div className="attachment-meta-data">
								{fieldConfig.readOnly !== true &&
									<label className="lbl-alt-text">
										<span>Alt Text:</span>
										<input type="text" className="form-control agility-attachment-alt" defaultValue={attachment?.context?.custom?.alt} onChange={(e) => setAltText(e.target.value)} />
									</label>
								}
								{fieldConfig.readOnly === true &&
									<div>
										<span>Alt Text:</span>
										<span className="agility-attachment-alt"> {attachment?.context?.custom?.alt}</span>
									</div>
								}

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