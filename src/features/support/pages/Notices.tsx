import { useEffect } from "react";
import { Bell } from "lucide-react";

const Notices = () => {
  useEffect(() => {
    document.title = "Notices | Pipeway";
  }, []);

  const notices = [
    { t: "Maintenance", d: "Scheduled maintenance on Saturday 2-4 AM UTC." },
    { t: "Data Refresh", d: "New monthly data loaded for review." },
  ];

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <Bell className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Notices</h1>
      </div>
      <div className="space-y-3">
        {notices.map((n) => (
          <div key={n.t} className="p-4 rounded-lg border border-card-border bg-card">
            <div className="font-medium">{n.t}</div>
            <div className="text-sm text-muted-foreground">{n.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;
