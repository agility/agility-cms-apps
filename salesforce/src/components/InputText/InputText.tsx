import React from "react";
import { Description } from "../Description";

interface InputTextProps {
  type: string,
  name: string,
  id: string,
  value: string,
  placeholder: string,
  isDisabled: boolean | undefined,
  description: string,
  handleChange: (targetValue: string) => void
}


export const InputText = ({ type, name, id, value, placeholder, isDisabled, description, handleChange }: InputTextProps): JSX.Element => {
  return (
    <>
      <label className="inline-block pt-4 pr-2 mb-1 text-sm font-bold" htmlFor={id}>{name}</label>
      <Description text={description} />
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        disabled={isDisabled}
        className="border-[1px] border-border rounded-sm w-full text-sm p-1 mb-1 focus:border-borderActive focus:border-[1px] outline-none"
      />
    </>
  );
}