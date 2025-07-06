export interface NewsItem {
  title: string;
  summary: string;
  source?: string;
  timestamp?: string;
}

interface PerplexityChoice {
  message?: {
    content?: string;
  };
}

interface PerplexityResponse {
  choices: PerplexityChoice[];
}

/**
 * Lightweight Perplexity API client focused on fetching Polish news headlines.
 */
export class PerplexityClient {
  private readonly apiKey: string;
  private readonly baseUrl = "https://api.perplexity.ai/chat/completions";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Fetches the top-5 Polish news stories as structured JSON.
   */
  async fetchPolishNews(): Promise<NewsItem[]> {

    const updateTime = new Date().toLocaleString();

    const systemMessage = `Jesteś specjalistą od podsumowywania wiadomości.
    Twoim zadaniem jest dostarczanie zwięzłych, rzeczowych i aktualnych podsumowań wiadomości z Polski na dzień ${updateTime}.
    Upewnij się, że żadne wiadomości się nie powtarzają. Odpowiadaj wyłącznie po polsku.
    Sformatuj odpowiedź jako tablicę JSON o nazwie 'news', gdzie każdy element posiada pola: title, summary oraz source.`;

    const userMessage = `Znajdź 6 najważniejszych bieżących wiadomości z UWAGA: Polski na dzień ${updateTime}. Dla każdej wiadomości podaj:
    - Jasny, chwytliwy tytuł
    - Podsumowanie w 2-3 zdaniach
    - Źródło publikacji (link)
    - Unikaj tematów politycznych, skandali partyjnych i sporów ideologicznych, wojen i konfliktów.
    - Skup się na różnorodnych tematach: gospodarce, kulturze, sporcie, nauce, technologii i wydarzeniach społecznych W POLSCE.`;

    const payload = {
      model: "sonar-pro",
      messages: [
        {
          role: "system",
          content: systemMessage,

        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: {
            type: "object",
            properties: {
              news: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    summary: { type: "string" },
                    source: { type: "string" },
                  },
                  required: ["title", "summary"],
                },
              },
            },
          },
        },
      },
    };

    const res = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(`Perplexity API request failed – ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as PerplexityResponse;
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content field returned from Perplexity API");
    }

    try {
      const parsed = JSON.parse(content) as { news?: NewsItem[] };
      return parsed.news?.slice(0, 6) || [];
    } catch (err) {
      console.error("Failed to parse Perplexity response", err);
      throw new Error("Invalid JSON returned from Perplexity");
    }
  }
}
