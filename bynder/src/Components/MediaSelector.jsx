import React, { useEffect, useRef, useState } from "react";
import agilityAppSDK from "@agility/app-sdk";
import useScript from "react-script-hook/lib/use-script";


import { CompactView, Modal, Login } from '@bynder/compact-view';
import { Button } from "@agility/plenum-ui";
const assetFieldSelection = `
  name
  url
  originalUrl
  derivatives {
    thumbnail
    webImage
  }
  ... on Video {
    previewUrls
  }
`;


export default function MediaSelector({ appConfig }) {
  const containerRef = useRef();

  const [sdk, setSDK] = useState({});
  const [search, setSearch] = useState(null);
  const [assetType, setAssetType] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null)


  useEffect(() => {
    //init the SDK in this component
    agilityAppSDK.initializeFlyout(containerRef).then((flyoutSDK) => {
      setSearch(flyoutSDK.flyout.params.search);
      setAssetType(flyoutSDK.flyout.params.assetType);
      setSDK(flyoutSDK);
    });

  }, [appConfig]);

  useEffect(() => {

    if (!initialized && sdk.configValues) {
      console.log("sdk.configValues", sdk.configValues)
      setInitialized(true);

    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdk]);



  return (
    <div className='Flyout' ref={containerRef} style={{ height: "100vh" }}>

      {!initialized &&
        <div className="flex justify-center m-10">Initializing...</div>
      }

      {initialized &&
        <div id='media-container' className="flex flex-col h-full min-h-0">
          <div className="relative flex-1 overflow-hidden">

            <Login
              portal={{
                url: sdk.configValues.bynderurl,
                editable: false
              }}>
              <CompactView
                mode="SingleSelect"
                language="en_US"
                assetTypes={assetType && [assetType]}
                isContainerMode

                onSuccess={(assets) => {

                  sdk.closeFlyout({
                    params: { assets }
                  })

                }
                }
                assetFieldSelection={assetFieldSelection}
              />
            </Login>
          </div>
          {/* <div className="hidden border-t border-t-gray-200 bg-gray-100 flex gap-2 p-4">
          <div>
            <Button label="Apply" onClick={() => {
              sdk.closeFlyout({
                pararms: null
              })
            }} />
          </div>
          <div>
            <Button type="alternative" label="Cancel" onClick={() => {
              sdk.closeFlyout({
                pararms: null
              })
            }} />
          </div>


      </div> */}
        </div>
      }

    </div >
  );
}
