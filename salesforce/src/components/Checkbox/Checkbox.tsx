import React from "react";
import { MenuIcon } from '@heroicons/react/solid'

interface CheckboxProps {
  id: string,
  name: string,
  isDisabled: boolean | undefined,
  isChecked: boolean,
  handleChange: (id: string) => void
}

export const Checkbox = ({id, name, isDisabled, isChecked, handleChange}: CheckboxProps): JSX.Element => {
  return (
    <div key={id} className="relative flex items-start py-3 pr-5 border-b-[1px]">
      <div className="flex-1 min-w-0 text-sm">
        <label htmlFor={`field-${id}`} className="flex font-medium text-gray-700 select-none">
          {isDisabled || <MenuIcon className="h-5 mr-3 cursor-move sortButton" />}
          {name}
        </label>
      </div>
      <div className="flex items-center h-5 ml-3">
        <input
          id={`field-${id}`}
          name={`field-${id}`}
          type="checkbox"
          disabled={isDisabled}
          className="w-4 h-4 text-indigo-600 border-gray-300 rounded cursor-pointer focus:ring-indigo-500"
          checked={isChecked}
          onChange={() => handleChange(id)}
        />
      </div>
    </div>
  );
}