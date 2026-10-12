import { useState } from "react";

function Login({ onLogin }) {
  const [membershipId, setMembershipId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!membershipId.trim() || !password) {
      setError("Please enter your membership ID and password.");
      return;
    }

    const loginError = onLogin(membershipId.trim(), password);
    setError(loginError);
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h1>Library Login</h1>
        <p className="small-note">Sign in to manage books and library stock.</p>
        <form onSubmit={handleSubmit}>
          <label>
            Membership ID
            <input
              value={membershipId}
              onChange={(event) => setMembershipId(event.target.value)}
              placeholder="Enter membership ID"
            />
          </label>
          <br />
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit">Log in</button>
        </form>
        <p className="small-note">
          For your first test, use the login details in your README file.
        </p>
      </section>
    </div>
  );
}

export default Login;
