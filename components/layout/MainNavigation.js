import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Image from "next/image";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>React Meetups</div>
      </Link>
      <Link href="/new-meetup">
        <div className={classes.addMeetupContainer}>
          <div className={classes.addMeetupText}>Add Meetup</div>{" "}
          <Image width={25} height={25} src="/plus.svg" />
        </div>
      </Link>
    </header>
  );
}

export default MainNavigation;
