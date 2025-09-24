import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "2023-01", "Pre-Suit": 8500000, "Pre-Judg": 12000000, "Post-Judg": 4500000 },
  { month: "2023-02", "Pre-Suit": 9200000, "Pre-Judg": 11500000, "Post-Judg": 5200000 },
  { month: "2023-03", "Pre-Suit": 8800000, "Pre-Judg": 13200000, "Post-Judg": 4800000 },
  { month: "2023-04", "Pre-Suit": 10100000, "Pre-Judg": 12800000, "Post-Judg": 5500000 },
  { month: "2023-05", "Pre-Suit": 9600000, "Pre-Judg": 14100000, "Post-Judg": 4700000 },
  { month: "2023-06", "Pre-Suit": 11200000, "Pre-Judg": 13500000, "Post-Judg": 6100000 },
  { month: "2023-07", "Pre-Suit": 10800000, "Pre-Judg": 12700000, "Post-Judg": 5800000 },
  { month: "2023-08", "Pre-Suit": 9900000, "Pre-Judg": 13900000, "Post-Judg": 5300000 },
  { month: "2023-09", "Pre-Suit": 10500000, "Pre-Judg": 14600000, "Post-Judg": 5900000 },
  { month: "2023-10", "Pre-Suit": 11800000, "Pre-Judg": 15200000, "Post-Judg": 6400000 },
  { month: "2023-11", "Pre-Suit": 10700000, "Pre-Judg": 13800000, "Post-Judg": 5600000 },
  { month: "2023-12", "Pre-Suit": 12100000, "Pre-Judg": 16800000, "Post-Judg": 7200000 },
  { month: "2024-01", "Pre-Suit": 9800000, "Pre-Judg": 14900000, "Post-Judg": 5700000 },
  { month: "2024-02", "Pre-Suit": 11300000, "Pre-Judg": 15600000, "Post-Judg": 6300000 },
  { month: "2024-03", "Pre-Suit": 10900000, "Pre-Judg": 13400000, "Post-Judg": 6000000 },
  { month: "2024-04", "Pre-Suit": 9700000, "Pre-Judg": 12900000, "Post-Judg": 5400000 },
  { month: "2024-05", "Pre-Suit": 8900000, "Pre-Judg": 11800000, "Post-Judg": 4900000 },
  { month: "2024-06", "Pre-Suit": 7800000, "Pre-Judg": 10500000, "Post-Judg": 4200000 },
  { month: "2024-07", "Pre-Suit": 6900000, "Pre-Judg": 9200000, "Post-Judg": 3800000 },
  { month: "2024-08", "Pre-Suit": 5800000, "Pre-Judg": 7900000, "Post-Judg": 3100000 },
  { month: "2024-09", "Pre-Suit": 4700000, "Pre-Judg": 6800000, "Post-Judg": 2600000 },
  { month: "2025-01", "Pre-Suit": 3200000, "Pre-Judg": 4500000, "Post-Judg": 1800000 },
  { month: "2025-02", "Pre-Suit": 2800000, "Pre-Judg": 3900000, "Post-Judg": 1500000 },
  { month: "2025-03", "Pre-Suit": 2400000, "Pre-Judg": 3200000, "Post-Judg": 1200000 },
  { month: "2025-04", "Pre-Suit": 1900000, "Pre-Judg": 2600000, "Post-Judg": 900000 },
  { month: "2025-05", "Pre-Suit": 1500000, "Pre-Judg": 2100000, "Post-Judg": 700000 },
  { month: "2025-06", "Pre-Suit": 1200000, "Pre-Judg": 1700000, "Post-Judg": 500000 },
  { month: "2025-07", "Pre-Suit": 900000, "Pre-Judg": 1300000, "Post-Judg": 400000 },
];

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}k`;
  }
  return `$${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="text-card-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PaymentsByBucketChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
            tickLine={{ stroke: "hsl(var(--border))" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: "hsl(var(--card-foreground))" }}
          />
          <Bar 
            dataKey="Pre-Suit" 
            fill="hsl(var(--chart-2))" 
            radius={[2, 2, 0, 0]}
            name="Pre-Suit"
          />
          <Bar 
            dataKey="Pre-Judg" 
            fill="hsl(var(--chart-4))" 
            radius={[2, 2, 0, 0]}
            name="Pre-Judg"
          />
          <Bar 
            dataKey="Post-Judg" 
            fill="hsl(var(--chart-1))" 
            radius={[2, 2, 0, 0]}
            name="Post-Judg"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentsByBucketChart;