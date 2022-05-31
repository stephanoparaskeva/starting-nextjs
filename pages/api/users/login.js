import { connect } from "../new-meetup";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../utils/generateToken";

const handler = async (req, res) => {
  if (req.method !== "POST") return;

  const { email, password } = req.body;

  const client = await connect();

  const db = client.db();

  const usersCollection = db.collection("users");

  const user = await usersCollection.findOne({ email });

  const matchPassword = async (enteredPassword) =>
    await bcrypt.compare(enteredPassword, user.password);

  if (user && (await matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
};

export default handler;
