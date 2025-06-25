import { NextResponse } from "next/server";
import { validateBody } from "@/middlewares/validate";
import { loginSchema } from "@/validators/authValidator";
import { handleLogin } from "@/controllers/authController";

export async function POST(req: Request) {
  try {
    const body = await validateBody(req, loginSchema);
    const { user, token } = await handleLogin(body.email, body.password);

    const res = NextResponse.json({ message: "Login success", user });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 401 });
  }
}
