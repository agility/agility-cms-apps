import { APP_CONFIG } from "../common/config";
import { Button } from "@agility/plenum-ui"

interface AddFormProps {
  addFormId: string
}

const AddForm = ({ addFormId }: AddFormProps) => {
  const addUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/${addFormId}/type`;
  return (
     <Button
     label="Add Form"
     asLink={{ href: addUrl, target: "_blank" }}
     size="sm"
     type="primary"
   />
  );
  
};

export default AddForm;