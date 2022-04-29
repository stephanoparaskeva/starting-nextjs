import { useState } from "react";
import { useRouter } from "next/router";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
import { CircularProgress } from "@mui/material";

function MeetupList(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  router.events?.on("routeChangeStart", () => setLoading(true));
  router.events?.on("routeChangeComplete", () => setLoading(false));

  return loading ? (
    <div className={classes.circularProgress}>
      <CircularProgress size={100} color="error" />
    </div>
  ) : (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
