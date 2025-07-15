import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const { text } = await req.json();
  console.log("🎤 Received voice text:", text);

  if (!text || text.trim().length < 5) {
    return NextResponse.json({ error: "Voice input too short or invalid." }, { status: 400 });
  }

  const prompt = `
You are an AI assistant receiving a voice-transcribed user request from a rural or urban area. 
The person may mention their name, location, need, phone number, or extra notes in any order.

🎯 Extract structured data and return only a valid JSON object with these fields:
{
  "name": "",
  "village": "",
  "phone": "",
  "request": "",
  "notes": ""
}

📌 Rules:
- If a field is missing, leave it as an empty string ("").
- DO NOT return markdown, explanation, or anything other than raw valid JSON.
- Only output the JSON object, nothing else.

🗣 Message: "${text}"
  `.trim();

  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const baseDoc = {
    uploadType: "voice",
    createdAt: new Date().toISOString(),
    rawText: text,
  };

  try {
    const geminiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const json = await geminiRes.json();
    const raw = json.candidates?.[0]?.content?.parts?.[0]?.text || "";

    console.log("🧠 Gemini raw output:", raw);

    const cleanText = raw.replace(/```(json)?/gi, "").replace(/```/g, "").trim();
    const match = cleanText.match(/\{[\s\S]*\}/);

    if (!match) {
      await db.collection("form_submissions").add({
        ...baseDoc,
        rawResponse: raw,
        parsed: false,
        error: "No JSON match",
      });

      return NextResponse.json({ error: "AI could not parse your voice input." }, { status: 500 });
    }

    try {
      const parsedData = JSON.parse(match[0]);

      if (!parsedData || typeof parsedData !== "object") {
        throw new Error("Parsed data is not a valid object");
      }

      await db.collection("form_submissions").add({
        ...baseDoc,
        rawResponse: raw,
        ...parsedData,
        parsed: true,
      });

      return NextResponse.json(parsedData);
    } catch (err) {
      console.error("❌ JSON parse error:", err);
      await db.collection("form_submissions").add({
        ...baseDoc,
        rawResponse: raw,
        parsed: false,
        error: "Invalid JSON structure",
      });

      return NextResponse.json({ error: "Invalid JSON format from Gemini." }, { status: 500 });
    }
  } catch (error: any) {
    console.error("❌ Gemini API call failed:", error);
    return NextResponse.json(
      { error: "Gemini request failed", detail: error.message },
      { status: 500 }
    );
  }
}
// This code handles the POST request to parse voice input using Gemini AI. 