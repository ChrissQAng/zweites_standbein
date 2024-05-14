import { User } from "../models/user.js";
import { createToken } from "../utils/createToken.js";
import { hash } from "../utils/hash.js";
import { userToView } from "./help.js";

export async function loginCustomer({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User does not exist");

  if (user.role !== "customer") throw new Error("user is not a cutomer");

  const passwordHash = hash(`${password}${user.passwordSalt}`);
  const correctPassword = passwordHash === user.passwordHash;

  if (!correctPassword) throw new Error("Wrong Password");

  const accessToken = createToken(user);

  return { user: userToView(user), tokens: accessToken };
}