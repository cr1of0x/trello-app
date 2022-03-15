import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setFormErrors } from "../../../redux/actions/actions";
import { createList, deleteList, getLists } from "../../../redux/thunks/list";
import { ListForm } from "../../forms/ListForm/ListForm";
import { List } from "../../сomponents/List/List";
import styles from "./DashboardDetails.module.css";

export const DashboardDetails = () => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => {
    return state.lists.lists;
  });
  const params = useParams();
  const id = params.pathId;

  const handleCreate = (formData, onSucess, formName) => {
    dispatch(createList(id, formData, onSucess, formName));
  };

  const handleCancel = () => {
    dispatch(setFormErrors(""));
  };

  const handleDelete = (dashboard_id, list_id) => {
    dispatch(deleteList(dashboard_id, list_id));
  };

  useEffect(() => {
    dispatch(getLists(id));
  }, []);

  return (
    <>
      <div className={styles.container}>
        {lists.map((list) => {
          return (
            <List
              key={list._id}
              title={list.title}
              dashboard_id={id}
              list_id={list._id}
              handleDelete={handleDelete}
              cards={list.cards}
              handleCancel={handleCancel}
              lists={lists}
            />
          );
        })}
        <ListForm handleCreate={handleCreate} handleCancel={handleCancel} />
      </div>
    </>
  );
};
