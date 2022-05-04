import classes from "./MeetupButtons.module.css";
import { useRouter } from "next/router";

const MeetupButtons = ({ editing, setEditing, deleteHandler, loading }) => {
  const router = useRouter();

  return (
    <div className={classes.actions}>
      <button className={classes.back} onClick={router.back}>Back</button>
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
