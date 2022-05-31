import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useRouter } from "next/router";

function MainNavigation() {
  const router = useRouter();
  const jwt = global?.window?.localStorage.getItem("jwt");

  const logoutHandler = async () => {
    await global?.window?.localStorage.removeItem("jwt");
    router.push("/");
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>React Meetups</div>
      </Link>
      {jwt && (
        <div className={classes.headerOptions}>
          <Link href="/new-meetup">
            <div className={classes.addMeetupContainer}>
              <div className={classes.addMeetupText}>Add Meetup</div>{" "}
            </div>
          </Link>
          <div onClick={logoutHandler} className={classes.logoutText}>
            Logout
          </div>
        </div>
      )}
    </header>
  );
}

export default MainNavigation;
