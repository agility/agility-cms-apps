import React, { useState } from "react";
import { fields } from "../contstants/formData";

/**
 * @description
 * a hook that handles the field changes within the form builder
 * @returns [form<Array>, setForm<Function>, updateForm<Function>]
 */

export const useForm = () => {
  const [form, setForm] = useState(fields);

  const updateForm = (id: string) => {
    const newForm = form.map(field => {
      if(field.id === id){
        field.isSelected = !field.isSelected;
      }
      return field;
    });
    setForm(newForm);
  }

  return [form, setForm, updateForm] as const;
}