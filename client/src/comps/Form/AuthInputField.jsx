import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AuthInputField({
  name,
  fieldType,
  fieldValue,
  setField,
  fieldFocus,
  setFocus,
  fieldValid,
}) {
  return (
    <>
      <input
        className={
          !fieldValid[name] && fieldValue
            ? "error"
            : !fieldValid[name] && !fieldValue
            ? ""
            : "success"
        }
        type={fieldType}
        placeholder={name}
        value={fieldValue}
        onChange={(e) => setField(e.target.value)}
        onFocus={() => setFocus((f) => ({ ...f, [name]: true }))}
        onBlur={() => setFocus((f) => ({ ...f, [name]: false }))}
        autoComplete="off"
        required
      />
      <FontAwesomeIcon
        className={!fieldValid[name] && fieldValue ? "error-icon" : "offscreen"}
        icon="circle-exclamation"
      />
      <FontAwesomeIcon
        className={fieldValid[name] ? "success-icon" : "offscreen"}
        icon="circle-check"
      />
    </>
  );
}

export default AuthInputField;
