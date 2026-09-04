import { NextRequest, NextResponse } from 'next/server';

const metroPincodePrefixes = ['11', '40', '56', '70', '60', '50', '41'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pincode, city } = body;

    if (!pincode || pincode.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid 6-digit pincode.' },
        { status: 400 }
      );
    }

    const prefix = pincode.substring(0, 2);
    const isExpress = metroPincodePrefixes.includes(prefix);

    return NextResponse.json({
      success: true,
      data: {
        pincode,
        city: city || 'New Delhi',
        expressAvailable: isExpress,
        estimatedDays: isExpress ? 'Express 4 Hours' : 'Standard 2-3 Business Days',
        freeDeliveryEligible: true,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload.' },
      { status: 400 }
    );
  }
}
