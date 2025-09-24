import React from 'react';
import { DollarSign, TrendingUp, BarChart3, Share2, Download } from 'lucide-react';
import ChartCard from '@/features/dashboard/components/ChartCard';
import StatsCard from '@/features/dashboard/components/StatsCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie, Legend } from 'recharts';
import { toast } from '@/hooks/use-toast';

// Sample data for the Dollars dashboard demo. Replace with API data when
// integrating backend.
const monthly = [
  { month: 'Jan', collected: 210000, costs: 70000 },
  { month: 'Feb', collected: 230000, costs: 75000 },
  { month: 'Mar', collected: 250000, costs: 80000 },
  { month: 'Apr', collected: 270000, costs: 90000 },
  { month: 'May', collected: 260000, costs: 85000 },
  { month: 'Jun', collected: 280000, costs: 92000 },
  { month: 'Jul', collected: 300000, costs: 95000 },
  { month: 'Aug', collected: 290000, costs: 93000 },
  { month: 'Sep', collected: 275000, costs: 88000 },
  { month: 'Oct', collected: 265000, costs: 86000 },
  { month: 'Nov', collected: 255000, costs: 84000 },
  { month: 'Dec', collected: 285000, costs: 91000 },
];

const buckets = [
  { name: 'Bucket A', value: 520000 },
  { name: 'Bucket B', value: 320000 },
  { name: 'Bucket C', value: 210000 },
  { name: 'Bucket D', value: 120000 },
];

const COLORS = ['#2563eb', '#10B981', '#F59E0B', '#EF4444'];

const Dollars: React.FC = () => {
  React.useEffect(() => {
    document.title = 'Dollars Dashboard | Pipeway';
  }, []);

  const handleShare = React.useCallback(async () => {
    const data = { title: document.title, text: 'Dollars dashboard', url: window.location.href } as any;
    try {
      if (navigator.share) {
        await navigator.share(data);
        toast({ title: 'Shared', description: 'Shared via native share.' });
        return;
      }
    } catch (e) { }
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
      a.href = url; a.download = 'dollars.csv'; a.click(); URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast({ title: 'Export failed', description: 'Could not export CSV.' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-content-background">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-primary/10">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Dollars</div>
            <div className="text-lg font-semibold">Revenue & Collections</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleShare} className="btn flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</button>
          <button onClick={exportCSV} className="btn btn-primary flex items-center gap-2"><Download className="w-4 h-4" /> Download CSV</button>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatsCard title="Total Collected" value="$3.12M" change="+9.2% MoM" changeType="positive" icon={DollarSign} delay={0.1} />
          <StatsCard title="Total Costs" value="$1.07M" change="+2.1% MoM" changeType="neutral" icon={BarChart3} delay={0.15} />
          <StatsCard title="Net" value="$2.05M" change="+12.3% MoM" changeType="positive" icon={TrendingUp} delay={0.2} />
          <StatsCard title="Avg Ticket" value="$512" change="+3.8% MoM" changeType="positive" icon={DollarSign} delay={0.25} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard title="Monthly Collections vs Costs" delay={0.3}>
            <div style={{ height: 340 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ReTooltip />
                  <Legend />
                  <Bar dataKey="collected" stackId="a" fill="#2563eb" />
                  <Bar dataKey="costs" stackId="a" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Buckets Share" delay={0.35}>
            <div style={{ height: 340 }} className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={buckets} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {buckets.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dollars;
