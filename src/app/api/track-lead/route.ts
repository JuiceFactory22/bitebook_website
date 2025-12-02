import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  email: string;
  phone: string;
  source?: string; // 'homepage' or 'spin-wheel'
  restaurant_name?: string; // For spin wheel submissions
  timestamp?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();
    const { email, phone, source = 'homepage', restaurant_name } = data;

    // Validate required fields
    if (!email || !phone) {
      return NextResponse.json(
        { error: 'Email and phone are required' },
        { status: 400 }
      );
    }

    // Get Google Apps Script URL from environment variables
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.error('Google Apps Script URL not configured');
      // Don't fail the request - just log the error
      // The form submission will still work, just won't track to sheets
      return NextResponse.json(
        { success: true, message: 'Lead tracked (Google Sheets not configured)' },
        { status: 200 }
      );
    }

    // Send data to Google Apps Script web app
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        source,
        restaurant_name: restaurant_name || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(
      { success: true, message: 'Lead tracked successfully', result },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error tracking lead to Google Sheets:', error);
    // Don't fail the request - return success so form submission still works
    return NextResponse.json(
      { success: true, message: 'Lead tracked (with error logging)' },
      { status: 200 }
    );
  }
}

