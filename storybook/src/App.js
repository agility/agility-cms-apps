import './App.css';

import agilityAppSDK from '@agility/app-sdk'

import StoryBookCustomField from './Components/StorybookCustomField';
import StoryBookFlyout from './Components/StorybookFlyout'


function App() {

	const Components = {
		StoryBookCustomField,
		StoryBookFlyout
	}

	const appConfig = {
		name: 'Storybook App',
		version: '1',
		documentationLink: 'https://github.com/agility/agility-cms-apps/tree/main/storybook',
		configValues: [],
		appComponents: [
			{
				location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
				label: 'Storybook Custom Field',
				name: 'StoryBookCustomField',
				componentToRender: 'StoryBookCustomField'
			},
			{
				location: agilityAppSDK.types.APP_LOCATION_FLYOUT,
				name: 'StoryBookFlyout',
				componentToRender: 'StoryBookFlyout'
			},
		]
	};

	const componentRequested = agilityAppSDK.resolveAppComponent(appConfig);

	if (componentRequested === 'AppConfig') {

		//provide the CMS information about your app configuration
		agilityAppSDK.setAppConfig(appConfig);

	} else {
		//determine the React component we want to render based on what the CMS has requested...
		const ComponentToRender = Components[componentRequested];

		if (ComponentToRender) {
			return <ComponentToRender appConfig={appConfig} />;
		} else {
			return <h2>Warning: App must be loaded within Agility CMS.</h2>
		}
	}

	return null;
}

export default App;
