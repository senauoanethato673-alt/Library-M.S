import { NavLink } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand">Library Management</div>
      <nav className="nav-links">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/books">Books</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        {currentUser.role === "admin" && <NavLink to="/users">Users</NavLink>}
        <span>{currentUser.name}</span>
        <button className="secondary" onClick={onLogout}>Log out</button>
      </nav>
    </header>
  );
}

export default Navbar;
