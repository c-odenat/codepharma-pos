import { useAuth } from "../contexts/AuthContext";

type NavItem = {
  label: string;
  view: string;
  permission?: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: "Point of Sale", view: "pos", permission: "process_sale", icon: "🛒" },
  { label: "Inventory", view: "inventory", permission: "manage_inventory", icon: "📦" },
  { label: "Prescriptions", view: "prescriptions", permission: "manage_prescriptions", icon: "📋" },
  { label: "Customers", view: "customers", permission: "manage_customers", icon: "👥" },
  { label: "Reports", view: "reports", permission: "view_reports", icon: "📊" },
  { label: "Settings", view: "settings", icon: "⚙️" }
];

type HeaderProps = {
  currentView: string;
  onViewChange: (view: string) => void;
  mode: string;
  currency: string;
};

export default function Header({ currentView, onViewChange, mode, currency }: HeaderProps) {
  const { auth, logout, hasPermission } = useAuth();

  return (
    <header className="app-header">
      <div className="header-brand">
        <h1>CodePharma</h1>
        <span className="brand-tag">Professional POS</span>
      </div>

      <nav className="header-nav">
        {navItems.map((item) => {
          if (item.permission && !hasPermission(item.permission)) return null;
          return (
            <button
              key={item.view}
              className={`nav-btn ${currentView === item.view ? "active" : ""}`}
              onClick={() => onViewChange(item.view)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="header-info">
        <span className="info-badge">{mode}</span>
        <span className="info-badge">{currency}</span>
        <span className="info-badge">{auth?.role}</span>
        <span className="user-name">{auth?.username}</span>
        <button className="btn-secondary btn-sm" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
