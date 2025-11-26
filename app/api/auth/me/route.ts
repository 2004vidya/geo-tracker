import { getAuthCookie } from "@/lib/cookies";
import { connectDB } from "@/lib/db";
import { verifytoken } from "@/lib/jwt";
import User from "@/models/user.model";

export async function GET() {
  try {
    await connectDB();
    const token = getAuthCookie();

    if (!token) {
      return Response.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded: any = verifytoken(token);
    if (!decoded) {
      return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await User.findById(decoded.userId).select("-password");
     return Response.json({ user });
  } catch (error) {
      return Response.json({ error: err.message }, { status: 500 });
  }
}
