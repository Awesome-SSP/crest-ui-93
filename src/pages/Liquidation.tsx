import { motion } from "framer-motion";
import { TrendingDown, DollarSign, Percent, Calendar } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const payersStatusData = [
  { month: "Jan", active: 120, inactive: 45, pending: 23 },
  { month: "Feb", active: 132, inactive: 38, pending: 28 },
  { month: "Mar", active: 145, inactive: 42, pending: 31 },
  { month: "Apr", active: 159, inactive: 35, pending: 27 },
  { month: "May", active: 168, inactive: 48, pending: 34 },
  { month: "Jun", active: 175, inactive: 52, pending: 29 },
];

const liquidationRatesData = [
  { month: "Jan", rate: 68.5, target: 70 },
  { month: "Feb", rate: 71.2, target: 70 },
  { month: "Mar", rate: 73.8, target: 70 },
  { month: "Apr", rate: 69.4, target: 70 },
  { month: "May", rate: 75.1, target: 70 },
  { month: "Jun", rate: 77.3, target: 70 },
];

const settlementByDateData = [
  { date: "Week 1", full: 85, partial: 45, none: 12 },
  { date: "Week 2", full: 92, partial: 38, none: 8 },
  { date: "Week 3", full: 78, partial: 52, none: 15 },
  { date: "Week 4", full: 105, partial: 41, none: 9 },
];

const settlementByPlacementData = [
  { placement: "Q1", success: 78.5, partial: 15.2, failed: 6.3 },
  { placement: "Q2", success: 82.1, partial: 12.8, failed: 5.1 },
  { placement: "Q3", success: 75.9, partial: 18.4, failed: 5.7 },
  { placement: "Q4", success: 88.3, partial: 9.2, failed: 2.5 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="text-card-foreground font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey}: {typeof entry.value === 'number' && entry.dataKey.includes('rate') || entry.dataKey.includes('success') || entry.dataKey.includes('partial') || entry.dataKey.includes('failed') ? `${entry.value}%` : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Liquidation = () => {
  return (
    <div className="min-h-screen bg-content-background">
      
      <div className="px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Liquidated"
              value="$4.2M"
              change="+18.5% from last month"
              changeType="positive"
              icon={DollarSign}
              delay={0.1}
            />
            <StatsCard
              title="Success Rate"
              value="77.3%"
              change="+2.1% from last month"
              changeType="positive"
              icon={Percent}
              delay={0.2}
            />
            <StatsCard
              title="Active Payers"
              value="175"
              change="+7 from last month"
              changeType="positive"
              icon={TrendingDown}
              delay={0.3}
            />
            <StatsCard
              title="Avg Settlement Time"
              value="42 days"
              change="-3 days from last month"
              changeType="positive"
              icon={Calendar}
              delay={0.4}
            />
          </div>

          {/* Top Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ChartCard title="Payers Status" delay={0.5}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={payersStatusData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "hsl(var(--card-foreground))" }} />
                    <Bar dataKey="active" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} name="Active" />
                    <Bar dataKey="inactive" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} name="Inactive" />
                    <Bar dataKey="pending" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} name="Pending" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            
            <ChartCard title="Liquidation Rates" delay={0.6}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liquidationRatesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      domain={[60, 80]}
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "hsl(var(--card-foreground))" }} />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                      name="Actual Rate (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="target" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 3 }}
                      name="Target Rate (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Bottom Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <ChartCard title="Settlement Ratio by Settlement Date" delay={0.7}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={settlementByDateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "hsl(var(--card-foreground))" }} />
                    <Bar dataKey="full" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} name="Full Settlement" />
                    <Bar dataKey="partial" fill="hsl(var(--chart-3))" radius={[2, 2, 0, 0]} name="Partial Settlement" />
                    <Bar dataKey="none" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} name="No Settlement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
            
            <ChartCard title="Settlement Ratio by Placement Date" delay={0.8}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={settlementByPlacementData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis type="category" dataKey="placement" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "hsl(var(--card-foreground))" }} />
                    <Bar dataKey="success" fill="hsl(var(--chart-2))" name="Success Rate (%)" />
                    <Bar dataKey="partial" fill="hsl(var(--chart-3))" name="Partial Rate (%)" />
                    <Bar dataKey="failed" fill="hsl(var(--chart-1))" name="Failed Rate (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    );
  };

export default Liquidation;