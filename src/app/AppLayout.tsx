import { Outlet } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream dark:bg-dark-bg">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
