import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { get } from "http";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const user = await User.findOne({
        _id: userId,
    }).select("-password -createdAt -updatedAt -__v"); // -password means exclude password field from the result

    return NextResponse.json({
        message: "User found successfully",
        data: user,
    })

  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }
  }
}
