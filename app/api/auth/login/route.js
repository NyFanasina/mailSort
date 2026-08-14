import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { JWT_ALG, JWT_SECRET } from "@/app/lib/auth";

// Identifiants de démonstration — NE PAS MODIFIER
// login: admin@mailsort.test / password: mailsort2026
const DEMO_USER = { email: "admin@mailsort.test", password: "mailsort2026" };
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (email !== DEMO_USER.email || password !== DEMO_USER.password) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    // const token = await new SignJWT({ sub: email }, JWT_SECRET, { expiresIn: "2h" });
    const token = await new SignJWT({ sub: email })
      .setProtectedHeader({ alg: JWT_ALG })
      .setExpirationTime("2h")
      .sign(encodedKey);

    return NextResponse.json({ token });
  } catch (e) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }
}
