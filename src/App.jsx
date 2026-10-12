import login from "./pages/login"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Transactions from "./pages/Transactions";
import Users from "./pages/Users";
import { getData, saveData } from "./utils/storage";

function App() {
  const [currentUser, setCurrentUser] = useState(() => getData("currentUser", null));
  const [books, setBooks] = useState(() => getData("books", []));
  const [users, setUsers] = useState(() =>
    getData("users", [
      { id: 1, name: "Library Admin", membershipId: "2003", password: "27march2003", role: "admin" }
    ])
  );
  const [transactions, setTransactions] = useState(() => getData("transactions", []));
  const navigate = useNavigate();

  useEffect(() => saveData("books", books), [books]);
  useEffect(() => saveData("users", users), [users]);
  useEffect(() => saveData("transactions", transactions), [transactions]);
  useEffect(() => saveData("currentUser", currentUser), [currentUser]);

  function handleLogin(membershipId, password) {
    const foundUser = users.find(
      (user) => user.membershipId === membershipId && user.password === password
    );

    if (!foundUser) {
      return "Membership ID or password is incorrect.";
    }

    setCurrentUser(foundUser);
    navigate("/");
    return "";
  }

  function handleLogout() {
    setCurrentUser(null);
    navigate("/login");
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<Dashboard books={books} transactions={transactions} />} />
          <Route
            path="/books"
            element={<Books books={books} setBooks={setBooks} />}
          />
          <Route
            path="/transactions"
            element={
              <Transactions
                books={books}
                setBooks={setBooks}
                transactions={transactions}
                setTransactions={setTransactions}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/users"
            element={
              currentUser.role === "admin" ? (
                <Users users={users} setUsers={setUsers} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
