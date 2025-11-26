import { setAuthCookie } from "@/lib/cookies";
import { connectDB } from "@/lib/db";
import { signtoken } from "@/lib/jwt";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const { name, email, password } = body;

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password,10);

    const newUser = await User.create({
        name,
        email,
        password:hashed,
    })

    const token = signtoken({ userId: newUser._id });
    setAuthCookie(token);

     return Response.json({
      message: "User registered successfully",
      user: { id: newUser._id, name, email },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
