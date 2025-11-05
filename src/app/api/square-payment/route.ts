import { NextRequest, NextResponse } from 'next/server';
import { Client, Environment } from 'squareup';

// Initialize Square client
const squareClient = new Client({
  environment: process.env.SQUARE_ENVIRONMENT === 'production' 
    ? Environment.Production 
    : Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN || '',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, amount, idempotencyKey, customerInfo } = body;

    // Validate required fields
    if (!sourceId || !amount || !idempotencyKey) {
      return NextResponse.json(
        { error: 'Missing required payment information' },
        { status: 400 }
      );
    }

    // Convert amount to cents (Square requires amounts in cents)
    const amountMoney = {
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'USD',
    };

    // Create payment request
    const paymentsApi = squareClient.paymentsApi;
    const paymentRequest = {
      sourceId,
      idempotencyKey,
      amountMoney,
      buyerEmailAddress: customerInfo?.email,
      note: `BiteBook Purchase - ${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`,
    };

    // Process payment
    const { result } = await paymentsApi.createPayment(paymentRequest);

    if (result.payment) {
      return NextResponse.json({
        success: true,
        paymentId: result.payment.id,
        status: result.payment.status,
      });
    } else {
      return NextResponse.json(
        { error: 'Payment processing failed' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Square payment error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment processing failed' },
      { status: 500 }
    );
  }
}
