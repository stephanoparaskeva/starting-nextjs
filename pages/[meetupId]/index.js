import Head from "next/head";
import { useState } from "react";
import { ObjectID } from "mongodb";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import MeetupButtons from "../../components/meetups/MeetupButtons";
import { connect } from "../api/new-meetup";
import MeetupForm from "../../components/meetups/MeetupForm";
import Button from "@mui/material/Button";

const MeetupDetails = ({ meetupData }) => {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteMeetupHandler = async () => {
    setLoading(true);
    await fetch(`/api/deleteMeetup/${meetupData.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);

    router.push("/");
  };

  const editMeetupHandler = async (enteredMeetupData) => {
    setLoading(true);
    await fetch(`/api/editMeetup/${meetupData.id}`, {
      method: "PATCH",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);

    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      {!editing ? (
        <>
          <MeetupDetail
            title={meetupData?.title}
            image={meetupData?.image}
            address={meetupData?.address}
            description={meetupData?.description}
          />
          <MeetupButtons
            loading={loading}
            editing={editing}
            setEditing={setEditing}
            deleteHandler={deleteMeetupHandler}
          />
        </>
      ) : (
        <MeetupForm
          titleDefault={meetupData?.title}
          imageDefault={meetupData?.image}
          addressDefault={meetupData?.address}
          descriptionDefault={meetupData?.description}
          formButtonText={loading ? "Loading..." : "Edit Meetup"}
          onSubmitForm={editMeetupHandler}
        >
          <button onClick={() => setEditing(false)}>Back</button>
        </MeetupForm>
      )}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await connect();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectID(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        id: selectedMeetup._id.toString(),
      },
    },
  };
};

export default MeetupDetails;
