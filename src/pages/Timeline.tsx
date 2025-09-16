import { useEffect } from "react";

const Timeline = () => {
  useEffect(() => {
    document.title = "Timeline | Pipeway";
  }, []);
  return (
    <div className="min-h-screen bg-content-background p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Timeline</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-card rounded-xl border border-card-border shadow-card p-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Timeline Chart</h2>
          <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground border border-dashed border-gray-300">
            Timeline Chart Placeholder
          </div>
        </div>
        <div className="bg-card rounded-xl border border-card-border shadow-card p-8 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <div className="w-full h-56 bg-gray-100 rounded-lg flex items-center justify-center text-muted-foreground border border-dashed border-gray-300">
            Recent Events Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
import { motion } from "framer-motion";
import { Clock, Calendar, TrendingUp, Target, ArrowRight, Home } from "lucide-react";
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
    <div className="flex flex-col gap-2 mt-2">
      <div className="text-sm text-muted-foreground">Avg Days: <span className="font-semibold text-card-foreground">{phase.avgDays}</span></div>
      <div className="text-sm text-muted-foreground">Success Rate: <span className="font-semibold text-card-foreground">{phase.successRate}%</span></div>
    </div>
  </motion.div>
);
