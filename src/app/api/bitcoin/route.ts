import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // CoinGecko API for Bitcoin price in THB
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=thb&include_24hr_change=true',
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch Bitcoin price');
    }

    const data = await response.json();
    const bitcoinData = data.bitcoin;

    return NextResponse.json({
      price: bitcoinData.thb,
      change24h: bitcoinData.thb_24h_change,
      currency: 'THB',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Bitcoin price' },
      { status: 500 }
    );
  }
}
