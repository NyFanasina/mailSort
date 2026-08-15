import { getAllMessages, VALID_CATEGORIES } from "@/app/lib/store";
import { NextResponse } from "next/server";

// GET /api/messages/stats
// Retourne le nombre de messages par catégorie ainsi que le total.
export async function GET() {
  const messages = getAllMessages();

  const stats = VALID_CATEGORIES.reduce((acc, category) => {
    const count = messages.reduce((accCount, m) => accCount + (m.category === category ? 1 : 0), 0);
    acc[category] = count;
    return acc;
  }, {});

  return NextResponse.json({
    total: messages.length,
    byCategory: stats,
  });
}
