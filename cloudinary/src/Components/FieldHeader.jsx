import React from "react";
import { Button, ButtonDropDown } from "@agility/plenum-ui";
import { DynamicIcons } from "./DynamicIcons";

const FieldHeader = ({
  fieldConfig,
  attachment,
  handleRemove,
  handleSelect,
}) => {
  return (
    <div className='flex w-full items-center justify-between pb-1 font-muli'>
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
                icon: "CollectionIcon",
                label: "Browse",
                size: "sm",
                onClick: () => handleSelect(),
                type: "secondary",
              }}
              dropDown={{
                IconElement: () => (
                  <DynamicIcons
                    outline={false}
                    icon='ChevronDownIcon'
                    className='h-5 w-5 text-purple-600'
                  />
                ),
                items: [
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
            <Button
              icon='FolderDownloadIcon'
              label='Browse'
              size='sm'
              onClick={() => handleSelect()}
              type='secondary'
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FieldHeader;
