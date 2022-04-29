import classes from "./MeetupButtons.module.css";

const MeetupButtons = ({ editing, setEditing, deleteHandler, loading }) => {
  return (
    <div className={classes.actions}>
      <button onClick={deleteHandler}>
        {loading ? "Loading..." : "Delete"}
      </button>
      <button className={classes.edit} onClick={() => setEditing(!editing)}>
        Edit
      </button>
    </div>
  );
};

export default MeetupButtons;
