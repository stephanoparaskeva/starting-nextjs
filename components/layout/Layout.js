import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainNavigation from "./MainNavigation";
import classes from "./Layout.module.css";
import { CircularProgress } from "@mui/material";

function Layout(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const getJwt = () => global?.window?.localStorage.getItem("jwt");

  useEffect(()=> {
    if (!getJwt()) {
      router.push("/login");
    }
  }, [])

  router.events?.on("routeChangeStart", () => {
    setLoading(true);
  });
  router.events?.on("routeChangeComplete", (url) => {
    setLoading(false);

    if (url.match(/login/)) return;
    if (!getJwt()) router.push("/login");
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
