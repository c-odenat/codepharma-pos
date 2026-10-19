export default function CustomersView() {
  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Customer Management</h2>
        <button className="btn-primary">Add Customer</button>
      </div>
      <div className="view-content">
        <div className="info-card">
          <h3>👥 Customers Module</h3>
          <p>Maintain customer profiles with medication history and preferences.</p>
          <ul>
            <li>Customer profiles & contact info</li>
            <li>Allergy tracking</li>
            <li>Insurance information</li>
            <li>Purchase history</li>
            <li>Loyalty programs</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
