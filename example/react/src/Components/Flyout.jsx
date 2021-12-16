import { useEffect, useRef, useState } from 'react';
import agilityAppSDK from '@agility/app-sdk';

import "../styles/FlyoutStyles.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons'

function Flyout({ appConfig }) {

	const containerRef = useRef();
	const [sdk, setSDK] = useState({})
	const [flyout, setFlyout] = useState({});
	//const [configValues, setConfigValues] = useState({});

	useEffect(() => {
		agilityAppSDK.initializeFlyout({ containerRef }).then((flyoutSDK) => {
			setSDK(flyoutSDK);
			setFlyout(flyoutSDK.flyout);

			//You can also get access to this properties:
			//setConfigValues(flyoutSDK.configValues);

		})
	}, [appConfig]);

	const okAction = () => {
		sdk.closeFlyout({
			params: {
				'somevalue': 'was set'
			}
		})
	}
	const cancelAction = () => {
		sdk.closeFlyout({})
	}


	return (
		<div className="flyout-panel" ref={containerRef}>

			{!(sdk && sdk.initiator) &&
				<div className='flyout-body'>
					<div className="flyout-loading">Loading...&nbsp;
						<FontAwesomeIcon icon={faSync} spin />
					</div>
				</div>
			}

			{sdk && sdk.initiator &&
				<>
					<div className='flyout-body'>
						{/* PUT THE CONTENT OF YOUR FLYOUT BODY HERE */}
						<div>This is a custom flyout {flyout.title} that was initialized by the {sdk.initiator.name} field.</div>
					</div>
					<div className='flyout-actions'>
						<button className='btn btn-primary' onClick={okAction}>OK</button>
						<button className='btn' onClick={cancelAction}>Cancel</button>
					</div>
				</>
			}

		</div >
	);
}

export default Flyout;
