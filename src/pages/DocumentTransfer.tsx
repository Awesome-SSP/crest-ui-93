import { useEffect } from "react";
import { Download } from "lucide-react";

const DocumentTransfer = () => {
  useEffect(() => {
    document.title = "Document Transfer | Pipeway";
  }, []);

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <Download className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Document Transfer</h1>
      </div>
      <div className="p-4 rounded-lg border border-card-border bg-card text-muted-foreground">
        Transfer interface coming soon.
      </div>
    </div>
  );
};

export default DocumentTransfer;
