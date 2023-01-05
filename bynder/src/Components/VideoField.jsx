import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import FieldHeader from "./FieldHeader";
import BlankPrompt from "./BlankPrompt";
import Metadata from "./Metadata";
import { useAssetWidth } from "../hooks/useAssetWidth";

export default function VideoField() {
  const [fieldConfig, setFieldConfig] = useState({});

  const [sdk, setSDK] = useState({});
  const containerRef = useRef(null);
  const assetRef = useRef(null);
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);

  const [attachment, setAttachment] = useState(null);
  useAssetWidth(assetRef, widthRef, setWidth);

  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      //set the SDK that we can use later...
      setSDK(fieldSDK);
      //set the actual value of the field
      if (fieldSDK.field.value) {
        try {
          const existingAttachment = JSON.parse(fieldSDK.field.value);
          setAttachment(existingAttachment);
        } catch (error) { }
      }

      setFieldConfig(fieldSDK.field);
    });
  }, []);

  const removeAttachment = () => {
    setAttachment(null);
    sdk.updateFieldValue({ fieldValue: null });
  };

  const openMediaSelection = () => {
    sdk.openFlyout({
      title: "Select a Video",
      size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
      name: "BynderMediaSelector",
      onClose: (args) => {
        //passes the parameters back from the app component that closed the flyout

        const asset = args?.params?.assets[0];
        if (!asset) return;

        console.log("VIDEO", asset)

        if (asset.__typename !== "Video") {
          alert("You can only select videos for this field.");
          return;
        }

        removeAttachment();
        setTimeout(() => {
          setAttachment(asset);
          const newVal = JSON.stringify(asset);
          sdk.updateFieldValue({ fieldValue: newVal });
        }, 100);
      },
      params: {
        assetType: "VIDEO"
      }
    });
  };
  return (
    <div
      className='border-l-[3px] pl-3 transition-all border-l-gray-300  focus-within:border-l-purple-600 hover:border-l-purple-600'
      ref={containerRef}
    >
      <FieldHeader
        fieldConfig={fieldConfig}
        attachment={attachment}
        handleRemove={removeAttachment}
        handleSelect={openMediaSelection}
      />

      <div className='agility-field-panel'>
        <div className='panel-heading'>
          {attachment ? (
            <div className='panel-body'>
              <div
                className='mt-2 flex w-full rounded border border-gray-300 flex-wrap flex-row'
                ref={assetRef}
              >
                <div
                  className={`relative flex  w-[350px] ${width < 685 && "w-full"
                    }`}
                  style={{
                    background:
                      "repeating-conic-gradient(#D9D9D9 0% 25%, transparent 0% 50%) 50% / 20px 20px",
                  }}
                >
                  <video controls poster={attachment.files.thumbnail.url}
                    className='border-[3px] transition-all border-gray-300  focus-within:border-purple-600 hover:border-purple-600 w-full'>

                    <source src={attachment.previewUrls[0]} type="video/mp4" />
                  </video>

                  {/* <CloudinaryContext
                    cloudName={sdk?.configValues?.cloudName}
                    secure='true'
                    className='flex items-center'
                  >
                    <Video
                      publicId={attachment.public_id}
                      controls={true}
                      className='border-[3px] transition-all border-gray-300  focus-within:border-purple-600 hover:border-purple-600'
                    />
                  </CloudinaryContext> */}

                </div>

                <Metadata
                  attachment={attachment}
                  isImage={false}
                  fieldConfig={fieldConfig}
                />
              </div>
            </div>
          ) : (
            <BlankPrompt isImage={false} handleSelect={openMediaSelection} />
          )}
        </div>
      </div>
    </div>
  );
}
