import { Select as PlenumSelect } from "@agility/plenum-ui";
import { FormProps } from "./HubspotForm";

interface SelectProps {
  label: string,
  forms: FormProps[],
  updateValue: (formID: string) => void,
  value: string,
  isRequired: boolean
}

const Select = ({ label, forms, updateValue, value, isRequired }: SelectProps) => {
  let formData = value ? JSON.parse(value) : null;
  const formOptions = forms ? forms.map(f => ({ label: f?.name, value: f?.formId })) : []
  
  return (
    <div className="grid-flow-row gap-4 grid">
      <PlenumSelect
        id="select"
        label={label}
        name="select"
        value={formData?.formId}
        onChange={updateValue}
        options={formOptions}
        isRequired={isRequired}
        />
    </div>
  );
};

export default Select;
