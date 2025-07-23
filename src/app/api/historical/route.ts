import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'bitcoin';
  const days = searchParams.get('days') || '7';

  try {
    let apiUrl = '';
    
    if (symbol === 'bitcoin') {
      apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=thb&days=${days}`;
    } else if (symbol === 'gold') {
      // For gold, we'll create mock historical data
      // In a real app, you'd use a proper gold price API
      const now = Date.now();
      const dayMs = 24 * 60 * 60 * 1000;
      const basePrice = 70000; // Base price in THB
      
      const prices = [];
      for (let i = parseInt(days); i >= 0; i--) {
        const timestamp = now - (i * dayMs);
        const variation = (Math.random() - 0.5) * 2000; // Random variation
        const price = basePrice + variation;
        prices.push([timestamp, price]);
      }
      
      return NextResponse.json({
        prices,
        market_caps: prices.map(([time, price]) => [time, price * 1000000]), // Mock market cap
        total_volumes: prices.map(([time, price]) => [time, price * 10000]), // Mock volume
      });
    }

    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${symbol} historical data`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching ${symbol} historical data:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${symbol} historical data` },
      { status: 500 }
    );
  }
}
