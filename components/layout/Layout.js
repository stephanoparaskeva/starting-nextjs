import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { CircularProgress } from "@mui/material";

function Layout(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  router.events?.on("routeChangeStart", () => {
    setLoading(true);
  });
  router.events?.on("routeChangeComplete", (url) => {
    setLoading(false);

    const jwt = global?.window?.localStorage.getItem("jwt");

    if (url.match(/login/)) return;
    if (!jwt) router.push("/login");
  });

  return (
    <div>
      <MainNavigation />
      {loading ? (
        <div className={classes.circularProgress}>
          <CircularProgress size={100} color="error" />
        </div>
      ) : (
        <main className={classes.main}>{props.children}</main>
      )}
    </div>
  );
}

export default Layout;
