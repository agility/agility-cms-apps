import { APP_CONFIG } from "../common/config";

const AddForm = ({ addFormId }) => {
  const addUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/${addFormId}/type`;
  return (
    <a 
      href={addUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="btn btn-primary edit-btn">
        Add Form
    </a>
  );
  
};

export default AddForm;