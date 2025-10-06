import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log("login Body", reqBody);

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist. Please sign up." },
        { status: 404 }
      );
    }
    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Invalid credentials." },
        { status: 401 }
      );
    }
    // crete token data:
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log("Token Data:", tokenData);
    //create JWT token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    console.log("Generated Token:", token);
    // Send token in HTTP-only cookie

    const response = NextResponse.json(
      {
        message: "Login successful.",
        user: { name: user.name, email: user.email },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      //   secure: true,
      //   sameSite: "strict",
      //   maxAge: 86400,
      //   path: "/",
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred." },
      { status: 500 }
    );
  }
}
