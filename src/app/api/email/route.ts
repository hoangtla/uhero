import { NextResponse } from 'next/server';
import { sendWelcomeEmail, sendOrderConfirmation, sendPasswordReset } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    switch (type) {
      case 'welcome':
        const welcomeResult = await sendWelcomeEmail(data.email, data.name);
        return NextResponse.json(welcomeResult);

      case 'order_confirmation':
        const orderResult = await sendOrderConfirmation(
          data.email,
          data.orderNumber,
          data.items
        );
        return NextResponse.json(orderResult);

      case 'password_reset':
        const resetResult = await sendPasswordReset(data.email, data.resetToken);
        return NextResponse.json(resetResult);

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 