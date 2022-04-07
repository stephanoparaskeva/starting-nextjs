import MeetupList from "../components/meetups/MeetupList";
import { connect } from "./api/new-meetup";

const HomePage = ({ meetups }) => {
  return <MeetupList meetups={meetups} />;
};

export const getStaticProps = async () => {
  const client = await connect();
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map(({ title, address, image, _id }) => ({
        title,
        address,
        image,
        id: _id.toString(),
      })),
    },
  };
};

export default HomePage;
