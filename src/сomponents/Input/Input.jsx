export const Input = ({
  className,
  name,
  type,
  onChange,
  value,
  minLength,
  maxLength,
  id,
}) => {
  return (
    <input
      required={true}
      className={className}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      minLength={minLength}
      maxLength={maxLength}
      id={id}
    />
  );
};
