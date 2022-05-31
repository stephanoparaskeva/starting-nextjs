import { useState } from "react";
import SignUpForm from "../../../components/login/SignUpForm";
import { useRouter } from "next/router";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmitForm = async (enteredSignUpData) => {
    setLoading(true);
    try {
      const response = await axios({
        url: "/api/users",
        method: "POST",
        data: JSON.stringify(enteredSignUpData),
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
    <SignUpForm
      onSubmitForm={onSubmitForm}
      formButtonText={loading ? "Loading..." : "Sign Up"}
    />
  );
};

export default SignUp;
