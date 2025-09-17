import React, { useState } from "react";
import Hero from "@/components/Hero";
import FoodScanner from "@/components/FoodScanner";
import NutritionAnalysis from "@/components/NutritionAnalysis";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [scanResult, setScanResult] = useState<any>(null);
  const [currentView, setCurrentView] = useState<"hero" | "scanner" | "dashboard">("hero");

  const handleScanResult = (result: any) => {
    setScanResult(result);
  };

  const navigateToScanner = () => {
    setCurrentView("scanner");
  };

  const navigateToDashboard = () => {
    setCurrentView("dashboard");
  };

  const navigateToHero = () => {
    setCurrentView("hero");
    setScanResult(null);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button 
              onClick={navigateToHero}
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              SNAPFOOD AI
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={navigateToScanner}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === "scanner" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Scanner
              </button>
              <button
                onClick={navigateToDashboard}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === "dashboard" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {currentView === "hero" && (
        <div onClick={navigateToScanner}>
          <Hero />
        </div>
      )}

      {currentView === "scanner" && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <FoodScanner onScanResult={handleScanResult} />
              </div>
              
              {scanResult && (
                <div className="space-y-6">
                  <NutritionAnalysis data={scanResult} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {currentView === "dashboard" && <Dashboard />}

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            SNAPFOOD AI - Empowering healthier eating across Africa. 
            <br className="sm:hidden" />
            <span className="ml-2">Offline-first • Privacy-focused • Culturally relevant</span>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
