import { useRouter } from "next/router";
import { useState } from "react";
import MeetupForm from "../../components/meetups/MeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const addMeetupHandler = async (enteredMeetupData) => {
    setLoading(true);
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/");
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetup and create amazing networking opportunities"
        />
      </Head>
      <MeetupForm
        formButtonText={loading ? "Loading..." : "Add Meetup"}
        onSubmitForm={addMeetupHandler}
      />
    </>
  );
};

export default NewMeetupPage;
