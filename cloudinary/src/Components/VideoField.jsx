import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import { Video, CloudinaryContext } from "cloudinary-react";

import FieldHeader from "./FieldHeader";
import BlankPrompt from "./BlankPrompt";
import Metadata from "./Metadata";

export default function VideoField() {
  const [fieldConfig, setFieldConfig] = useState({});

  const [sdk, setSDK] = useState({});
  const containerRef = useRef();

  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    agilityAppSDK.initializeField({ containerRef }).then((fieldSDK) => {
      //set the SDK that we can use later...
      setSDK(fieldSDK);

      //set the actual value of the field
      if (fieldSDK.field.value) {
        try {
          const existingAttachment = JSON.parse(fieldSDK.field.value);
          setAttachment(existingAttachment);
        } catch (error) {}
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
      name: "MediaSelector",
      onClose: (args) => {
        //passes the parameters back from the app component that closed the flyout

        const asset = args?.params?.assets[0];
        if (!asset) return;

        if (asset.resource_type !== "video") {
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
        transformations: [
          [
            {
              width: 306,
              height: 230,
              crop: "pad",
              fetch_format: "jpg",
              quality: "auto",
            },
          ],
        ],
        search: {
          expression: "resource_type:video",
        },
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

      <div className='agility-field-panel'>
        <div className='panel-heading'>
          {attachment ? (
            <div className='panel-body'>
              <div className='mt-2 flex w-full rounded border border-gray-300 flex-row gap-6 flex-wrap'>
                <div className='relative flex-shrink 2xl:w-1/3 w-1/2  '>
                  <CloudinaryContext
                    cloudName={sdk.configValues.cloudName}
                    secure='true'
                  >
                    <Video
                      publicId={attachment.public_id}
                      controls={true}
                      className='border-[3px] transition-all border-gray-300  focus-within:border-purple-600 hover:border-purple-600'
                    />
                  </CloudinaryContext>
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
