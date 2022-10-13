import React from "react";

const AttachmentOverlay = ({ isImage }) => {
  return (
    <div className='absolute bottom-0 left-0 flex w-full cursor-default items-center space-x-1 bg-gradient-to-b from-transparent to-gray-500 text-white p-3 transition-all hover:opacity-0 text-sm'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 20 20'
        fill='currentColor'
        aria-hidden='true'
        className='h-6 w-6 text-white'
      >
        <path
          fillRule='evenodd'
          d='M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z'
          clipRule='evenodd'
        ></path>
      </svg>
      <span>
        {isImage ? "An image " : "A video "} is attached to this item.
      </span>
    </div>
  );
};

export default AttachmentOverlay;
