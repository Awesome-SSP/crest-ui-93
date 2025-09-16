import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

const StateIssues = () => {
  useEffect(() => {
    document.title = "State Issues | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <AlertTriangle className="w-4 h-4" />
        <h1 className="text-xl font-semibold">State Issues</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {["CA", "NY", "TX", "FL", "IL", "PA"].map((s) => (
          <div key={s} className="p-4 rounded-lg border border-card-border bg-card">
            <div className="font-medium">{s}</div>
            <div className="text-sm text-muted-foreground">No current issues reported.</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateIssues;
