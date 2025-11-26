import { setAuthCookie } from "@/lib/cookies";
import { connectDB } from "@/lib/db";
import { signtoken } from "@/lib/jwt";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const token = signtoken({ userId: user._id });
    setAuthCookie(token);

    
    return Response.json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email },
    });
  } catch (error) {
     return Response.json({ error: err.message }, { status: 500 });
  }
}
