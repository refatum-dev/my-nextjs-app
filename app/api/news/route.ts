import { NextRequest, NextResponse } from "next/server";
import { PerplexityClient } from "../../lib/perplexity";

export async function GET(_req: NextRequest) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "PERPLEXITY_API_KEY nie jest wprowadzony w .env.local" },
      { status: 200 },
    );
  }

  try {
    const client = new PerplexityClient(apiKey);
    const news = await client.fetchPolishNews();

    return NextResponse.json({ success: true, news, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error("[news route]", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Nieznany błąd" },
      { status: 500 },
    );
  }
}
