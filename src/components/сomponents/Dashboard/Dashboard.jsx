export const Dashboard = ({ title, className, titleClassName }) => {
  return (
    <div className={className}>
      <div className={titleClassName}>{title}</div>
    </div>
  );
};
