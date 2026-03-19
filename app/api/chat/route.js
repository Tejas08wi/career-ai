import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Meta-Llama-3-8B-Instruct",
          messages: [
            {
              role: "system",
              content: `
You are a backend career mentor.

Rules:
- Step-by-step roadmap
- Real projects
- No generic advice
              `,
            },
            ...messages,
          ],
        }),
      }
    );

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.log("RAW:", text);
      return NextResponse.json({
        reply: "Model is loading... try again.",
      });
    }

    console.log("HF:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "No response from AI";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      reply: "Something went wrong",
    });
  }
}