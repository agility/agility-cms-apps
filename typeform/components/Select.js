import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Select = ({ items, updateValue, value, emptyText, itemKey, required }) => {

  console.log(required, value)
  const isError = (required && !value)

  return (
    <div className="select-container">
        <>
          <div className="dropdown">
            <select
              value={value}
              onChange={updateValue}
              className={!isError ? 'dropdown-toggle' : 'dropdown-toggle error'}
            >
              <option value="">{emptyText}</option>
              {items.map((item, index) => (
                <option value={item[itemKey]} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <FontAwesomeIcon icon={faCaretDown} className="select-arrow" />
        </>
    </div>
  );
};

export default Select;
