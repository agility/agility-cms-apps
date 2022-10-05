import React, { useEffect, useState, useRef } from "react";
import agilityAppSDK from "@agility/app-sdk";

import numeral from "numeral";

// import '../styles/FieldStyles.scss'
import fileSizeFromBytes from "../util/fileSizeFromBytes";
import { Button, ButtonDropDown, TextInput } from "@agility/plenum-ui";
import { MetaRow } from "./MetaRow";

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
  const DropDownIconElement = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        stroke-linecap='round'
        stroke-linejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );

  return (
    <div
      className='border-l-[3px] pl-3 transition-all border-l-gray-300  focus-within:border-l-purple-600 hover:border-l-purple-600'
      ref={containerRef}
    >
      <div className='flex w-full items-center justify-between pb-1'>
        <div className='flex items-center'>
          <img
            src='/cloudinary.svg'
            style={{ height: "1.8em", verticalAlign: "bottom" }}
            alt='Cloudinary'
            className='mr-2'
          />
          {fieldConfig.label}{" "}
          {fieldConfig.required && (
            <span className='text-small text-red-600'>*</span>
          )}
        </div>

        {fieldConfig.readOnly !== true && (
          <div className='top-buttons'>
            {attachment ? (
              <ButtonDropDown
                button={{
                  icon: "FolderDownloadIcon",
                  label: "Browse",
                  size: "base",
                  onClick: () => openMediaSelection(),
                  type: "secondary",
                }}
                dropDown={{
                  IconElement: DropDownIconElement,
                  items: [
                    [
                      {
                        icon: "UploadIcon",
                        label: "Upload",
                        onClick: () => {},
                      },
                    ],
                    [
                      {
                        icon: "TrashIcon",
                        label: "Delete",
                        isEmphasized: true,
                        onClick: () => removeAttachment(),
                      },
                    ],
                  ],
                }}
              />
            ) : (
              <ButtonDropDown
                button={{
                  icon: "FolderDownloadIcon",
                  label: "Browse",
                  size: "base",
                  onClick: () => openMediaSelection(),
                  type: "secondary",
                }}
                dropDown={{
                  IconElement: DropDownIconElement,
                  items: [
                    [
                      {
                        icon: "UploadIcon",
                        label: "Upload",
                        onClick: () => {},
                      },
                    ],
                  ],
                }}
              />
            )}
          </div>
        )}
      </div>

      <div className='agility-field-panel'>
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
                <div className='absolute bottom-0 left-0 flex w-full cursor-default items-center space-x-1 bg-gradient-to-b from-transparent to-gray-500 p-3 text-white transition-all hover:opacity-0'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    className='h-6 w-6 text-white'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
                      clip-rule='evenodd'
                    ></path>
                  </svg>
                  <span>An image is attached to this item.</span>
                </div>
                <i className='fa fa-picture-o' aria-hidden='true'></i>
              </a>
            </div>

            <div className='grow'>
              <TextInput
                type='text'
                label='Alt Text'
                className='form-control agility-attachment-alt'
                defaultValue={attachment?.context?.custom?.alt}
                onChange={(val) => setAltText(val)}
                isReadonly={fieldConfig.readOnly}
              />

              <MetaRow
                label='Type'
                value={`${attachment.resource_type} - ${attachment.format}`}
              />
              <MetaRow
                label={"Size"}
                value={fileSizeFromBytes(attachment.bytes)}
              />
              <MetaRow
                label={"Width"}
                value={`${numeral(attachment.width).format("0,0")}px`}
              />
              <MetaRow
                label={"Height"}
                value={`${numeral(attachment.height).format("0,0")}px`}
              />
              <MetaRow
                label={"URL"}
                value={
                  <a
                    className='block break-all text-purple-600 line-clamp-1 hover:underline'
                    href={attachment.secure_url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    {attachment.public_id}
                  </a>
                }
              />
            </div>
          </div>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 text-center p-5'>
            <div>
              <p className='my-2 block text-xs text-gray-500'>
                No image is attached yet
              </p>
              <p className='mb-2 block text-sm font-medium text-gray-600'>
                Select an image from your Cloudinary Cloud
              </p>
              <Button
                icon='FolderDownloadIcon'
                label='Browse'
                size='lg'
                onClick={() => openMediaSelection()}
                type='alternative'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
