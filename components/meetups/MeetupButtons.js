import Button from "@mui/material/Button";
import classes from "./MeetupButtons.module.css";

const MeetupButtons = ({ deleteHandler, editHandler }) => {
  return (
    <div className={classes.buttonsContainer}>
      <Button
        onClick={deleteHandler}
        className={classes.deleteButton}
        color="error"
        variant="contained"
      >
        Delete
      </Button>
      <Button
        onClick={editHandler}
        className={classes.editButton}
        variant="contained"
      >
        Edit
      </Button>
    </div>
  );
};

export default MeetupButtons;
