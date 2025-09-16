import { motion } from "framer-motion";
import { Clock, Calendar, TrendingUp, Target, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SubNavbar from "@/components/SubNavbar";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const timelineData = [
  { period: "0", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "1", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "2", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "3", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "4", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "5", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "6", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "7", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "8", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
  { period: "9", "Placement to First Payment": 2, "Placement to Suit": 1, "Placement to Judgment": 0.5, "Suit to Serve": 0.8, "Suit to Judgment": 0.3 },
];

const phaseMetrics = [
  {
    phase: "Placement to First Payment",
    avgDays: 45,
    successRate: 78.5,
    description: "Time from initial placement to first payment received",
    color: "chart-1"
  },
  {
    phase: "Placement to Suit",
    avgDays: 90,
    successRate: 65.2,
    description: "Time from placement to legal suit filing",
    color: "chart-2"
  },
  {
    phase: "Placement to Judgment",
    avgDays: 180,
    successRate: 58.9,
    description: "Complete timeline from placement to final judgment",
    color: "chart-3"
  },
  {
    phase: "Suit to Serve",
    avgDays: 30,
    successRate: 89.1,
    description: "Time from suit filing to successful service",
    color: "chart-4"
  },
  {
    phase: "Suit to Judgment",
    avgDays: 120,
    successRate: 71.3,
    description: "Time from suit filing to court judgment",
    color: "chart-5"
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-lg">
        <p className="text-card-foreground font-medium mb-2">Period {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value} months
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PhaseCard = ({ phase, delay }: { phase: typeof phaseMetrics[0], delay: number }) => (
  <motion.div
    className="p-6 bg-gradient-card border border-card-border rounded-xl"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ scale: 1.02, y: -5 }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className={`w-4 h-4 rounded-full bg-${phase.color}`} />
        <div>
          <h3 className="font-semibold text-card-foreground">{phase.phase}</h3>
          <p className="text-sm text-muted-foreground">{phase.description}</p>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-muted-foreground" />
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center p-3 bg-muted/10 rounded-lg">
        <div className="text-2xl font-bold text-card-foreground">{phase.avgDays}</div>
        <div className="text-xs text-muted-foreground">Avg Days</div>
      </div>
      <div className="text-center p-3 bg-muted/10 rounded-lg">
        <div className="text-2xl font-bold text-chart-2">{phase.successRate}%</div>
        <div className="text-xs text-muted-foreground">Success Rate</div>
      </div>
    </div>
    
    <div className="mt-4">
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>Performance</span>
        <span>{phase.successRate}%</span>
      </div>
      <div className="w-full bg-muted/30 rounded-full h-2">
        <motion.div
          className={`h-2 rounded-full bg-${phase.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${phase.successRate}%` }}
          transition={{ delay: delay + 0.3, duration: 1 }}
        />
      </div>
    </div>
  </motion.div>
);

const Timeline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="bg-content-background min-h-screen">
        <SubNavbar section="timeline" />
        
        <div className="px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Avg Processing Time"
              value="120 days"
              change="-15 days improvement"
              changeType="positive"
              icon={Clock}
              delay={0.1}
            />
            <StatsCard
              title="Fastest Resolution"
              value="28 days"
              change="New record this month"
              changeType="positive"
              icon={Target}
              delay={0.2}
            />
            <StatsCard
              title="Cases in Progress"
              value="1,847"
              change="+127 from last month"
              changeType="neutral"
              icon={Calendar}
              delay={0.3}
            />
            <StatsCard
              title="Timeline Efficiency"
              value="78.9%"
              change="+5.2% from last quarter"
              changeType="positive"
              icon={TrendingUp}
              delay={0.4}
            />
          </div>

          {/* Main Timeline Chart */}
          <div className="mb-8">
            <ChartCard title="Timeline" delay={0.5}>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="period" 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <YAxis 
                      tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                      tickLine={{ stroke: "hsl(var(--border))" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ color: "hsl(var(--card-foreground))" }} />
                    
                    <Line 
                      type="monotone" 
                      dataKey="Placement to First Payment" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Placement to Suit" 
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Placement to Judgment" 
                      stroke="hsl(var(--chart-3))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Suit to Serve" 
                      stroke="hsl(var(--chart-4))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="Suit to Judgment" 
                      stroke="hsl(var(--chart-5))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>

          {/* Phase Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {phaseMetrics.map((phase, index) => (
              <PhaseCard 
                key={phase.phase} 
                phase={phase} 
                delay={0.6 + index * 0.1} 
              />
            ))}
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Timeline Performance Metrics" delay={1.1}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/10 rounded-lg">
                    <div className="text-2xl font-bold text-chart-2">95.2%</div>
                    <div className="text-sm text-muted-foreground">On-Time Completion</div>
                  </div>
                  <div className="text-center p-4 bg-muted/10 rounded-lg">
                    <div className="text-2xl font-bold text-chart-3">87.6%</div>
                    <div className="text-sm text-muted-foreground">Quality Score</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    { metric: "Average Cycle Time", value: "120", unit: "days", target: "105" },
                    { metric: "Fastest Resolution", value: "28", unit: "days", target: "30" },
                    { metric: "Process Efficiency", value: "89", unit: "%", target: "85" },
                    { metric: "Client Satisfaction", value: "94", unit: "%", target: "90" },
                  ].map((item, index) => (
                    <div key={item.metric} className="flex justify-between items-center p-3 bg-muted/10 rounded-lg">
                      <div>
                        <div className="font-medium text-card-foreground">{item.metric}</div>
                        <div className="text-sm text-muted-foreground">Target: {item.target}{item.unit}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-card-foreground">{item.value}{item.unit}</div>
                        <div className={`text-xs ${parseInt(item.value) >= parseInt(item.target) ? 'text-chart-2' : 'text-chart-1'}`}>
                          {parseInt(item.value) >= parseInt(item.target) ? '✓ On Target' : '⚠ Below Target'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ChartCard>

            <ChartCard title="Recent Timeline Events" delay={1.2}>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {[
                  { event: "First Payment Received", case: "CASE-2024-1847", time: "2 hours ago", type: "success" },
                  { event: "Suit Filed Successfully", case: "CASE-2024-1846", time: "4 hours ago", type: "info" },
                  { event: "Judgment Awarded", case: "CASE-2024-1845", time: "6 hours ago", type: "success" },
                  { event: "Service Completed", case: "CASE-2024-1844", time: "8 hours ago", type: "info" },
                  { event: "Settlement Negotiated", case: "CASE-2024-1843", time: "1 day ago", type: "success" },
                  { event: "Court Date Scheduled", case: "CASE-2024-1842", time: "1 day ago", type: "warning" },
                  { event: "Payment Plan Established", case: "CASE-2024-1841", time: "2 days ago", type: "success" },
                  { event: "Legal Review Completed", case: "CASE-2024-1840", time: "2 days ago", type: "info" },
                ].map((item, index) => (
                  <motion.div
                    key={item.case}
                    className="flex items-center space-x-4 p-3 bg-muted/10 rounded-lg border border-card-border"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.05 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      item.type === 'success' ? 'bg-chart-2' : 
                      item.type === 'warning' ? 'bg-chart-3' : 'bg-chart-4'
                    }`} />
                    <div className="flex-1">
                      <div className="font-medium text-card-foreground">{item.event}</div>
                      <div className="text-sm text-muted-foreground">{item.case}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.time}</div>
                  </motion.div>
                ))}
              </div>
            </ChartCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timeline;