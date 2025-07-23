import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Since external APIs might not work in sandbox, provide mock data
    // In production, you would uncomment the external API call below
    
    /*
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=thb&include_24hr_change=true',
      {
        next: { revalidate: 30 }, // Cache for 30 seconds
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
    */

    // Mock Bitcoin data for testing
    const basePrice = 2500000; // ~2.5M THB
    const variation = (Math.random() - 0.5) * 100000; // Random variation
    const change24h = (Math.random() - 0.5) * 6; // Random change between -3% and +3%

    return NextResponse.json({
      price: Math.round(basePrice + variation),
      change24h: Math.round(change24h * 100) / 100,
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
