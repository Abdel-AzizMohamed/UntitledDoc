function AreaField({ name, fieldValue, setField }) {
  return (
    <div className="field-group">
      <textarea
        placeholder={name}
        value={fieldValue}
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  );
}

export default AreaField;
