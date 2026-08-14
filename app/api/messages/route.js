import { NextResponse } from "next/server";
import { getAllMessages, VALID_CATEGORIES } from "@/app/lib/store";

// GET /api/messages
// GET /api/messages?category=facture
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let result = getAllMessages();

  if (category) {
    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Catégorie invalide. Valeurs possibles : ${VALID_CATEGORIES.join(", ")}` },
        { status: 400 },
      );
    }

    result = result.filter((m) => m.category === category);
  }

  result.sort((a, b) => new Date(b.receivedAt) - new Date(a.receivedAt));

  return NextResponse.json({ count: result.length, messages: result });
}
