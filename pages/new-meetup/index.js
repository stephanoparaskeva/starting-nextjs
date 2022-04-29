import { useRouter } from "next/router";
import MeetupForm from "../../components/meetups/MeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    router.push("/");
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
      <MeetupForm formButtonText="Add Meetup" onSubmitForm={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
