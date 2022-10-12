/* eslint-disable no-lone-blocks */
import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import FieldHeader from "./FieldHeader";
import BlankPrompt from "./BlankPrompt";
import Metadata from "./Metadata";
import AttachmentOverlay from "./AttachmentOverlay";
import { useAssetWidth } from "../hooks/useAssetWidth";

export default function ImageField() {
  const containerRef = useRef(null);
  const [fieldConfig, setFieldConfig] = useState({});
  const [sdk, setSDK] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [width, setWidth] = useState(0);
  const widthRef = useRef(0);
  const assetRef = useRef(null);

  useEffect(() => {
    //when the SDK initializes us...
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      //set the SDK and field config that we can use later...
      setSDK(fieldSDK);
      setFieldConfig(fieldSDK.field);
      //set the actual value of the field
      if (fieldSDK.field.value) {
        try {
          const existingAttachment = JSON.parse(fieldSDK.field.value);
          setAttachment(existingAttachment);
        } catch (error) {}
      }
    });
  }, []);

  const removeAttachment = () => {
    setAttachment(null);
    sdk.updateFieldValue({ fieldValue: null });
  };

  const setAltText = (alt) => {
    if (!attachment.context) attachment.context = {};
    if (!attachment.context.custom) attachment.context.custom = {};
    attachment.context.custom.alt = alt;

    setAttachment(attachment);

    const newVal = JSON.stringify(attachment);
    sdk.updateFieldValue({ fieldValue: newVal });
  };

  const openMediaSelection = () => {
    sdk.openFlyout({
      title: "Select an Image",
      size: agilityAppSDK.types.APP_FLYOUT_SIZE_LARGE,
      name: "MediaSelector",
      onClose: (args) => {
        //passes the parameters back from the app component that closed the flyout
        const asset = args?.params?.assets[0];
        if (!asset) return;

        if (asset.resource_type !== "image") {
          alert("You can only select images for this field.");
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
        //setup the transformation for the thumbnail that we'll show the user...
        transformations: [
          [
            {
              width: 306,
              height: 230,
              crop: "pad",
              fetch_format: "auto",
              quality: "auto",
            },
          ],
        ],
      },
    });
  };

  useAssetWidth(assetRef, widthRef, setWidth);
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

      <>
        {attachment ? (
          <div
            className='mt-2 flex w-full rounded border border-gray-300 flex-wrap flex-row'
            ref={assetRef}
          >
            <div
              className={`relative flex h-[270px] w-[275px] ${
                width < 570 && "w-full"
              }`}
              style={{
                background:
                  "repeating-conic-gradient(#D9D9D9 0% 25%, transparent 0% 50%) 50% / 20px 20px",
              }}
            >
              <div
                className={
                  "border-0 bg-clip-border bg-center bg-no-repeat h-full w-full max-w-[275px] mx-auto flex items-center justify-center bg-contain"
                }
                style={{
                  backgroundImage:
                    attachment.derived?.length > 0
                      ? `url(${attachment.derived[0].secure_url})`
                      : `url(${attachment.secure_url})`,
                }}
              >
                {/* {isLoading && <Loader className='h-8 w-8 border-4' />}

                {!isLoading && isError && (
                  <div className='flex h-full flex-col items-center justify-center'>
                    <IconWithShadow
                      tablerIcon='IconCloudOff'
                      shadowClassName='bg-gray-200'
                    />
                    <div className='mt-2 text-red-400'>Error loading image</div>
                  </div>
                )} */}
              </div>
              <AttachmentOverlay isImage={true} />
              <i className='fa fa-picture-o' aria-hidden='true'></i>
            </div>
            <Metadata
              attachment={attachment}
              fieldConfig={fieldConfig}
              handleAltTextChange={setAltText}
              isImage={true}
            />
          </div>
        ) : (
          <BlankPrompt isImage={true} handleSelect={openMediaSelection} />
        )}
      </>
    </div>
  );
}
