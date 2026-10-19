import { useState } from "react";
import { currencyCatalog } from "@codepharma/shared";

type SettingsViewProps = {
  mode: string;
  currency: string;
  onModeChange: (mode: string) => void;
  onCurrencyChange: (currency: string) => void;
};

export default function SettingsView({
  mode,
  currency,
  onModeChange,
  onCurrencyChange
}: SettingsViewProps) {
  const [terminalId, setTerminalId] = useState("TERM-001");
  const [outletName, setOutletName] = useState("Main Pharmacy");

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Settings & Configuration</h2>
      </div>
      <div className="view-content">
        <div className="settings-section">
          <h3>Deployment Mode</h3>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="standalone"
                checked={mode === "standalone"}
                onChange={(e) => onModeChange(e.target.value)}
              />
              <div>
                <strong>Standalone</strong>
                <p className="text-muted">Offline-capable with local SQLite database</p>
              </div>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="terminal"
                checked={mode === "terminal"}
                onChange={(e) => onModeChange(e.target.value)}
              />
              <div>
                <strong>Terminal</strong>
                <p className="text-muted">Local UI connected to central API server</p>
              </div>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="mode"
                value="server"
                checked={mode === "server"}
                onChange={(e) => onModeChange(e.target.value)}
              />
              <div>
                <strong>Main Server</strong>
                <p className="text-muted">Headquarters / central management</p>
              </div>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Regional Settings</h3>
          <div className="form-group">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              className="input"
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
            >
              {currencyCatalog.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} — {c.name} {c.symbol ? `(${c.symbol})` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>Terminal Configuration</h3>
          <div className="form-group">
            <label htmlFor="terminalId">Terminal ID</label>
            <input
              id="terminalId"
              type="text"
              className="input"
              value={terminalId}
              onChange={(e) => setTerminalId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="outletName">Outlet Name</label>
            <input
              id="outletName"
              type="text"
              className="input"
              value={outletName}
              onChange={(e) => setOutletName(e.target.value)}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Compliance & Regulations</h3>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Require prescription verification for Rx items</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Enable controlled substance tracking</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Enforce expiry date warnings</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Record all transactions for audit trail</span>
            </label>
          </div>
        </div>

        <button className="btn-primary">Save Settings</button>
      </div>
    </div>
  );
}
