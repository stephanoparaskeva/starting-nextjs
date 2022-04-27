import Head from "next/head";
import { ObjectID } from "mongodb";
import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import MeetupButtons from "../../components/meetups/MeetupButtons";
import { connect } from "../api/new-meetup";

const MeetupDetails = ({ meetupData }) => {
  const router = useRouter();

  const deleteMeetupHandler = async () => {
    const response = await fetch(`/api/deleteMeetup/${meetupData.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    console.log(response)
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        title={meetupData?.title}
        image={meetupData?.image}
        address={meetupData?.address}
        description={meetupData?.description}
      />
      <MeetupButtons deleteHandler={deleteMeetupHandler} />
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
