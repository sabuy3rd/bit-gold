'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PriceCard from '@/components/PriceCard';
import PriceChart from '@/components/PriceChart';

interface PriceData {
  price: number;
  change24h: number;
  currency: string;
  unit?: string;
  timestamp: string;
}

interface HistoricalData {
  prices: Array<[number, number]>;
}

export default function Home() {
  const [bitcoinPrice, setBitcoinPrice] = useState<PriceData | null>(null);
  const [goldPrice, setGoldPrice] = useState<PriceData | null>(null);
  const [bitcoinChart, setBitcoinChart] = useState<HistoricalData | null>(null);
  const [goldChart, setGoldChart] = useState<HistoricalData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const [bitcoinRes, goldRes, bitcoinHistRes, goldHistRes] = await Promise.all([
        fetch('/api/bitcoin'),
        fetch('/api/gold'),
        fetch('/api/historical?symbol=bitcoin&days=7'),
        fetch('/api/historical?symbol=gold&days=7'),
      ]);

      const [bitcoinData, goldData, bitcoinHistData, goldHistData] = await Promise.all([
        bitcoinRes.json(),
        goldRes.json(),
        bitcoinHistRes.json(),
        goldHistRes.json(),
      ]);

      setBitcoinPrice(bitcoinData);
      setGoldPrice(goldData);
      setBitcoinChart(bitcoinHistData);
      setGoldChart(goldHistData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">BitGold Thailand</h1>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              อัพเดท
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            ราคาทองคำและ Bitcoin เป็นเงินบาท
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {bitcoinPrice && (
            <PriceCard
              title="Bitcoin"
              price={bitcoinPrice.price}
              change24h={bitcoinPrice.change24h}
              currency={bitcoinPrice.currency}
              icon="bitcoin"
            />
          )}
          {goldPrice && (
            <PriceCard
              title="ทองคำ"
              price={goldPrice.price}
              change24h={goldPrice.change24h}
              currency={goldPrice.currency}
              unit={goldPrice.unit}
              icon="gold"
            />
          )}
        </div>

        {/* Charts */}
        <Tabs defaultValue="bitcoin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bitcoin">กราฟ Bitcoin</TabsTrigger>
            <TabsTrigger value="gold">กราฟทองคำ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bitcoin" className="mt-4">
            {bitcoinChart && (
              <PriceChart
                data={bitcoinChart.prices}
                title="Bitcoin"
                color="#f7931a"
              />
            )}
          </TabsContent>
          
          <TabsContent value="gold" className="mt-4">
            {goldChart && (
              <PriceChart
                data={goldChart.prices}
                title="ทองคำ"
                color="#ffd700"
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Last Updated */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            อัพเดทล่าสุด: {bitcoinPrice ? new Date(bitcoinPrice.timestamp).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) : '-'}
          </p>
        </div>
      </main>
    </div>
  );
}
