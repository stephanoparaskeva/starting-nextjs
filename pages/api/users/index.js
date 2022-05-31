import { connect } from "../new-meetup";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/generateToken";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const { name, email, password } = req.body;

  const client = await connect();

  const db = client.db();

  const usersCollection = db.collection("users");

  const userExists = await usersCollection.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const result = await usersCollection.insertOne({
    name,
    email,
    password: encryptedPassword,
  });

  if (result) {
    res
      .status(201)
      .json({
        _id: result.insertedId,
        token: generateToken(result.insertedId),
      });
  } else {
    res.status(400);
    throw new Error("Failed To Create User");
  }
};

export default handler;
