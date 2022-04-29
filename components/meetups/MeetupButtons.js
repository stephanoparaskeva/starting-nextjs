import Button from "@mui/material/Button";
import classes from "./MeetupButtons.module.css";

const MeetupButtons = ({ editing, setEditing, deleteHandler }) => {
  return (
    <div className={classes.actions}>
      <button onClick={deleteHandler}>Delete</button>
      <button className={classes.edit} onClick={() => setEditing(!editing)}>
        Edit
      </button>
    </div>
  );
};

export default MeetupButtons;
