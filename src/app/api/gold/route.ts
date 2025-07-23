import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Using an API that provides gold prices in THB
    // Note: You might need to replace this with a real gold price API
    // For demo purposes, I'll use a mock response that could be replaced with actual API
    
    // Example: Using a Thai gold price API or converting from USD
    const usdToThbResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const exchangeData = await usdToThbResponse.json();
    const usdToThb = exchangeData.rates.THB;

    // Mock gold price in USD per troy ounce (you should replace this with actual API)
    const goldPriceUsd = 2000 + (Math.random() - 0.5) * 100; // Mock fluctuation
    const goldPriceThb = goldPriceUsd * usdToThb;

    // Mock 24h change
    const change24h = (Math.random() - 0.5) * 4; // Random change between -2% and +2%

    return NextResponse.json({
      price: Math.round(goldPriceThb * 100) / 100,
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
