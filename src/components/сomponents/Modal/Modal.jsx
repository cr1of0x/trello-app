import "./Modal.css";

export const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={`modal ${active ? "active" : ""}`}
      onClick={() => setActive(false)}
      draggable={true}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
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
