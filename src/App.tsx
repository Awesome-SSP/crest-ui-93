import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Loading from "@/components/Loading";
import React, { Suspense, lazy } from "react";

// Route-level code splitting: lazy load pages so initial bundle is small
const Index = lazy(() => import("./pages/Index"));
const Dollars = lazy(() => import("./pages/Dollars"));
const Liquidation = lazy(() => import("./pages/Liquidation"));
const HeatMaps = lazy(() => import("./pages/HeatMaps"));
const Inventory = lazy(() => import("./pages/Inventory"));
const InvChartBatches = lazy(() => import("./pages/InvChartBatches"));
const Timeline = lazy(() => import("./pages/Timeline"));
const Reports = lazy(() => import("./pages/Reports"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Notices = lazy(() => import("./pages/Notices"));
const StateIssues = lazy(() => import("./pages/StateIssues"));
const ClientGuide = lazy(() => import("./pages/ClientGuide"));
const ScheduleBatchReport = lazy(() => import("./pages/ScheduleBatchReport"));
const DocumentTransfer = lazy(() => import("./pages/DocumentTransfer"));
const Administration = lazy(() => import("./pages/Administration"));
const JudgmentPerformance = lazy(() => import("./pages/JudgmentPerformance"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          {/* Suspense provides a fallback UI while lazy pages load */}
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
