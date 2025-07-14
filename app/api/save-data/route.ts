// app/api/save-data/route.ts
import { db } from '../../../lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const docRef = await db.collection('form_submissions').add({
      ...data,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error: any) {
    console.error('Firebase error:', error);
    return NextResponse.json({ error: 'Failed to save data', detail: error.message }, { status: 500 });
  }
}
// This function handles POST requests to the /api/save-data endpoint.
// It saves form submission data to Firebase Firestore.