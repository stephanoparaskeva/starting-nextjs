import { useState } from "react";
import SignInForm from "../../../components/login/SignInForm";
import { useRouter } from "next/router";
import axios from "axios";

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (enteredSignInData) => {
    setLoading(true);
    try {
      const response = await axios({
        url: "/api/users/login",
        method: "POST",
        data: JSON.stringify(enteredSignInData),
        headers: { "Content-Type": "application/json" },
      });
      global?.window?.localStorage.setItem("jwt", response.data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <SignInForm
      onSubmitForm={onSubmitForm}
      formButtonText={loading ? "Loading..." : "Sign In"}
    />
  );
};

export default SignIn;
