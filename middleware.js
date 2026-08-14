import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { JWT_ALG, JWT_SECRET } from "./app/lib/auth";

const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return NextResponse.json({ error: "You are not authorized" }, { status: 401 });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return NextResponse.json({ error: "You are not authorized" }, { status: 401 });
  }

  try {
    const to = await jwtVerify(token, encodedKey, {
      algorithms: [JWT_ALG],
    });

    return NextResponse.next();
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "You are not authorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/messages/:path*",
};
