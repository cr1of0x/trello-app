export const Dashboard = ({
  id,
  title,
  className,
  titleClassName,
  deleteClick,
}) => {
  return (
    <div className={className}>
      <div className={titleClassName}>{title}</div>
      <button
        onClick={() => {
          deleteClick(id);
        }}
      ></button>
    </div>
  );
};
