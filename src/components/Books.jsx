import { useState } from "react";

const emptyBook = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  quantity: "1"
};

function Books({ books, setBooks }) {
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.title.trim() || !form.author.trim() || !form.genre.trim() || !form.isbn.trim()) {
      setMessage("Please complete all book fields.");
      return;
    }

    if (Number(form.quantity) < 0 || form.quantity === "") {
      setMessage("Quantity must be zero or more.");
      return;
    }

    if (editingId !== null) {
      setBooks(books.map((book) =>
        book.id === editingId
          ? { ...book, ...form, quantity: Number(form.quantity) }
          : book
      ));
      setMessage("Book details updated.");
    } else {
      const newBook = {
        id: Date.now(),
        ...form,
        quantity: Number(form.quantity)
      };
      setBooks([...books, newBook]);
      setMessage("Book added successfully.");
    }

    setForm(emptyBook);
    setEditingId(null);
  }

  function editBook(book) {
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: String(book.quantity)
    });
    setEditingId(book.id);
    setMessage("");
  }

  function deleteBook(id) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
      setMessage("Book deleted.");
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyBook);
      }
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyBook);
    setMessage("");
  }

  return (
    <section>
      <h1>Book Management</h1>
      <div className="panel">
        <h2>{editingId === null ? "Add a new book" : "Update book"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>Title
              <input name="title" value={form.title} onChange={handleChange} />
            </label>
            <label>Author
              <input name="author" value={form.author} onChange={handleChange} />
            </label>
            <label>Genre
              <input name="genre" value={form.genre} onChange={handleChange} />
            </label>
            <label>ISBN
              <input name="isbn" value={form.isbn} onChange={handleChange} />
            </label>
            <label>Initial quantity
              <input name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} />
            </label>
          </div>
          <div className="actions">
            <button type="submit">{editingId === null ? "Add book" : "Save changes"}</button>
            {editingId !== null && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Books in the library</h2>
        {books.length === 0 ? (
          <p>No books yet. Use the form above to add your first book.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Title</th><th>Author</th><th>Genre</th><th>ISBN</th><th>Copies</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className={Number(book.quantity) < 2 ? "low-stock" : ""}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}</td>
                    <td>
                      <div className="actions">
                        <button type="button" onClick={() => editBook(book)}>Update</button>
                        <button type="button" className="danger" onClick={() => deleteBook(book.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Books;
