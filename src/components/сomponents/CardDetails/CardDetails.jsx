import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard, editDescriptionCard } from "../../../redux/thunks/card";
import { CardDescriptionForm } from "../../forms/CardDescriptionForm/CardDescriptionForm";
import styles from "./CardDetails.module.css";
import { FaRegCreditCard } from "react-icons/fa";

export const CardDetails = ({
  title,
  titleName,
  setTitleName,
  id,
  list_title,
  description,
  dashboard_id,
}) => {
  const [titleToggle, setTitleToggle] = useState(false);
  const [listModal, setListModal] = useState(false);
  const [descriptToogle, setDescriptToogle] = useState(false);
  const [descriptionText, setDescriptionText] = useState(description);
  const dispatch = useDispatch();

  const handleBlur = () => {
    if (titleName.length === 0) {
      setTitleName(title);
      setTitleToggle(false);
    } else {
      const data = { id, title: titleName };
      dispatch(editCard(data));
      setTitleToggle(false);
    }
  };

  const handleSubmit = (descript) => {
    const data = { id, descript, dashboard_id };
    dispatch(editDescriptionCard(data));
  };

  return (
    <div
      draggable={true}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={styles.container}
    >
      <div className={styles.titlecontainer}>
        <FaRegCreditCard className={styles.titleicon} />
        {titleToggle ? (
          <input
            className={styles.titleinput}
            value={titleName}
            onChange={(e) => {
              setTitleName(e.target.value);
            }}
            onBlur={() => {
              handleBlur();
            }}
            autoFocus={true}
            maxLength={12}
          />
        ) : (
          <div
            className={styles.title}
            onClick={() => {
              setTitleToggle(true);
            }}
          >
            {titleName}
          </div>
        )}
      </div>
      <div
        tabIndex={0}
        onBlur={() => setListModal(false)}
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.modalcontainer}
      >
        <div
          onClick={(e) => {
            setListModal(true);
          }}
        >
          in list {list_title}
        </div>
        {listModal ? <div className={styles.modal}>Modal</div> : ""}
      </div>
      <div className={styles.descriptioncontainer}>
        <h3>Description</h3>
        {descriptToogle ? (
          <CardDescriptionForm
            setDescriptToogle={setDescriptToogle}
            descriptionText={descriptionText}
            setDescriptionText={setDescriptionText}
            handleSubmit={handleSubmit}
            description={description}
          />
        ) : (
          <div>
            {description === "" ? (
              <div
                className={styles.descriptionadd}
                onClick={() => {
                  setDescriptToogle(true);
                }}
              >
                Add a more detailed description...
              </div>
            ) : (
              <div
                onClick={() => {
                  setDescriptToogle(true);
                }}
              >
                {descriptionText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
