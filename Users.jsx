import { useState } from "react";

const emptyUser = {
  name: "",
  membershipId: "",
  password: "",
  role: "user"
};

function Users({ users, setUsers }) {
  const [form, setForm] = useState(emptyUser);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.name.trim() || !form.membershipId.trim() || !form.password) {
      setMessage("Please enter a name, membership ID and password.");
      return;
    }

    const duplicate = users.some(
      (user) => user.membershipId === form.membershipId.trim() && user.id !== editingId
    );

    if (duplicate) {
      setMessage("That membership ID is already being used.");
      return;
    }

    if (editingId !== null) {
      setUsers(users.map((user) =>
        user.id === editingId
          ? { ...user, ...form, name: form.name.trim(), membershipId: form.membershipId.trim() }
          : user
      ));
      setMessage("User details updated.");
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          ...form,
          name: form.name.trim(),
          membershipId: form.membershipId.trim()
        }
      ]);
      setMessage("User added.");
    }

    setForm(emptyUser);
    setEditingId(null);
  }

  function editUser(user) {
    setForm({
      name: user.name,
      membershipId: user.membershipId,
      password: user.password,
      role: user.role
    });
    setEditingId(user.id);
    setMessage("");
  }

  function deleteUser(user) {
    if (user.role === "admin" && users.filter((item) => item.role === "admin").length === 1) {
      setMessage("You cannot delete the only administrator.");
      return;
    }

    if (window.confirm(`Delete ${user.name}?`)) {
      setUsers(users.filter((item) => item.id !== user.id));
      setMessage("User deleted.");
      if (editingId === user.id) {
        setEditingId(null);
        setForm(emptyUser);
      }
    }
  }

  return (
    <section>
      <h1>User Management</h1>
      <div className="panel">
        <h2>{editingId === null ? "Add a user" : "Update user"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Full name
              <input name="name" value={form.name} onChange={handleChange} />
            </label>
            <label>Membership ID
              <input name="membershipId" value={form.membershipId} onChange={handleChange} />
            </label>
            <label>Password
              <input name="password" type="password" value={form.password} onChange={handleChange} />
            </label>
            <label>Role
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </label>
          </div>
          <div className="actions">
            <button type="submit">{editingId === null ? "Add user" : "Save changes"}</button>
            {editingId !== null && (
              <button type="button" className="secondary" onClick={() => {
                setEditingId(null);
                setForm(emptyUser);
                setMessage("");
              }}>Cancel</button>
            )}
          </div>
        </form>
        {message && <p className={message.includes("already") || message.includes("cannot") ? "error" : "message"}>{message}</p>}
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Library users</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Membership ID</th><th>Role</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.membershipId}</td>
                  <td>{user.role}</td>
                  <td>
                    <div className="actions">
                      <button type="button" onClick={() => editUser(user)}>Update</button>
                      <button type="button" className="danger" onClick={() => deleteUser(user)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Users;
