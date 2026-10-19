export default function ReportsView() {
  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Reports & Analytics</h2>
        <div>
          <select className="input" defaultValue="daily">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="btn-primary">Generate Report</button>
        </div>
      </div>
      <div className="view-content">
        <div className="reports-grid">
          <div className="report-card">
            <h4>Sales Summary</h4>
            <div className="report-value">$12,450.00</div>
            <p className="text-muted">Today's revenue</p>
          </div>
          <div className="report-card">
            <h4>Transactions</h4>
            <div className="report-value">156</div>
            <p className="text-muted">Completed sales</p>
          </div>
          <div className="report-card">
            <h4>Low Stock Items</h4>
            <div className="report-value">8</div>
            <p className="text-muted">Need reorder</p>
          </div>
          <div className="report-card">
            <h4>Prescriptions</h4>
            <div className="report-value">42</div>
            <p className="text-muted">Dispensed today</p>
          </div>
        </div>
        <div className="info-card">
          <h3>📊 Available Reports</h3>
          <ul>
            <li>Sales & revenue analysis</li>
            <li>Inventory valuation</li>
            <li>Controlled substance audit trail</li>
            <li>Tax reports</li>
            <li>Staff performance</li>
            <li>Customer analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
