import { NextResponse } from "next/server";
import { validateBody } from "@/middlewares/validate";
import { registerSchema } from "@/validators/authValidator";
import { handleRegister } from "@/controllers/authController";

export async function POST(req: Request) {
  try {
    const body = await validateBody(req, registerSchema);
    const { user, token } = await handleRegister(body.name, body.email, body.password);

    const res = NextResponse.json({ message: "User created", user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
