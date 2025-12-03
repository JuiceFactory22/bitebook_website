import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route to generate a coupon as base64 encoded HTML
 * This can be passed directly to EmailJS as an attachment
 * 
 * Usage:
 * POST /api/generate-coupon-base64
 * Body: { restaurant, code, email, phone, month }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      restaurant = 'Participating Restaurant',
      code = 'BITEBOOKWINGS',
      email = '',
      phone = '',
      month = 'January 2026'
    } = body;

    // Format phone number for display
    let formattedPhone = '';
    if (phone) {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length === 10) {
        formattedPhone = `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
      } else {
        formattedPhone = phone;
      }
    }

    // Generate HTML coupon
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BiteBook Free Wings Coupon</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            background: white;
            padding: 20px;
        }
        
        .coupon {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        }
        
        .coupon-header {
            background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
        }
        
        .coupon-header::before {
            content: '';
            position: absolute;
            bottom: -20px;
            left: 0;
            right: 0;
            height: 40px;
            background: white;
            border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        
        .coupon-header h1 {
            font-size: 48px;
            font-weight: 900;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .coupon-header .subtitle {
            font-size: 24px;
            font-weight: 600;
            opacity: 0.95;
        }
        
        .coupon-body {
            padding: 60px 40px;
            text-align: center;
        }
        
        .restaurant-name {
            font-size: 36px;
            font-weight: bold;
            color: #ff6b35;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .offer {
            font-size: 64px;
            font-weight: 900;
            color: #ff6b35;
            margin: 30px 0;
            line-height: 1.2;
        }
        
        .offer-small {
            font-size: 32px;
            color: #666;
            margin-top: 10px;
        }
        
        .coupon-code-box {
            background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin: 40px 0;
            box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
        }
        
        .coupon-code-label {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        
        .coupon-code {
            font-size: 48px;
            font-weight: 900;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        
        .terms {
            background: #f9f9f9;
            padding: 30px;
            border-top: 3px dashed #ff6b35;
            margin-top: 40px;
        }
        
        .terms h3 {
            color: #333;
            font-size: 20px;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .terms ul {
            list-style: none;
            text-align: left;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .terms li {
            padding: 8px 0;
            color: #666;
            font-size: 14px;
            line-height: 1.6;
        }
        
        .terms li::before {
            content: '✓ ';
            color: #ff6b35;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .validity {
            text-align: center;
            margin-top: 20px;
            color: #333;
            font-size: 18px;
            font-weight: 600;
        }
        
        .customer-info {
            background: #f0f0f0;
            padding: 20px;
            border-radius: 10px;
            margin: 30px 0;
            text-align: left;
        }
        
        .customer-info h4 {
            color: #333;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .customer-info p {
            color: #666;
            font-size: 14px;
            margin: 5px 0;
            padding-left: 20px;
        }
        
        .customer-info p::before {
            content: '📧 ';
            margin-right: 5px;
        }
        
        .customer-info p:last-child::before {
            content: '📱 ';
        }
        
        .barcode-area {
            background: white;
            padding: 20px;
            text-align: center;
            border-top: 2px solid #eee;
        }
        
        .barcode-placeholder {
            display: inline-block;
            width: 200px;
            height: 60px;
            background: repeating-linear-gradient(
                90deg,
                #000 0px,
                #000 2px,
                transparent 2px,
                transparent 4px
            );
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <div class="coupon">
        <div class="coupon-header">
            <h1>🍗 BiteBook</h1>
            <div class="subtitle">FREE WINGS COUPON</div>
        </div>
        
        <div class="coupon-body">
            <div class="restaurant-name">${restaurant.toUpperCase()}</div>
            
            <div class="offer">
                6 FREE WINGS
                <div class="offer-small">at participating location</div>
            </div>
            
            <div class="coupon-code-box">
                <div class="coupon-code-label">COUPON CODE</div>
                <div class="coupon-code">${code}</div>
            </div>
            
            <div class="validity">
                Valid: ${month}
            </div>
            
            ${email || phone ? `
            <div class="customer-info">
                <h4>Customer Information</h4>
                ${email ? `<p>${email}</p>` : ''}
                ${formattedPhone ? `<p>${formattedPhone}</p>` : ''}
            </div>
            ` : ''}
        </div>
        
        <div class="terms">
            <h3>Terms & Conditions</h3>
            <ul>
                <li>One coupon per customer. Cannot be combined with other offers.</li>
                <li>Valid for 6 free wings (dine-in or takeout).</li>
                <li>Valid only at the participating restaurant listed above.</li>
                <li>Coupon must be presented at time of purchase.</li>
                <li>Valid for the month of ${month} only.</li>
                <li>Not valid on holidays or special event days.</li>
                <li>No cash value. Cannot be exchanged or refunded.</li>
            </ul>
        </div>
        
        <div class="barcode-area">
            <div class="barcode-placeholder"></div>
            <div style="font-size: 12px; color: #999; margin-top: 5px;">Present this coupon at checkout</div>
        </div>
    </div>
</body>
</html>`;

    // Convert HTML to base64
    const base64 = Buffer.from(html).toString('base64');

    return NextResponse.json({
      success: true,
      html: html,
      base64: base64,
      dataUri: `data:text/html;base64,${base64}`
    });
  } catch (error: any) {
    console.error('Error generating coupon:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

