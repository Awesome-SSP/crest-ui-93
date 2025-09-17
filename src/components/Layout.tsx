import { ReactNode } from "react";
import Navbar from "./Navbar";
import Breadcrumb from "./ui/breadcrumb";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen w-full bg-background">
      <Navbar />
      <Breadcrumb />
      <main className="flex-1 overflow-auto bg-content-background">
        {children}
      </main>
    </div>
  );
};

export default Layout;