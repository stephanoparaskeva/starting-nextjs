import MeetupDetail from "../../components/meetups/MeetupdDetail";
import { connect } from "../api/new-meetup";

const MeetupDetails = () => {
  return <MeetupDetail />;
};

export const getStaticPaths = async () => {
  const client = await connect();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetupIds = await meetupsCollection.find({}, { _id: 1 }).toArray();

  return {
    fallback: false,
    paths: meetupIds.map(({ _id }) => ({
      params: { meetupId: _id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://i.natgeofe.com/k/9acd2bad-fb0e-43a8-935d-ec0aefc60c2f/monarch-butterfly-grass_4x3.jpg",
        title: "A First Meetup",
        address: "Some Address 5, Some City",
        description: "The meetup description",
      },
    },
  };
};

export default MeetupDetails;
