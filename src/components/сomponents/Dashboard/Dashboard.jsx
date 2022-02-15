export const Dashboard = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <div className={className}>
      <div className={titleClassName}>{title}</div>
      <div className={descriptionClassName}>{description}</div>
    </div>
  );
};
