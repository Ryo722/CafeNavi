import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/ui/Header";
import { Footer } from "../components/ui/Footer";
import { Loading } from "../components/ui/Loading";

export function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-cafe-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
      >
        メインコンテンツにスキップ
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
