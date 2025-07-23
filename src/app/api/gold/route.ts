import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Since external APIs might not work in sandbox, provide mock data
    // In production, you would use a real gold price API
    
    /*
    const usdToThbResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeData = await usdToThbResponse.json();
    const usdToThb = exchangeData.rates.THB;

    const goldPriceUsd = 2000 + (Math.random() - 0.5) * 100;
    const goldPriceThb = goldPriceUsd * usdToThb;
    */

    // Mock gold price data
    const basePrice = 70000; // Base price in THB per troy ounce
    const variation = (Math.random() - 0.5) * 4000; // Random variation
    const change24h = (Math.random() - 0.5) * 4; // Random change between -2% and +2%

    return NextResponse.json({
      price: Math.round((basePrice + variation) * 100) / 100,
      change24h: Math.round(change24h * 100) / 100,
      currency: 'THB',
      unit: 'per troy ounce',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching gold price:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gold price' },
      { status: 500 }
    );
  }
}
