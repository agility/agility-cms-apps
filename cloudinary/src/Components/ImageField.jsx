import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import FieldHeader from "./FieldHeader";
import BlankPrompt from "./BlankPrompt";
import Metadata from "./Metadata";
import AttachmentOverlay from "./AttachmentOverlay";

export default function ImageField() {
  const containerRef = useRef();
  const [fieldConfig, setFieldConfig] = useState({});
  const [sdk, setSDK] = useState({});
  const [attachment, setAttachment] = useState(null);

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
          <div className='mt-2 flex w-full rounded border border-gray-300 flex-row gap-6 flex-wrap'>
            <div className='relative'>
              <a
                href={attachment.secure_url}
                className='agility-attachment-thm'
                target='_blank'
                rel='noreferrer'
              >
                <img
                  src={
                    attachment.derived?.length > 0
                      ? attachment.derived[0].secure_url
                      : attachment.secure_url
                  }
                  alt=''
                />
                <AttachmentOverlay isImage={true} />
                <i className='fa fa-picture-o' aria-hidden='true'></i>
              </a>
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
