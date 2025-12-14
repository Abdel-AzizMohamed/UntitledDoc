function InputField({ name, fieldType, fieldValue, setField }) {
  return (
    <div className="field-group">
      <input
        type={fieldType}
        placeholder={name}
        value={fieldValue}
        onChange={(e) => setField(e.target.value)}
        autoComplete="off"
        required
      />
    </div>
  );
}

export default InputField;
