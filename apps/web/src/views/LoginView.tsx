import { useState, FormEvent } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function LoginView() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const username = form.get("username")?.toString() || "";
    const password = form.get("password")?.toString() || "";
    
    try {
      await login(username, password);
    } catch (err) {
      setError("Invalid credentials. Try admin/admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-view">
      <div className="login-card">
        <div className="login-header">
          <h1>CodePharma POS</h1>
          <p>Professional Pharmacy Management System</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              className="input"
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                style={{ paddingRight: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                  fontSize: "18px"
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-primary btn-block" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="login-footer">
          <p className="text-muted">Demo: admin/admin • pharmacist/admin • cashier/admin</p>
        </div>
      </div>
    </div>
  );
}
