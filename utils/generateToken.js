import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../pages/api/new-meetup";

export const generateToken = (id) =>
  jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
