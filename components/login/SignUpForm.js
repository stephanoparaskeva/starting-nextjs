import { useRef } from "react";

import Card from "../ui/Card";
import classes from "./SignUpForm.module.css";

function SignUpForm(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmationInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredPasswordConfirmation =
      passwordConfirmationInputRef.current.value;

    if (enteredPassword !== enteredPasswordConfirmation) {
      return
    }

    const signUpData = {
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
    };

    props.onSubmitForm(signUpData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" ref={nameInputRef} />
        </div>
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
        <div className={classes.control}>
          <label htmlFor="password confirmation">Password Confirmation</label>
          <input
            type="password"
            required
            id="password confirmation"
            ref={passwordConfirmationInputRef}
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
