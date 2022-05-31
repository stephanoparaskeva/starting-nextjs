import { MongoClient } from "mongodb";

export const MONGODB_CONNECTION_STRING =
  "mongodb+srv://stephanoparaskeva:N1Ui2baXi3ba122n@cluster0.i1ow6.mongodb.net/meetups?retryWrites=true&w=majority\n";

export const JWT_SECRET = '123shhhhhhh'

export const connect = () => MongoClient.connect(MONGODB_CONNECTION_STRING);

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const data = req.body;

  const client = await connect();
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const result = await meetupsCollection.insertOne(data);

  client.close;

  res.status(201).json(result);
};

export default handler;
