import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol') || 'bitcoin';
  const timeframe = searchParams.get('timeframe') || 'daily';
  const days = searchParams.get('days');
  const hours = searchParams.get('hours');

  try {
    if (symbol === 'bitcoin') {
      // Since external APIs might not work in sandbox, generate mock data
      // In production, you would use the real CoinGecko API
      
      const now = Date.now();
      const prices = [];
      
      if (timeframe === 'minute' && hours) {
        // Generate minute-level data for the specified hours
        const hoursNum = parseInt(hours) || 6;
        const basePrice = 2500000; // Base price in THB (~2.5M)
        const minuteMs = 60 * 1000;
        const totalMinutes = hoursNum * 60;
        
        for (let i = totalMinutes; i >= 0; i -= 5) { // Every 5 minutes
          const timestamp = now - (i * minuteMs);
          const variation = (Math.random() - 0.5) * 50000; // Small variation for realistic minute data
          const price = basePrice + variation;
          prices.push([timestamp, price]);
        }
      } else {
        // Generate daily data as fallback
        const daysNum = parseInt(days || '7');
        const dayMs = 24 * 60 * 60 * 1000;
        const basePrice = 2500000;
        
        for (let i = daysNum; i >= 0; i--) {
          const timestamp = now - (i * dayMs);
          const variation = (Math.random() - 0.5) * 200000;
          const price = basePrice + variation;
          prices.push([timestamp, price]);
        }
      }
      
      return NextResponse.json({
        prices,
        market_caps: prices.map(([time, price]) => [time, price * 1000000]),
        total_volumes: prices.map(([time, price]) => [time, price * 10000]),
      });
      
      /*
      // Original external API code (disabled for sandbox)
      if (timeframe === 'minute' && hours) {
        const hoursNum = parseInt(hours) || 6;
        const days = Math.max(1, Math.ceil(hoursNum / 24));
        apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=thb&days=${days}&interval=daily`;
      } else {
        const daysParam = days || '7';
        apiUrl = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=thb&days=${daysParam}`;
      }
      */
    } else if (symbol === 'gold') {
      // For gold, we'll create mock data based on timeframe
      const now = Date.now();
      const prices = [];
      
      if (timeframe === 'minute' && hours) {
        // Generate minute-level data for the specified hours
        const hoursNum = parseInt(hours) || 6;
        const basePrice = 70000; // Base price in THB
        const minuteMs = 60 * 1000;
        const totalMinutes = hoursNum * 60;
        
        for (let i = totalMinutes; i >= 0; i -= 5) { // Every 5 minutes
          const timestamp = now - (i * minuteMs);
          const variation = (Math.random() - 0.5) * 500; // Smaller variation for minute data
          const price = basePrice + variation;
          prices.push([timestamp, price]);
        }
      } else {
        // Generate daily data as before
        const daysNum = parseInt(days || '7');
        const dayMs = 24 * 60 * 60 * 1000;
        const basePrice = 70000;
        
        for (let i = daysNum; i >= 0; i--) {
          const timestamp = now - (i * dayMs);
          const variation = (Math.random() - 0.5) * 2000;
          const price = basePrice + variation;
          prices.push([timestamp, price]);
        }
      }
      
      return NextResponse.json({
        prices,
        market_caps: prices.map(([time, price]) => [time, price * 1000000]),
        total_volumes: prices.map(([time, price]) => [time, price * 10000]),
      });
    }

    // This code should never be reached since we handle both bitcoin and gold above
    return NextResponse.json({ error: 'Unsupported symbol' }, { status: 400 });
  } catch (error) {
    console.error(`Error fetching ${symbol} historical data:`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${symbol} historical data` },
      { status: 500 }
    );
  }
}
