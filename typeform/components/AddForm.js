import { APP_CONFIG } from "../common/config";

const AddForm = ({ workspaceId, accountId }) => {
  if (!workspaceId || !accountId) return null;
  const addUrl = `${APP_CONFIG.DASHBOARD_ENDPOINT}/accounts/${accountId}/workspaces/${workspaceId}`;
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