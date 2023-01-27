import { APP_CONFIG } from "../common/config";

const EditForm = ({ formId }) => {
  if (!formId) return null;
  const editUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/form/${formId}/create`;
 
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