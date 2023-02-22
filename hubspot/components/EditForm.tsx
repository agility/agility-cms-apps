import { APP_CONFIG } from "../common/config";
import { Button } from "@agility/plenum-ui";
import { FormProps } from "./HubspotForm";

interface EditFormProps {
  form: FormProps
}

const EditForm = ({ form }: EditFormProps) => {
  if (!form) return null;
  const {formId, portalId} = form;
  const editUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/${portalId}/editor/${formId}/edit/form`;
  
  return (
    <Button
      className="mr-2"
      label="Edit Form"
      asLink={{ href: editUrl, target: "_blank" }}
      size="sm"
      type="primary"
    />
  );
  
};

export default EditForm;