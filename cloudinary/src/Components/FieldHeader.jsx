import React from "react";
import { ButtonDropDown } from "@agility/plenum-ui";
const FieldHeader = ({
  fieldConfig,
  attachment,
  handleRemove,
  handleSelect,
}) => {
  const DropDownIconElement = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );

  return (
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
                onClick: () => handleSelect(),
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
                      onClick: () => handleRemove(),
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
                onClick: () => handleSelect(),
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
  );
};

export default FieldHeader;
