import { useRef } from "react";
import Card from "../ui/Card";
import classes from "./SignUpForm.module.css";

function SignUpForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const signInData = {
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onSubmitForm(signInData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            id="password"
            ref={passwordInputRef}
          ></input>
        </div>
        <div className={classes.actions}>
          {props.children}
          <button>{props.formButtonText}</button>
        </div>
      </form>
    </Card>
  );
}

export default SignUpForm;
