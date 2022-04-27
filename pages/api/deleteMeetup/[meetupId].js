import { connect } from "../new-meetup";
import { ObjectID } from "mongodb";

const handler = async (req, res) => {
  if (req.method !== "DELETE") return;
  const { meetupId } = req.query;

  const client = await connect();
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const _id = ObjectID(meetupId);
  const result = await meetupsCollection.deleteOne({ _id });

  client.close;

  res.status(200).json(result);
};

export default handler;
