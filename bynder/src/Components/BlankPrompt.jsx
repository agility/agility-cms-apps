import { Button } from "@agility/plenum-ui";
import React from "react";

const BlankPrompt = ({ handleSelect, isImage }) => {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 text-center p-5'>
      <div>
        <p className='my-2 block text-xs text-gray-500'>
          No {isImage ? "image" : "video"} is attached yet
        </p>
        <p className='mb-2 block text-sm font-medium text-gray-600'>
          Select one from your Bynder library.
        </p>
        <Button
          icon='FolderDownloadIcon'
          label='Browse'
          size='lg'
          onClick={() => handleSelect()}
          type='alternative'
        />
      </div>
    </div>
  );
};

export default BlankPrompt;
