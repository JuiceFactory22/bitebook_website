import { NextRequest, NextResponse } from 'next/server';
import { restaurants } from '@/data/restaurants';

/**
 * API Route to generate a complete coupon book PDF
 * Fetches all restaurant promotions and combines them into one PDF document
 * 
 * Usage:
 * POST /api/generate-coupon-book
 * Body: { month, customerName?, customerEmail? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      month = 'January 2026',
      customerName = '',
      customerEmail = ''
    } = body;

    // Fetch all promotions from Google Sheets or use fallback
    let promotions: Record<string, string> = {};
    
    try {
      const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_PROMOTIONS_URL;
      if (GOOGLE_APPS_SCRIPT_URL) {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.promotions) {
            promotions = result.promotions;
          }
        }
      }
    } catch (error) {
      console.warn('Failed to fetch from Google Sheets, using fallback:', error);
    }
    
    // If no promotions from API, use fallback
    if (Object.keys(promotions).length === 0) {
      const { restaurantPromotions } = await import('@/data/restaurantPromotions');
      promotions = restaurantPromotions;
    }
    
    // Get all restaurants with promotions
    const availableRestaurants = restaurants
      .filter(restaurant => {
        const promotion = promotions[restaurant.name];
        return promotion && promotion.trim().length > 0;
      })
      .map(restaurant => ({
        ...restaurant,
        promotion: promotions[restaurant.name]
      }));

    if (availableRestaurants.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No restaurants with promotions found' },
        { status: 400 }
      );
    }

    // Generate HTML for the coupon book
    const html = generateCouponBookHTML(availableRestaurants, month, customerName, customerEmail);

    // Convert HTML to PDF using the same service as individual coupons
    try {
      const PDF_API_KEY = process.env.PDF_API_KEY;
      const PDF_SERVICE = process.env.PDF_SERVICE || 'pdfshift';

      if (PDF_API_KEY) {
        let pdfResponse;

        if (PDF_SERVICE === 'pdfshift') {
          pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${Buffer.from(`api:${PDF_API_KEY}`).toString('base64')}`,
            },
            body: JSON.stringify({
              source: html,
              format: 'A4',
              margin: '10mm',
              landscape: false,
            }),
          });
        } else if (PDF_SERVICE === 'api2pdf') {
          pdfResponse = await fetch('https://v2018.api2pdf.com/chrome/html', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': PDF_API_KEY,
            },
            body: JSON.stringify({
              html: html,
              inlinePdf: false,
              fileName: 'bitebook-coupon-book.pdf',
            }),
          });
        }

        if (pdfResponse && pdfResponse.ok) {
          const pdfBuffer = await pdfResponse.arrayBuffer();
          const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

          return NextResponse.json({
            success: true,
            pdfBase64: pdfBase64,
            format: 'pdf',
            count: availableRestaurants.length,
            html: html, // Include HTML for preview
          });
        }
      }
    } catch (pdfError) {
      console.error('PDF conversion error:', pdfError);
      // Fall through to HTML fallback
    }

    // Fallback: Return HTML as base64
    const base64 = Buffer.from(html).toString('base64');

    return NextResponse.json({
      success: true,
      pdfBase64: base64,
      format: 'html',
      count: availableRestaurants.length,
      html: html,
    });
  } catch (error: any) {
    console.error('Error generating coupon book:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

/**
 * Generate HTML for the complete coupon book
 */
function generateCouponBookHTML(
  restaurants: Array<{ name: string; image: string; promotion: string }>,
  month: string,
  customerName: string,
  customerEmail: string
): string {
  // Generate individual coupon HTML for each restaurant
  const couponPages = restaurants.map((restaurant, index) => {
    const promotionLines = restaurant.promotion.split('\n');
    const promotionHtml = promotionLines.map((line: string, lineIndex: number) => {
      if (lineIndex === 0) {
        return `<div style="font-size: 45px; font-weight: 900; color: #ff6b35; margin-bottom: 10px;">${line}</div>`;
      } else {
        return `<div style="font-size: 22px; color: #666; margin-top: 5px;">${line}</div>`;
      }
    }).join('');

    return `
      <div style="page-break-after: always; padding: 20px;">
        <div style="background: #ff0000; color: white; padding: 15px; text-align: center; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
          IT IS ILLEGAL TO COPY OR DUPLICATE THIS COUPON
        </div>
        
        <div style="background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%); color: white; padding: 40px; text-align: center; position: relative; border-radius: 20px 20px 0 0;">
          <h1 style="font-size: 48px; font-weight: 900; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">🍗 BiteBook</h1>
          <div style="font-size: 24px; font-weight: 600; opacity: 0.95;">COUPON BOOK</div>
        </div>
        
        <div style="padding: 60px 40px; text-align: center; background: white; border: 2px solid #ff6b35;">
          <div style="font-size: 36px; font-weight: bold; color: #ff6b35; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px;">
            ${restaurant.name.toUpperCase()}
          </div>
          
          <div style="margin: 30px 0;">
            ${promotionHtml}
          </div>
          
          <div style="background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%); color: white; padding: 30px; border-radius: 15px; margin: 40px 0; box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px; opacity: 0.9;">COUPON CODE</div>
            <div style="font-size: 48px; font-weight: 900; letter-spacing: 8px; font-family: 'Courier New', monospace; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">
              BITEBOOK${month.replace(/\s/g, '').substring(0, 6).toUpperCase()}
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #333; font-size: 18px; font-weight: 600;">
            Valid: ${month}
          </div>
        </div>
        
        <div style="background: #f9f9f9; padding: 30px; border-top: 3px dashed #ff6b35; margin-top: 0;">
          <h3 style="color: #333; font-size: 20px; margin-bottom: 15px; text-align: center;">Terms & Conditions</h3>
          <ul style="list-style: none; text-align: left; max-width: 600px; margin: 0 auto; padding: 0;">
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              One coupon per customer. Cannot be combined with other offers.
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              Valid for the specific promotion listed above (dine-in only - not valid for takeout unless specified).
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              Valid only at the participating restaurant listed above.
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              Coupon must be presented at time of purchase.
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              Valid for the month of ${month} only.
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              Not valid on holidays or special event days.
            </li>
            <li style="padding: 8px 0; color: #666; font-size: 14px; line-height: 1.6;">
              <span style="color: #ff6b35; font-weight: bold; margin-right: 10px;">✓</span>
              No cash value. Cannot be exchanged or refunded.
            </li>
          </ul>
        </div>
      </div>
    `;
  }).join('');

  // Combine all coupons into one document
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BiteBook Coupon Book - ${month}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: white;
        }
        
        .cover-page {
            page-break-after: always;
            background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
            color: white;
            padding: 80px 40px;
            text-align: center;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .cover-page h1 {
            font-size: 72px;
            font-weight: 900;
            margin-bottom: 20px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .cover-page .subtitle {
            font-size: 36px;
            font-weight: 600;
            margin-bottom: 40px;
            opacity: 0.95;
        }
        
        .cover-page .month {
            font-size: 48px;
            font-weight: 700;
            margin-bottom: 60px;
        }
        
        .cover-page .value {
            font-size: 32px;
            margin-top: 40px;
            opacity: 0.9;
        }
        
        .cover-page .customer-info {
            margin-top: 60px;
            padding-top: 40px;
            border-top: 2px solid rgba(255,255,255,0.3);
            font-size: 18px;
        }
    </style>
</head>
<body>
    <!-- Cover Page -->
    <div class="cover-page">
        <h1>🍗 BiteBook</h1>
        <div class="subtitle">COUPON BOOK</div>
        <div class="month">${month}</div>
        <div style="font-size: 24px; margin-top: 20px;">
            ${restaurants.length} Participating Restaurants
        </div>
        <div class="value">
            Over $300 in Savings
        </div>
        ${customerName || customerEmail ? `
        <div class="customer-info">
            ${customerName ? `<div><strong>Customer:</strong> ${customerName}</div>` : ''}
            ${customerEmail ? `<div style="margin-top: 10px;"><strong>Email:</strong> ${customerEmail}</div>` : ''}
        </div>
        ` : ''}
    </div>
    
    ${couponPages}
</body>
</html>`;
}

