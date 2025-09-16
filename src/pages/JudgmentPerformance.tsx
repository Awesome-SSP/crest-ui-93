import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import ChartCard from "@/components/ChartCard";

const JudgmentPerformance = () => {
  useEffect(() => {
    document.title = "Judgment Performance | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Judgment Performance</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Performance Overview" delay={0.1}>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Performance charts coming soon</div>
        </ChartCard>
        <ChartCard title="Benchmarks" delay={0.2}>
          <div className="h-64 flex items-center justify-center text-muted-foreground">Benchmark charts coming soon</div>
        </ChartCard>
      </div>
    </div>
  );
};

export default JudgmentPerformance;
