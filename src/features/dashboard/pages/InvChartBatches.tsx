import { motion } from "framer-motion";
import { BarChart3, PieChart, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import ChartCard from "@/features/dashboard/components/ChartCard";
import StatsCard from "@/features/dashboard/components/StatsCard";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const activeClaimsData = [
  { name: "Completed", value: 60, count: 1250 },
  { name: "On Time", value: 30, count: 625 },
  { name: "Completed Late", value: 6, count: 125 },
  { name: "Pay/Hold", value: 3, count: 62 },
  { name: "Incomplete", value: 1, count: 21 },
];

const claimsProgressData = [
  { category: "New Claims", count: 234, percentage: 15.2, trend: "up" },
  { category: "In Progress", count: 1567, percentage: 78.9, trend: "stable" },
  { category: "Under Review", count: 89, percentage: 4.5, trend: "down" },
  { category: "Completed", count: 1250, percentage: 79.8, trend: "up" },
  { category: "Rejected", count: 23, percentage: 1.5, trend: "down" },
];

const COLORS = [
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-1))',
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="text-card-foreground font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">Count: {data.count}</p>
        <p className="text-sm text-muted-foreground">Percentage: {data.value}%</p>
      </div>
    );
  }
  return null;
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-80">
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-muted-foreground">Loading data...</p>
    </div>
  </div>
);

const InvChartBatches = () => {
  return (
    <div className="min-h-screen bg-content-background">

      <div className="px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Claims"
            value="2,083"
            change="+127 from last week"
            changeType="positive"
            icon={BarChart3}
            delay={0.1}
          />
          <StatsCard
            title="Completion Rate"
            value="79.8%"
            change="+3.2% from last month"
            changeType="positive"
            icon={CheckCircle}
            delay={0.2}
          />
          <StatsCard
            title="Avg Processing Time"
            value="12.5 days"
            change="-1.8 days improvement"
            changeType="positive"
            icon={Clock}
            delay={0.3}
          />
          <StatsCard
            title="Claims at Risk"
            value="89"
            change="-15 from last week"
            changeType="positive"
            icon={AlertCircle}
            delay={0.4}
          />
        </div>

        {/* Main Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <ChartCard title="Active Claims" delay={0.5}>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={activeClaimsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {activeClaimsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ color: "hsl(var(--card-foreground))" }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Closed Claims" delay={0.6}>
            <LoadingSpinner />
          </ChartCard>
        </div>

        {/* Claims Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ChartCard title="Claims Processing Pipeline" delay={0.7}>
            <div className="space-y-4">
              {claimsProgressData.map((item, index) => (
                <motion.div
                  key={item.category}
                  className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-card-border"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.trend === 'up' ? 'bg-chart-2' :
                      item.trend === 'down' ? 'bg-chart-1' : 'bg-chart-3'
                      }`} />
                    <div>
                      <div className="font-medium text-card-foreground">{item.category}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.percentage}% completion rate
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-card-foreground">{item.count}</div>
                    <div className={`text-xs ${item.trend === 'up' ? 'text-chart-2' :
                      item.trend === 'down' ? 'text-chart-1' : 'text-muted-foreground'
                      }`}>
                      {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                      {item.trend === 'stable' ? ' Stable' : ` ${item.trend === 'up' ? 'Increasing' : 'Decreasing'}`}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Weekly Performance Metrics" delay={0.8}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-2">98.5%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center p-4 bg-muted/10 rounded-lg">
                  <div className="text-2xl font-bold text-chart-3">4.2</div>
                  <div className="text-sm text-muted-foreground">Avg Reviews</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Processing Efficiency</span>
                  <span className="text-sm font-medium text-card-foreground">87%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-chart-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "87%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Quality Score</span>
                  <span className="text-sm font-medium text-card-foreground">92%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-chart-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "92%" }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                  <span className="text-sm font-medium text-card-foreground">95%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-chart-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "95%" }}
                    transition={{ delay: 1.2, duration: 1 }}
                  />
                </div>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default InvChartBatches;