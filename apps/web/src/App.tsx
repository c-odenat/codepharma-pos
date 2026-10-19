import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import LoginView from "./views/LoginView";
import POSView from "./views/POSView";
import InventoryView from "./views/InventoryView";
import PrescriptionsView from "./views/PrescriptionsView";
import CustomersView from "./views/CustomersView";
import ReportsView from "./views/ReportsView";
import SettingsView from "./views/SettingsView";
import Header from "./components/Header";

function AppContent() {
  const { auth } = useAuth();
  const [currentView, setCurrentView] = useState("pos");
  const [mode, setMode] = useState<"standalone" | "terminal" | "server">("standalone");
  const [currency, setCurrency] = useState("USD");

  if (!auth) {
    return <LoginView />;
  }

  const renderView = () => {
    switch (currentView) {
      case "pos":
        return <POSView />;
      case "inventory":
        return <InventoryView />;
      case "prescriptions":
        return <PrescriptionsView />;
      case "customers":
        return <CustomersView />;
      case "reports":
        return <ReportsView />;
      case "settings":
        return <SettingsView mode={mode} currency={currency} onModeChange={setMode} onCurrencyChange={setCurrency} />;
      default:
        return <POSView />;
    }
  };

  return (
    <>
      <Header currentView={currentView} onViewChange={setCurrentView} mode={mode} currency={currency} />
      {renderView()}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
