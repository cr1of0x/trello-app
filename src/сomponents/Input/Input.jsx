export const Input = ({
  className,
  name,
  type,
  onChange,
  value,
  minLength,
  maxLength,
  id,
  wrapperClass,
  highlightClass,
  barClass,
  labelClass,
  labelValue,
  errorClass,
  errorValue,
}) => {
  return (
    <div className={wrapperClass}>
      <input
        className={className}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        minLength={minLength}
        maxLength={maxLength}
        id={id}
      />
      <span className={highlightClass}></span>
      <span className={barClass}></span>
      <label className={labelClass}>{labelValue}</label>
      <div className={errorClass}>{errorValue}</div>
    </div>
  );
};
