import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createList, getLists } from "../../../redux/thunks/list";
import { List } from "../../сomponents/List/List";
import styles from "./DashboardInner.module.css";

export const DashboardInner = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const lists = useSelector((state) => {
    return state.lists.lists;
  });
  const params = useParams();
  const id = params.pathId;
  const [toggle, setToggle] = useState(false);

  const handleCreate = () => {
    dispatch(createList(id, title));
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    dispatch(getLists(id));
  }, []);

  return (
    <div className={styles.container}>
      {lists.map((e) => {
        return (
          <List key={e._id} title={e.title} dashboard_id={id} list_id={e._id} />
        );
      })}
      {toggle ? (
        <div>
          <input
            name="title"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            onClick={() => {
              handleCreate();
              setToggle(false);
            }}
          >
            Ok
          </button>
          <button
            onClick={() => {
              setToggle(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            setToggle(true);
          }}
        >
          {lists.length === 0 ? "Add first list" : "Add another list"}
        </button>
      )}
    </div>
  );
};
