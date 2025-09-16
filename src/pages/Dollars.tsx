import { useEffect } from "react";
import { DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import StatsCard from "@/components/StatsCard";

const Dollars = () => {
  useEffect(() => {
    document.title = "Dollars Dashboard | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="text-foreground">Dollars</span>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Collected" value="$3.1M" change="+9.2% MoM" changeType="positive" icon={DollarSign} delay={0.1} />
          <StatsCard title="Total Costs" value="$1.2M" change="+2.1% MoM" changeType="neutral" icon={BarChart3} delay={0.2} />
          <StatsCard title="Net" value="$1.9M" change="+12.3% MoM" changeType="positive" icon={TrendingUp} delay={0.3} />
          <StatsCard title="Avg Ticket" value="$487" change="+3.8% MoM" changeType="positive" icon={DollarSign} delay={0.4} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <ChartCard title="Payments by Bucket" delay={0.5}>
            <div className="h-64 flex items-center justify-center text-muted-foreground">Payments chart coming soon</div>
          </ChartCard>
          <ChartCard title="Costs & Collections" delay={0.6}>
            <div className="h-64 flex items-center justify-center text-muted-foreground">Costs & Collections chart coming soon</div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dollars;
