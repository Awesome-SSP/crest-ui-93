import { useEffect } from "react";
import { FileQuestion } from "lucide-react";

const FAQ = () => {
  useEffect(() => {
    document.title = "FAQ | Pipeway";
  }, []);

  const faqs = [
    { q: "How are liquidation rates calculated?", a: "They are derived from settled amounts over placed amounts across the selected period." },
    { q: "Can I export charts?", a: "Yes, download buttons are available on each chart card." },
    { q: "How do filters work?", a: "Filters at the top navbar apply globally across dashboards." },
  ];

  return (
    <div className="min-h-screen bg-content-background px-6 py-8">
      <div className="mb-6 flex items-center space-x-2">
        <FileQuestion className="w-4 h-4" />
        <h1 className="text-xl font-semibold">Frequently Asked Questions</h1>
      </div>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="rounded-lg border border-card-border p-4 bg-card">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
