import React from "react";

export const MetaRow = ({ label, value }) => {
  return (
    <div className='my-2 flex w-full justify-between border-b border-b-gray-300 pb-2'>
      <div className='text-sm text-gray-600 font-medium'>{label} :</div>
      <div className='text-sm text-gray-900 '>{value}</div>
    </div>
  );
};
