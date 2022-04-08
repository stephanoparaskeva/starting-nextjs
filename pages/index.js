import MeetupList from "../components/meetups/MeetupList";
import { connect } from "./api/new-meetup";
import Head from "next/head";

const HomePage = ({ meetups }) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of highly active React meetups!"/>
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
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
