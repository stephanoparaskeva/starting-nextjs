import Link from "next/link";
import classes from "./login.module.css";

const Login = () => {
  return (
    <div className={classes.loginActions}>
      <Link href="/login/signin">
        <button>Sign In</button>
      </Link>
      <Link href="/login/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Login;
