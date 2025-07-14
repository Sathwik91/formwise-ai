import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  try {
    await db.collection('contact_submissions').add({
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });

    // Optional: Send email using EmailJS, Resend, or other SMTP
    // For now just simulate
    console.log(`📨 Contact request from ${name}: ${message}`);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
