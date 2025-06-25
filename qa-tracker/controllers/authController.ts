import { User } from "@/models/userModel";
import { connectToDB } from "@/lib/mongoose";
import { hashPassword, comparePassword } from "@/lib/bcrypt";
import { signJWT } from "@/lib/jwt";

export const handleRegister = async (name: string, email: string, password: string) => {
  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await hashPassword(password);

  const newUser = await User.create({ name, email, password: hashedPassword });
  const token = signJWT({ email });

  return { user: { email: newUser.email, name: newUser.name }, token };
};

export const handleLogin = async (email: string, password: string) => {
  await connectToDB();

  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signJWT({ email });
  return { user: { email: user.email, name: user.name }, token };
};

