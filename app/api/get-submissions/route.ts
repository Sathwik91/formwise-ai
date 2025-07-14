import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET() {
  try {
    const snapshot = await db.collection('form_submissions').orderBy('createdAt', 'desc').get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ submissions: data });
  } catch (error: any) {
    console.error("Fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// This function handles GET requests to the /api/get-submissions endpoint.
// It retrieves all form submissions from Firebase Firestore,
// orders them by creation date, and returns them as JSON.
// If an error occurs, it returns a 500 status with the error message.