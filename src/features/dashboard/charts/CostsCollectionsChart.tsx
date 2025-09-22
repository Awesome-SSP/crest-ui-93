import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "2023-01", "Total Collected": 25000000, "Total Costs": 18500000 },
  { month: "2023-02", "Total Collected": 26900000, "Total Costs": 19200000 },
  { month: "2023-03", "Total Collected": 26800000, "Total Costs": 18800000 },
  { month: "2023-04", "Total Collected": 28400000, "Total Costs": 20100000 },
  { month: "2023-05", "Total Collected": 28400000, "Total Costs": 19600000 },
  { month: "2023-06", "Total Collected": 30800000, "Total Costs": 21200000 },
  { month: "2023-07", "Total Collected": 29300000, "Total Costs": 20800000 },
  { month: "2023-08", "Total Collected": 29100000, "Total Costs": 19900000 },
  { month: "2023-09", "Total Collected": 31000000, "Total Costs": 20500000 },
  { month: "2023-10", "Total Collected": 33400000, "Total Costs": 21800000 },
  { month: "2023-11", "Total Collected": 30100000, "Total Costs": 20700000 },
  { month: "2023-12", "Total Collected": 36100000, "Total Costs": 22100000 },
  { month: "2024-01", "Total Collected": 30400000, "Total Costs": 19800000 },
  { month: "2024-02", "Total Collected": 33200000, "Total Costs": 21300000 },
  { month: "2024-03", "Total Collected": 30300000, "Total Costs": 20900000 },
  { month: "2024-04", "Total Collected": 28000000, "Total Costs": 19700000 },
  { month: "2024-05", "Total Collected": 25400000, "Total Costs": 18900000 },
  { month: "2024-06", "Total Collected": 22500000, "Total Costs": 17800000 },
  { month: "2024-07", "Total Collected": 19900000, "Total Costs": 16900000 },
  { month: "2024-08", "Total Collected": 16800000, "Total Costs": 15800000 },
  { month: "2024-09", "Total Collected": 14100000, "Total Costs": 14700000 },
  { month: "2025-01", "Total Collected": 9500000, "Total Costs": 13200000 },
  { month: "2025-02", "Total Collected": 8200000, "Total Costs": 12800000 },
  { month: "2025-03", "Total Collected": 6800000, "Total Costs": 12400000 },
  { month: "2025-04", "Total Collected": 5400000, "Total Costs": 11900000 },
  { month: "2025-05", "Total Collected": 4300000, "Total Costs": 11500000 },
  { month: "2025-06", "Total Collected": 3400000, "Total Costs": 11200000 },
  { month: "2025-07", "Total Collected": 2600000, "Total Costs": 10900000 },
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

const CostsCollectionsChart = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
          <Line 
            type="monotone" 
            dataKey="Total Collected" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--chart-2))" }}
            name="Total Collected"
          />
          <Line 
            type="monotone" 
            dataKey="Total Costs" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
            name="Total Costs"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CostsCollectionsChart;