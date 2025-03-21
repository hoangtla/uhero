import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    console.error('[WEBHOOK_ERROR]', error)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as any

  if (event.type === 'checkout.session.completed') {
    const orderId = session.metadata.orderId

    // Cập nhật trạng thái đơn hàng
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'PROCESSING' }
    })
  }

  return new NextResponse(null, { status: 200 })
} 