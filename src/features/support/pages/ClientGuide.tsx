import { useEffect } from "react";
import { Users } from "lucide-react";

const ClientGuide = () => {
  useEffect(() => {
    document.title = "Client Guide | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <Users className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Client Guide</h1>
      </div>
      <div className="space-y-4">
        {["Getting Started", "Filtering Data", "Exporting Charts", "Scheduling Reports"].map((topic) => (
          <div key={topic} className="p-4 rounded-lg border border-card-border bg-card">
            <div className="font-medium">{topic}</div>
            <div className="text-sm text-muted-foreground">Guidance coming soon.</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientGuide;
