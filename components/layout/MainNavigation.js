import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Head from "next/head";

function MainNavigation() {
  return (
    <>
      <Head>
        <script
          src="https://kit.fontawesome.com/1ae37fca73.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <header className={classes.header}>
        <Link href="/">
          <div className={classes.logo}>React Meetups</div>
        </Link>
        <Link href="/new-meetup">
          <div className={classes.addMeetupContainer}>
            <div className={classes.addMeetupText}>Add Meetup</div>{" "}
            <i className="fa-solid fa-plus"></i>
          </div>
        </Link>
      </header>
    </>
  );
}

export default MainNavigation;
