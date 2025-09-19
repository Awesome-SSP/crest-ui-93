import { ReactNode } from "react";
import { Header } from "./header";
import NavBar from "./NavBar";
import Breadcrumb from "./ui/breadcrumb";
import { Footer } from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-background">
  <Header />
      <Breadcrumb />
      <main className="flex-1 overflow-auto bg-content-background">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;