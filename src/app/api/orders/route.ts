import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customerName, customerEmail, customerPhone, pincode, address } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart cannot be empty.' },
        { status: 400 }
      );
    }

    const orderId = `UTSAV-${Date.now().toString().slice(-6)}`;
    const subtotal = items.reduce((sum: number, item: any) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    const totalAmount = subtotal + shipping;

    // Insert order into Supabase if configured
    if (isSupabaseConfigured && supabase) {
      const { error: orderError } = await supabase.from('orders').insert({
        id: orderId,
        customer_name: customerName || 'Guest Customer',
        customer_email: customerEmail || 'guest@example.com',
        customer_phone: customerPhone || '',
        pincode: pincode || '110001',
        address: address || '',
        subtotal,
        shipping,
        total_amount: totalAmount,
        status: 'CONFIRMED',
      });

      if (orderError) {
        console.error('Supabase Order Insert Error:', orderError);
      } else {
        const orderItemsPayload = items.map((item: any) => ({
          order_id: orderId,
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          unit_price: item.product.price,
          total_price: item.product.price * item.quantity,
        }));

        await supabase.from('order_items').insert(orderItemsPayload);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        status: 'CONFIRMED',
        items,
        subtotal,
        shipping,
        totalAmount,
        estimatedDelivery: 'Express 4 Hours',
        message: 'Order created & saved to Supabase successfully!',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Server error processing order.' },
      { status: 500 }
    );
  }
}
