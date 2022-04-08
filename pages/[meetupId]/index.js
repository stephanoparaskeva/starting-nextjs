import Head from "next/head";
import { ObjectID } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupdDetail";
import { connect } from "../api/new-meetup";

const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta
          name="description"
          content={meetupData.description}
        />
      </Head>
      <MeetupDetail
        title={meetupData?.title}
        image={meetupData?.image}
        address={meetupData?.address}
        description={meetupData?.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await connect();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetupIds.map(({ _id }) => ({
      params: { meetupId: _id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
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
