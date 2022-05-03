import Link from "next/link";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>React Meetups</div>
      </Link>
      <Link href="/new-meetup">
        <div className={classes.faPlusContainer}>
          <i className="fa-solid fa-plus"></i>
        </div>
      </Link>
    </header>
  );
}

export default MainNavigation;
