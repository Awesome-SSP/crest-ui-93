import { useEffect } from "react";
import { Calendar } from "lucide-react";

const ScheduleBatchReport = () => {
  useEffect(() => {
    document.title = "Schedule Batch Report | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <Calendar className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Schedule Batch Report</h1>
      </div>
      <div className="p-4 rounded-lg border border-card-border bg-card text-muted-foreground">
        Scheduling UI coming soon.
      </div>
    </div>
  );
};

export default ScheduleBatchReport;
