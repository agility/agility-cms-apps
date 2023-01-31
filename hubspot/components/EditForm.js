import { APP_CONFIG } from "../common/config";

const EditForm = ({ form }) => {
  if (!form) return null;
  const {formId, portalId} = form;
  const editUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/${portalId}/editor/${formId}/edit/form`;
  return (
    <a 
      href={editUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn btn-primary edit-btn">
        Edit Form
    </a>
  );
  
};

export default EditForm;