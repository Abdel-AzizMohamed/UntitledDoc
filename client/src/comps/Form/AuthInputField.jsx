function AuthInputField({ name, fieldType, fieldValue, setField, setFocus, fieldError }) {
  return (
    <input
      className={fieldError[name] && fieldValue ? "error" : !fieldError[name] && fieldValue ? "" : "success" }
      type={fieldType}
      placeholder={name}
      value={fieldValue}
      onChange={(e) => setField(e.target.value)}
      onFocus={() => setFocus((f) => ({...f, [name]: true}))}
      onBlur={() => setFocus((f) => ({...f, [name]: false}))}
      autoComplete="off"
      required
    />
  );
}

export default AuthInputField;
