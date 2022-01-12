import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select = ({ forms, updateValue, value }) => {
  let formData;
  if (value) {
    formData = JSON.parse(value);
  }

  return (
    <div className="select-container">
      {forms.length > 0 ? (
        <>
          <div className="dropdown">
            <select
              value={formData ? formData.id : ""}
              onChange={(e) => {
                updateValue(e);
              }}
              className="dropdown-toggle"
            >
              <option value="">Select a form...</option>
              {forms.map((form, index) => (
                <option value={form.id} key={index}>
                  {form.name}
                </option>
              ))}
            </select>
          </div>
          <FontAwesomeIcon icon={faCaretDown} className="select-arrow" />
        </>
      ) : (
        <p className="no-forms">
          This App couldn{"'"}t render any forms from Formstack. Log in to your
          Formstack account to create a new form.
        </p>
      )}
    </div>
  );
};

export default Select;
