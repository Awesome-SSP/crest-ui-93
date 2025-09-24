import { useEffect } from "react";
import { Settings } from "lucide-react";

const Administration = () => {
  useEffect(() => {
    document.title = "Administration | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <Settings className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Administration</h1>
      </div>
      <div className="p-4 rounded-lg border border-card-border bg-card text-muted-foreground">
        Admin settings coming soon.
      </div>
    </div>
  );
};

export default Administration;
