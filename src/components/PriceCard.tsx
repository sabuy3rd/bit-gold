'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Bitcoin, Coins } from 'lucide-react';

interface PriceCardProps {
  title: string;
  price: number;
  change24h?: number; // Made optional
  currency: string;
  icon: 'bitcoin' | 'gold';
  unit?: string;
}

export default function PriceCard({ 
  title, 
  price, 
  change24h = 0, // Default value to prevent undefined errors
  icon,
  unit 
}: PriceCardProps) {
  const isPositive = change24h >= 0;
  const IconComponent = icon === 'bitcoin' ? Bitcoin : Coins;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <IconComponent className="h-4 w-4" />
          {title}
        </CardTitle>
        <Badge 
          variant={isPositive ? "default" : "destructive"}
          className="text-xs"
        >
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {isPositive ? '+' : ''}{change24h.toFixed(2)}%
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {formatPrice(price)}
        </div>
        {unit && (
          <p className="text-xs text-muted-foreground mt-1">
            {unit}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          24h เปลี่ยนแปลง: {isPositive ? '+' : ''}{change24h.toFixed(2)}%
        </p>
      </CardContent>
    </Card>
  );
}
