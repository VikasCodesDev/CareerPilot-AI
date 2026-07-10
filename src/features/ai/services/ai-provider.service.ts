import type { AIProviderResult, AIWorkflowRequest } from "@/features/ai/types";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const GEMINI_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function hasUsableKey(value: string | undefined): value is string {
  return Boolean(value && !value.includes("placeholder") && value.length > 12);
}

export class AIProviderService {
  static async execute(request: AIWorkflowRequest): Promise<AIProviderResult> {
    const groqKey = process.env.GROQ_API_KEY;
    if (hasUsableKey(groqKey)) {
      const result = await this.callGroq(request, groqKey);
      if (result.status === "success") return result;
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (hasUsableKey(geminiKey)) {
      const result = await this.callGemini(request, geminiKey);
      if (result.status === "success") return result;
    }

    return {
      provider: "deterministic",
      status: "fallback",
      content: this.createDeterministicProviderContent(request),
      executionTimeMs: 0,
    };
  }

  private static async callGroq(request: AIWorkflowRequest, apiKey: string): Promise<AIProviderResult> {
    const started = Date.now();
    try {
      const response = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                "You are CareerPilot AI. Return concise JSON-style career planning guidance. Never guarantee jobs.",
            },
            {
              role: "user",
              content: `Goal: ${request.goal}\nRequest: ${request.request}`,
            },
          ],
          temperature: 0.2,
        }),
      });
      if (!response.ok) throw new Error("Groq request failed.");
      const payload = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };

      return {
        provider: "groq",
        status: "success",
        content: payload.choices?.[0]?.message?.content ?? "",
        executionTimeMs: Date.now() - started,
      };
    } catch {
      return {
        provider: "groq",
        status: "failed",
        content: "",
        executionTimeMs: Date.now() - started,
      };
    }
  }

  private static async callGemini(request: AIWorkflowRequest, apiKey: string): Promise<AIProviderResult> {
    const started = Date.now();
    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `CareerPilot AI JSON guidance. Goal: ${request.goal}. Request: ${request.request}`,
                },
              ],
            },
          ],
        }),
      });
      if (!response.ok) throw new Error("Gemini request failed.");
      const payload = (await response.json()) as {
        candidates?: { content?: { parts?: { text?: string }[] } }[];
      };

      return {
        provider: "gemini",
        status: "success",
        content: payload.candidates?.[0]?.content?.parts?.[0]?.text ?? "",
        executionTimeMs: Date.now() - started,
      };
    } catch {
      return {
        provider: "gemini",
        status: "failed",
        content: "",
        executionTimeMs: Date.now() - started,
      };
    }
  }

  private static createDeterministicProviderContent(request: AIWorkflowRequest): string {
    return `Deterministic execution for ${request.goal}: ${request.request}`;
  }
}
