import React, { useEffect, useRef, useState } from "react";
import agilityAppSDK from "@agility/app-sdk";
import useScript from "react-script-hook/lib/use-script";


import { CompactView, Modal, Login } from '@bynder/compact-view';
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
  const [transformations, setTransformations] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const [loading] = useScript({
    src: "https://media-library.cloudinary.com/global/all.js",
    checkForExisting: true,
  });

  useEffect(() => {
    //init the SDK in this component
    agilityAppSDK.initializeFlyout(containerRef).then((flyoutSDK) => {
      setSearch(flyoutSDK.flyout.params.search);
      setTransformations(flyoutSDK.flyout.params.transformations);
      setSDK(flyoutSDK);
    });
  }, [appConfig]);

  useEffect(() => {
    //only init the cloudinary ui once...
    if (!initialized && !loading && sdk.configValues) {
      setInitialized(true);
     // initCloudinary();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, sdk]);



  return (
    <div className='Flyout' ref={containerRef} style={{ height: "100vh" }}>
      <div id='media-container' style={{ height: "100%" }}>
        <Login>
          <CompactView
            language="en_US"
            onSuccess={(a) => console.log("SELECTED", a)}
            assetFieldSelection={assetFieldSelection}
          />
        </Login>
      </div>
    </div>
  );
}
