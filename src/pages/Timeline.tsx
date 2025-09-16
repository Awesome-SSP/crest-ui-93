import React from 'react';
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Legend, ResponsiveContainer } from "recharts";

const timelineData = [
  { period: "Jan", "Placement to First Payment": 45, "Placement to Suit": 90, "Placement to Judgment": 180 },
  { period: "Feb", "Placement to First Payment": 40, "Placement to Suit": 85, "Placement to Judgment": 175 },
  { period: "Mar", "Placement to First Payment": 42, "Placement to Suit": 88, "Placement to Judgment": 178 },
  { period: "Apr", "Placement to First Payment": 47, "Placement to Suit": 92, "Placement to Judgment": 182 },
  { period: "May", "Placement to First Payment": 44, "Placement to Suit": 89, "Placement to Judgment": 179 },
  { period: "Jun", "Placement to First Payment": 43, "Placement to Suit": 87, "Placement to Judgment": 176 },
  { period: "Jul", "Placement to First Payment": 46, "Placement to Suit": 91, "Placement to Judgment": 181 },
  { period: "Aug", "Placement to First Payment": 41, "Placement to Suit": 86, "Placement to Judgment": 174 },
  { period: "Sep", "Placement to First Payment": 39, "Placement to Suit": 83, "Placement to Judgment": 169 },
  { period: "Oct", "Placement to First Payment": 38, "Placement to Suit": 82, "Placement to Judgment": 168 },
  { period: "Nov", "Placement to First Payment": 37, "Placement to Suit": 80, "Placement to Judgment": 165 },
  { period: "Dec", "Placement to First Payment": 36, "Placement to Suit": 78, "Placement to Judgment": 162 }
];

const phaseMetrics = [
  { phase: "Placement to First Payment", avgDays: 45, successRate: 78.5 },
  { phase: "Placement to Suit", avgDays: 90, successRate: 65.2 },
  { phase: "Placement to Judgment", avgDays: 180, successRate: 58.9 },
  { phase: "Suit to Serve", avgDays: 30, successRate: 89.1 },
  { phase: "Suit to Judgment", avgDays: 120, successRate: 71.3 }
];

const RecentEvent = ({ title, time }: { title: string; time: string }) => (
  <div className="w-full p-3 rounded-md bg-card/50 border border-card-border flex items-start gap-3">
    <div className="p-2 rounded-md bg-muted text-muted-foreground"><Calendar className="w-4 h-4" /></div>
    <div>
      <div className="font-medium">{title}</div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </div>
  </div>
);

const Timeline = () => {
  React.useEffect(() => {
    document.title = "Timeline | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Timeline</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {phaseMetrics.map((p, i) => (
            <motion.div key={p.phase} className="p-4 rounded-xl border border-card-border bg-gradient-card" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="text-sm text-muted-foreground">{p.phase}</div>
                  <div className="text-xl font-semibold">{p.avgDays} days</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Success</div>
                  <div className="font-semibold">{p.successRate}%</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-xl border border-card-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold">Timeline Chart</h2>
                <div className="text-sm text-muted-foreground">Monitor phase durations over time</div>
              </div>
              <div className="text-sm text-muted-foreground">Period: Last 12 months</div>
            </div>
            <div style={{ height: 320 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <ReTooltip contentStyle={{ background: 'var(--card)', borderColor: 'var(--card-border)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="Placement to First Payment" stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Placement to Suit" stroke="#f97316" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Placement to Judgment" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-card-border p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Recent Events</h2>
            <RecentEvent title="Batch 345 completed" time="2 hours ago" />
            <RecentEvent title="New suit filings: 23" time="1 day ago" />
            <RecentEvent title="Payment collections updated" time="3 days ago" />
            <div className="mt-auto text-xs text-muted-foreground">View full activity log →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

