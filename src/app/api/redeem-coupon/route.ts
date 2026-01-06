import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route to redeem a coupon via QR code scan
 * 
 * Usage:
 * POST /api/redeem-coupon
 * Body: { redemptionId, restaurantName, couponCode }
 * 
 * Returns:
 * - First redemption: { success: true, redeemed: true, status: 'redeemed', color: 'green' }
 * - Already redeemed: { success: true, redeemed: true, alreadyRedeemed: true, status: 'already_redeemed', color: 'red' }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      redemptionId,
      restaurantName,
      couponCode,
      customerName = '',
      customerEmail = ''
    } = body;

    if (!redemptionId || !restaurantName || !couponCode) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Google Apps Script URL for redemption tracking
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_REDEMPTIONS_URL;

    if (!GOOGLE_APPS_SCRIPT_URL) {
      // If no tracking URL, still return success but log warning
      console.warn('Redemption tracking not configured');
      return NextResponse.json({
        success: true,
        redeemed: true,
        status: 'redeemed',
        color: 'green',
        message: 'Coupon redeemed (tracking not configured)',
        redemptionId
      });
    }

    // Check if already redeemed and track new redemption
    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redemptionId,
          restaurantName,
          couponCode,
          customerName,
          customerEmail,
          timestamp: new Date().toISOString(),
          action: 'redeem' // Tell the script to check and record redemption
        }),
      });

      if (response.ok) {
        const result = await response.json();
        
        // Check if the coupon was already redeemed
        if (result.alreadyRedeemed) {
          return NextResponse.json({
            success: true,
            redeemed: true,
            alreadyRedeemed: true,
            status: 'already_redeemed',
            color: 'red',
            message: 'This coupon has already been redeemed',
            redemptionId,
            firstRedeemedAt: result.firstRedeemedAt
          });
        }
        
        // First time redemption - return green success
        return NextResponse.json({
          success: true,
          redeemed: true,
          alreadyRedeemed: false,
          status: 'redeemed',
          color: 'green',
          message: 'Coupon redeemed successfully',
          redemptionId,
          result
        });
      }
    } catch (error) {
      console.error('Error tracking redemption:', error);
      // Still return success even if tracking fails
    }

    // Fallback: assume first redemption if tracking fails
    return NextResponse.json({
      success: true,
      redeemed: true,
      status: 'redeemed',
      color: 'green',
      message: 'Coupon redeemed',
      redemptionId
    });
  } catch (error: any) {
    console.error('Error redeeming coupon:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Check if a coupon has been redeemed (without redeeming it)
 * 
 * Usage:
 * GET /api/redeem-coupon?redemptionId=XXX
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const redemptionId = searchParams.get('redemptionId');

    if (!redemptionId) {
      return NextResponse.json(
        { success: false, error: 'Missing redemptionId' },
        { status: 400 }
      );
    }

    // Get Google Apps Script URL for redemption tracking
    const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_REDEMPTIONS_URL;

    if (!GOOGLE_APPS_SCRIPT_URL) {
      return NextResponse.json({
        success: true,
        redeemed: false,
        redemptionId
      });
    }

    // Check redemption status from Google Sheets
    try {
      const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL}?action=check&redemptionId=${encodeURIComponent(redemptionId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        return NextResponse.json({
          success: true,
          redeemed: result.redeemed || false,
          redemptionId,
          firstRedeemedAt: result.firstRedeemedAt
        });
      }
    } catch (error) {
      console.error('Error checking redemption status:', error);
    }

    return NextResponse.json({
      success: true,
      redeemed: false,
      redemptionId
    });
  } catch (error: any) {
    console.error('Error checking redemption status:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

