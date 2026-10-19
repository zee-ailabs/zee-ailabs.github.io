/*
  Optional: let the portfolio assistant answer with a large language model.

  Deploy this as a Cloudflare Worker (free tier is enough), then put the Worker URL in
  content.js under assistant.endpoint. The site keeps working without it: if the endpoint
  fails, the built-in assistant answers instead.

  Worker settings (Settings > Variables):
    ANTHROPIC_API_KEY   your API key (add it as a secret, never in the website code)
    MODEL               a current model ID from https://docs.claude.com
    ALLOWED_ORIGIN      https://zee-ailabs.github.io
*/
export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405, headers: cors });

    let body;
    try { body = await request.json(); } catch (e) { return new Response("Bad request", { status: 400, headers: cors }); }
    const question = String(body.question || "").slice(0, 500);
    const context = String(body.context || "").slice(0, 12000);
    if (!question) return new Response("Bad request", { status: 400, headers: cors });

    const system =
      "You are the portfolio assistant for Muhammad Zaigham, an AI Product Manager in Milton, Ontario, Canada. " +
      "Answer only from the portfolio context below, in a warm, concise, professional tone, in the third person. " +
      "Keep answers under 120 words. Never use em dashes. If the answer is not in the context, say so and suggest emailing him. " +
      "Do not discuss salary, immigration or personal matters; suggest contacting him directly.\n\nPORTFOLIO CONTEXT:\n" + context;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: env.MODEL, max_tokens: 400, system, messages: [{ role: "user", content: question }] })
    });
    if (!res.ok) return new Response(JSON.stringify({ error: "upstream" }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    const data = await res.json();
    const answer = (data.content || []).map((c) => c.text || "").join("").trim();
    return new Response(JSON.stringify({ answer }), { headers: { ...cors, "Content-Type": "application/json" } });
  }
};
