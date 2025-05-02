import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
  const url = new URL(req.url);
  const mess = url.searchParams.get("message");
  console.log("hello")
  if (mess) {

    // Tạo response với cookie và redirect
    const response = NextResponse.redirect(new URL(`/en/error`, req.url));
    // Set cookie với token

    return response;
  } else {
    console.error("No token found in URL");
    return NextResponse.json({ success: false, message: "No token found in URL" });
  }
}
