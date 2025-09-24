import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Loading from "@/components/common/Loading";
import React, { Suspense, lazy } from "react";

// Route-level code splitting: lazy load pages so initial bundle is small
const Index = lazy(() => import("@/features/dashboard/pages/Index"));
const Dollars = lazy(() => import("@/features/financial/pages/Dollars"));
const Liquidation = lazy(() => import("@/features/dashboard/pages/Liquidation"));
const HeatMaps = lazy(() => import("@/features/dashboard/pages/HeatMaps"));
const Inventory = lazy(() => import("@/features/dashboard/pages/Inventory"));
const InvChartBatches = lazy(() => import("@/features/dashboard/pages/InvChartBatches"));
const Timeline = lazy(() => import("@/features/dashboard/pages/Timeline"));
const Reports = lazy(() => import("@/features/reports/pages/Reports"));
const FAQ = lazy(() => import("@/features/support/pages/FAQ"));
const Notices = lazy(() => import("@/features/support/pages/Notices"));
const StateIssues = lazy(() => import("@/features/shared/pages/StateIssues"));
const ClientGuide = lazy(() => import("@/features/support/pages/ClientGuide"));
const ScheduleBatchReport = lazy(() => import("@/features/reports/pages/ScheduleBatchReport"));
const DocumentTransfer = lazy(() => import("@/features/shared/pages/DocumentTransfer"));
const Administration = lazy(() => import("@/features/administration/pages/Administration"));
const CompanyRegister = lazy(() => import("@/features/administration/pages/CompanyRegister"));
const ViewBillOfSale = lazy(() => import("@/features/administration/pages/ViewBillOfSale"));
const ViewLicenseMatrix = lazy(() => import("@/features/administration/pages/ViewLicenseMatrix"));
const AddCompany = lazy(() => import("@/features/administration/pages/AddCompany"));
const AddContact = lazy(() => import("@/features/administration/pages/AddContact"));
const ViewContact = lazy(() => import("@/features/administration/pages/ViewContact"));
const ManageUser = lazy(() => import("@/features/administration/pages/ManageUser"));
const ManageEmailContent = lazy(() => import("@/features/administration/pages/ManageEmailContent"));
const ManageSIFParameters = lazy(() => import("@/features/administration/pages/ManageSIFParameters"));
const JudgmentPerformance = lazy(() => import("@/features/dashboard/pages/JudgmentPerformance"));
const NotFound = lazy(() => import("@/features/shared/pages/NotFound"));

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
              <Route path="/administration/*" element={<Administration />} />
              <Route path="/administration/manage-company/company-register" element={<CompanyRegister />} />
              <Route path="/administration/manage-company/view-bill-of-sale" element={<ViewBillOfSale />} />
              <Route path="/administration/manage-company/view-license-matrix" element={<ViewLicenseMatrix />} />
              <Route path="/administration/manage-company/add-company" element={<AddCompany />} />
              <Route path="/administration/manage-contact/add-contact" element={<AddContact />} />
              <Route path="/administration/manage-contact/view-contact" element={<ViewContact />} />
              <Route path="/administration/manage-contact/manage-user" element={<ManageUser />} />
              <Route path="/administration/control-file/sif-form-control/manage-email-content" element={<ManageEmailContent />} />
              <Route path="/administration/control-file/sif-form-control/manage-sif-parameters" element={<ManageSIFParameters />} />
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
