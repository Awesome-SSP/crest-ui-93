import React from "react";
import { ShieldCheck, Share2, Download } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from 'recharts';
import { toast } from '@/hooks/use-toast';

// Sample datasets for the demo page. Replace these with API data when
// integrating with the backend.
const monthly = [
  { month: 'Jan', filed: 120, won: 45, lost: 75 },
  { month: 'Feb', filed: 130, won: 50, lost: 80 },
  { month: 'Mar', filed: 140, won: 60, lost: 80 },
  { month: 'Apr', filed: 160, won: 70, lost: 90 },
  { month: 'May', filed: 155, won: 65, lost: 90 },
  { month: 'Jun', filed: 170, won: 80, lost: 90 },
  { month: 'Jul', filed: 180, won: 95, lost: 85 },
  { month: 'Aug', filed: 175, won: 88, lost: 87 },
  { month: 'Sep', filed: 160, won: 82, lost: 78 },
  { month: 'Oct', filed: 150, won: 80, lost: 70 },
  { month: 'Nov', filed: 142, won: 76, lost: 66 },
  { month: 'Dec', filed: 155, won: 85, lost: 70 },
];

const outcomeShare = [
  { name: 'Won', value: 843 },
  { name: 'Lost', value: 941 },
  { name: 'Settled', value: 532 },
];

const COLORS = ['#10B981', '#EF4444', '#F59E0B'];

const JudgmentPerformance: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Judgment Performance | Pipeway';
  }, []);

  // Share handler uses the same toast/clipboard fallback pattern as other pages
  const handleShare = React.useCallback(async () => {
    const data = { title: document.title, text: 'Judgment Performance dashboard', url: window.location.href } as any;
    try {
      if (navigator.share) {
        await navigator.share(data);
        toast({ title: 'Shared', description: 'Shared via native share.' });
        return;
      }
    } catch (e) {
      // fallback
    }
    try {
      await navigator.clipboard.writeText(data.url);
      toast({ title: 'Link copied', description: 'Page URL copied to clipboard.' });
    } catch (e) {
      prompt('Copy this link', data.url);
    }
  }, []);

  const exportCSV = React.useCallback(() => {
    try {
      const rows = monthly;
      const headers = Object.keys(rows[0]);
      const csv = [headers.join(',')].concat(rows.map(r => headers.map(h => JSON.stringify((r as any)[h] ?? '')).join(','))).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'judgment-performance.csv'; a.click(); URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast({ title: 'Export failed', description: 'Could not export CSV.' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-semibold">Judgment Performance</h1>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="btn flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button onClick={exportCSV} className="btn btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" /> Download CSV
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-card border border-card-border flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Total Judgments</div>
            <div className="text-2xl font-semibold">2,316</div>
          </div>
          <div className="text-green-500 font-semibold">+3.4%</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-card-border flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Win Rate</div>
            <div className="text-2xl font-semibold">47.8%</div>
          </div>
          <div className="text-blue-500 font-semibold">Stable</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-card-border flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Avg Days to Judgment</div>
            <div className="text-2xl font-semibold">142</div>
          </div>
          <div className="text-muted-foreground text-sm">Updated</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Monthly Filed vs Outcomes" delay={0.05}>
            <div style={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="filed" stroke="#2563eb" strokeWidth={2} />
                  <Line type="monotone" dataKey="won" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="lost" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <ChartCard title="Outcome Distribution" delay={0.1}>
              <div style={{ height: 220 }} className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={outcomeShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {outcomeShare.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>

            <ChartCard title="Trend Area" delay={0.15}>
              <div style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthly} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorFiled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ReTooltip />
                    <Area type="monotone" dataKey="filed" stroke="#2563eb" fillOpacity={1} fill="url(#colorFiled)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </ChartCard>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-card-border p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Top Cases</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-md bg-card/50 border border-card-border">
              <div className="flex-1">
                <div className="font-medium">Case 18921</div>
                <div className="text-xs text-muted-foreground">Filed: 2025-08-12 — Status: Won</div>
              </div>
              <div className="text-sm text-green-500 font-semibold">Won</div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-md bg-card/50 border border-card-border">
              <div className="flex-1">
                <div className="font-medium">Case 18412</div>
                <div className="text-xs text-muted-foreground">Filed: 2025-07-20 — Status: Lost</div>
              </div>
              <div className="text-sm text-red-500 font-semibold">Lost</div>
            </div>
            <div className="mt-auto text-xs text-muted-foreground">View all cases →</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgmentPerformance;
