import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route to fetch restaurant promotions from Google Sheets via Apps Script
 * This allows dynamic updates from a Google Sheet without code changes
 * 
 * Usage:
 * GET /api/fetch-restaurant-promotions
 * 
 * Returns: { [restaurantName: string]: promotionText }
 */
export async function GET(request: NextRequest) {
  try {
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_PROMOTIONS_URL;

    // If no Apps Script URL is configured, return empty object
    // The code will fall back to the static file
    if (!GOOGLE_APPS_SCRIPT_URL) {
      console.log('Google Apps Script URL not configured for promotions, using fallback');
      return NextResponse.json(
        { success: false, promotions: {}, message: 'Apps Script not configured, use fallback' },
        { status: 200 }
      );
    }

    // Fetch promotions from Google Apps Script
    console.log('Fetching promotions from Google Apps Script:', GOOGLE_APPS_SCRIPT_URL);
    
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Apps Script error:', errorText);
      throw new Error(`Google Apps Script returned ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Promotions fetched successfully, count:', Object.keys(result.promotions || {}).length);

    return NextResponse.json(
      { 
        success: true, 
        promotions: result.promotions || {},
        message: 'Promotions fetched successfully' 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching restaurant promotions from Google Sheets:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    
    // Return empty object so code can fall back to static file
    return NextResponse.json(
      { 
        success: false, 
        promotions: {}, 
        error: error.message,
        message: 'Failed to fetch from Sheets, use fallback' 
      },
      { status: 200 }
    );
  }
}

