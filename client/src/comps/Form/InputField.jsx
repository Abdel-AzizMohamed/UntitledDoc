function InputField({ name, fieldType, fieldValue, setField }) {
  return (
    <input
      type={fieldType}
      placeholder={name}
      value={fieldValue}
      onChange={(e) => setField(e.target.value)}
      required
    />
  );
}

export default InputField;
