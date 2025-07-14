import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('pdf') as File;

    if (!file) {
      return NextResponse.json({ error: 'No PDF uploaded' }, { status: 400 });
    }

    // Convert PDF to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Pdf = buffer.toString('base64');

    const prompt = `
You are a smart PDF parsing AI. A user uploaded a base64-encoded PDF file. Decode and analyze it to extract clean structured data.

Instructions:
- The document may contain sections, tables, headings, and form fields.
- Detect the type (invoice, resume, certificate, form, etc.)
- Parse it into **minified valid JSON** without any explanation or markdown.
- If it's a table, structure it as an array of objects.
- Use camelCase keys. Ignore footers/headers.

Return only valid JSON. Example output:
{
  "documentType": "invoice",
  "vendor": "Acme Corp",
  "invoiceNumber": "12345",
  "items": [
    { "description": "Service A", "amount": 100 },
    { "description": "Service B", "amount": 50 }
  ],
  "total": 150,
  "date": "2024-06-01"
}
`;

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inlineData: { mimeType: 'application/pdf', data: base64Pdf } }
            ]
          }
        ]
      })
    });

    const geminiJson = await geminiRes.json();
    const rawOutput = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const baseDoc = {
      uploadType: 'pdf',
      createdAt: new Date().toISOString(),
      rawBase64: base64Pdf.slice(0, 300), // for debugging
      rawResponse: rawOutput
    };

    const match = rawOutput.match(/{[\s\S]*}/);

    if (!match) {
      await db.collection('form_submissions').add({
        ...baseDoc,
        parsed: false,
        error: 'No valid JSON detected in Gemini output'
      });

      return NextResponse.json({ raw: rawOutput, error: 'No structured JSON found' });
    }

    try {
      const parsed = JSON.parse(match[0]);

      await db.collection('form_submissions').add({
        ...baseDoc,
        ...parsed,
        parsed: true
      });

      return NextResponse.json(parsed);
    } catch (err) {
      await db.collection('form_submissions').add({
        ...baseDoc,
        parsed: false,
        error: 'JSON parse error'
      });

      return NextResponse.json({ raw: rawOutput, error: 'Could not parse JSON' });
    }
  } catch (error) {
    console.error('🧨 Gemini PDF base64 error:', error);
    return NextResponse.json({ error: 'Internal server error while parsing PDF.' }, { status: 500 });
  }
}
