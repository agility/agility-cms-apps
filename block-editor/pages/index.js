import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'
import agilityAppSDK from '@agility/app-sdk'
import { useEffect, useState } from 'react'


const BlockEditor = dynamic(
  () => import('../components/BlockEditor'),
  { ssr: false }
)

const Components = {
  BlockEditor
}

const appConfig = {
  name: 'Block Editor',
  version: '1.0.0',
  documentationLink: 'https://github.com/agility/agility-cms-apps/tree/main/block-editor',
  configValues: [
      { name: 'securityKey', label: 'Agility CMS Security Key', type: 'string'},
      { name: 'dcLocation', label: 'Data Center Location ("USA",  "Canada", or "Europe")', type: 'string'},        
      { name: 'assetFolder', label: 'Asset Upload Folder Path (i.e. "images/block-editor")', type: 'string'}
  ],
  appComponents: [
    {
      location: agilityAppSDK.types.APP_LOCATION_CUSTOM_FIELD,
      label: 'Block Editor',
      name: 'BlockEditor',
      componentToRender: 'BlockEditor'
    }
  ]
};

export default function Home() {

  const [componentRequested, setComponentRequested] = useState(null);
  
  useEffect(() => {
    const component = agilityAppSDK.resolveAppComponent(appConfig);
    setComponentRequested(component);
  }, [componentRequested])

  if(componentRequested === 'AppConfig') {

    //provide the CMS information about your app configuration
    agilityAppSDK.setAppConfig(appConfig);
    
  } else {
    //determine the React component we want to render based on what the CMS has requested...
    const ComponentToRender = Components[componentRequested];
    
    if(ComponentToRender) {
      return <ComponentToRender appConfig={appConfig} />;
    } 
  }
  
  return <h2>Warning: App must be loaded within Agility CMS.</h2>
}

