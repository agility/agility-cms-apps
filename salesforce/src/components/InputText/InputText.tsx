import React from "react";

interface InputTextProps {
  type: string,
  name: string,
  id: string,
  value: string,
  placeholder: string,
  isDisabled: boolean | undefined,
  handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export const InputText = ({type, name, id, value, placeholder, isDisabled, handleChange}: InputTextProps): JSX.Element => {
  return(
    <>
      <label className="flex pt-4 text-sm" htmlFor={id}>{name}</label>
      <input 
        type={type} 
        name={id} 
        id={id} 
        value={value !==  placeholder ? value : ''}
        placeholder={placeholder} 
        onChange={(e) => handleChange(e)} 
        disabled={isDisabled}
        className="border-[1px] border-border rounded-sm w-full text-sm p-1 mb-1 focus:border-borderActive focus:border-[1px] outline-none"
      />
    </>
  );
}