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

    // Get Google Sheets credentials from environment variables
    const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!GOOGLE_SHEETS_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.error('Google Sheets credentials not configured');
      // Don't fail the request - just log the error
      // The form submission will still work, just won't track to sheets
      return NextResponse.json(
        { success: true, message: 'Lead tracked (Google Sheets not configured)' },
        { status: 200 }
      );
    }

    // Prepare data for Google Sheets
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      email,
      phone,
      source,
      restaurant_name || '',
    ];

    // Use Google Sheets API to append row
    const { google } = await import('googleapis');
    const auth = new google.auth.JWT(
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Append row to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:E', // Adjust range as needed
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    return NextResponse.json(
      { success: true, message: 'Lead tracked successfully' },
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

