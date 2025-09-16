import { useEffect } from "react";
import { FileText, BarChart3 } from "lucide-react";
import ChartCard from "@/components/ChartCard";

const Reports = () => {
  useEffect(() => {
    document.title = "Reports | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <FileText className="w-4 h-4" />
          <span className="text-foreground">Reports</span>
        </div>
      </div>

      <div className="px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Monthly Summary" delay={0.1}>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Summary report coming soon</div>
        </ChartCard>
        <ChartCard title="Performance by Portfolio" delay={0.2}>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Portfolio report coming soon</div>
        </ChartCard>
      </div>
    </div>
  );
};

export default Reports;
