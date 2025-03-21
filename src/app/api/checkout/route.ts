import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await auth()
    
    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { items } = body

    if (!items || items.length === 0) {
      return new NextResponse('Items are required', { status: 400 })
    }

    // Tạo line items cho Stripe
    const line_items = await Promise.all(
      items.map(async (item: any) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })

        if (!product) {
          throw new Error(`Product not found: ${item.productId}`)
        }

        return {
          price_data: {
            currency: 'vnd',
            product_data: {
              name: product.name,
              images: [product.mainImage],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity,
        }
      })
    )

    // Tạo order trong database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        total: items.reduce((acc: number, item: any) => {
          return acc + (item.price * item.quantity)
        }, 0),
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    })

    // Tạo Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.NEXTAUTH_URL}/order/success?orderId=${order.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
      metadata: {
        orderId: order.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('[CHECKOUT_ERROR]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 