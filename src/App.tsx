import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Dollars from "./pages/Dollars";
import Liquidation from "./pages/Liquidation";
import HeatMaps from "./pages/HeatMaps";
import Inventory from "./pages/Inventory";
import InvChartBatches from "./pages/InvChartBatches";
import Timeline from "./pages/Timeline";
import Reports from "./pages/Reports";
import FAQ from "./pages/FAQ";
import Notices from "./pages/Notices";
import StateIssues from "./pages/StateIssues";
import ClientGuide from "./pages/ClientGuide";
import ScheduleBatchReport from "./pages/ScheduleBatchReport";
import DocumentTransfer from "./pages/DocumentTransfer";
import Administration from "./pages/Administration";
import JudgmentPerformance from "./pages/JudgmentPerformance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dollars" element={<Dollars />} />
            <Route path="/liquidation" element={<Liquidation />} />
            <Route path="/heatmaps" element={<HeatMaps />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/inv-chart-batches" element={<InvChartBatches />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/state-issues" element={<StateIssues />} />
            <Route path="/client-guide" element={<ClientGuide />} />
            <Route path="/schedule-batch-report" element={<ScheduleBatchReport />} />
            <Route path="/document-transfer" element={<DocumentTransfer />} />
            <Route path="/administration" element={<Administration />} />
            <Route path="/judgment-performance" element={<JudgmentPerformance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
