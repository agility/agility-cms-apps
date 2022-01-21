import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { APP_CONFIG } from "../common/config";

const Select = ({ forms, updateValue, value }) => {
  let formData = value ? JSON.parse(value) : null;
  return (
    <div className="select-container">
      {forms.length > 0 ? (
        <>
          <div className="dropdown">
            <select
              value={formData ? formData.guid : ""}
              onChange={(e) => {
                updateValue(e);
              }}
              className="dropdown-toggle"
            >
              <option value="">Select a form...</option>
              {forms.map((form, index) => (
                <option value={form.guid} key={index}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>
          <FontAwesomeIcon icon={faCaretDown} className="select-arrow" />
        </>
      ) : (
        <p className="no-forms">
          This App couldn{"'"}t render any forms from {APP_CONFIG.NAME}. Log in to your {APP_CONFIG.NAME} account to create a new form.
        </p>
      )}
    </div>
  );
};

export default Select;
