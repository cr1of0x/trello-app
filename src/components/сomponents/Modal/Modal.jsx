import "./Modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`modal ${active ? "active" : ""}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`modalcontent ${active ? "active" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
