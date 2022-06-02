import Link from "next/link";
import classes from "./login.module.css";
import Image from "next/image";

const Login = () => {
  return (
    <div className={classes.loginContainer}>
      <img className={classes.loginImage} src="/language-meetup.jpg" />
    </div>
  );
};

export default Login;
