export default function PrescriptionsView() {
  return (
    <div className="view-container">
      <div className="view-header">
        <h2>Prescription Management</h2>
        <button className="btn-primary">New Prescription</button>
      </div>
      <div className="view-content">
        <div className="info-card">
          <h3>📋 Prescriptions Module</h3>
          <p>Electronic prescription management with full compliance tracking.</p>
          <ul>
            <li>eRx capture & validation</li>
            <li>Doctor verification</li>
            <li>Controlled substance tracking</li>
            <li>Dispensing records</li>
            <li>Patient counseling notes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
