import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token) {
    // Tạo response với cookie và redirect
    const response = NextResponse.redirect(new URL("/", req.url));
    
    // Set cookie chứa token
    response.cookies.set("gid", token, {
      httpOnly: false, // Chỉ cho phép truy cập từ server, tăng bảo mật
      secure: process.env.NODE_ENV === "production", // Chỉ dùng HTTPS trong môi trường production
      maxAge: 60 * 60 * 24 * 7, // Thời hạn 7 ngày
      path: "/", // Áp dụng cookie trên toàn bộ ứng dụng
    });

    return response;
  } else {
    console.error("No token found in URL");
    return NextResponse.json({ success: false, message: "No token found in URL" });
  }
}
