import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
        {
            message: "Logout successful.",
            success: true
        }
    )
    response.cookies.set('token', "", {
        // we are setting the token to empty string to remove it
        httpOnly: true, // means that the cookie cannot be accessed or modified by JavaScript running in the browser (like document.cookie).
        expires: new Date(0), // Set the cookie to expire immediately
      });
    return response;

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
