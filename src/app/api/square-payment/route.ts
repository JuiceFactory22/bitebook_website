import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if Square credentials are available
    if (!process.env.SQUARE_ACCESS_TOKEN) {
      console.error('SQUARE_ACCESS_TOKEN is not set');
      return NextResponse.json(
        { error: 'Square payment credentials not configured on server' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { sourceId, amount, idempotencyKey, customerInfo } = body;

    // Validate required fields
    if (!sourceId || !amount || !idempotencyKey) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Use Square REST API directly (more reliable than SDK)
    const isProduction = process.env.SQUARE_ENVIRONMENT === 'production';
    const baseUrl = isProduction 
      ? 'https://connect.squareup.com' 
      : 'https://connect.squareupsandbox.com';

    // Convert amount to cents (Square requires amounts in cents)
    const amountMoney = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'USD',
    };

    // Create payment request
    const paymentRequest = {
      source_id: sourceId,
      idempotency_key: idempotencyKey,
      amount_money: amountMoney,
      buyer_email_address: customerInfo?.email,
      note: `BiteBook Purchase - ${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`,
    };

    // Process payment via Square REST API
    const response = await fetch(`${baseUrl}/v2/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2023-10-18',
        'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentRequest),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Square API error:', result);
      return NextResponse.json(
        { 
          error: result.errors?.[0]?.detail || 'Payment processing failed',
          details: result.errors
        },
        { status: response.status }
      );
    }

    if (result.payment) {
      return NextResponse.json({
        success: true,
        paymentId: result.payment.id,
        status: result.payment.status,
      });
    } else {
      return NextResponse.json(
        { error: 'Payment processing failed', details: result },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Square payment error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    
    // Return proper JSON error response
    return NextResponse.json(
      { 
        error: error.message || 'Payment processing failed',
        details: error.response?.body || error.body || 'Unknown error'
      },
      { status: 500 }
    );
  }
}
