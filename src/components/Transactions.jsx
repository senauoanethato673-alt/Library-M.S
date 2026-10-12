import { useState } from "react";

function Transactions({ books, setBooks, transactions, setTransactions, currentUser }) {
  const [bookId, setBookId] = useState("");
  const [action, setAction] = useState("add");
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const amount = Number(quantity);
    const selectedBook = books.find((book) => String(book.id) === bookId);

    if (!selectedBook) {
      setMessage("Please choose a book.");
      return;
    }

    if (!Number.isInteger(amount) || amount < 1) {
      setMessage("Enter a whole number greater than zero.");
      return;
    }

    if (action === "deduct" && amount > Number(selectedBook.quantity)) {
      setMessage("There are not enough copies in stock.");
      return;
    }

    const newQuantity = action === "add"
      ? Number(selectedBook.quantity) + amount
      : Number(selectedBook.quantity) - amount;

    setBooks(books.map((book) =>
      book.id === selectedBook.id ? { ...book, quantity: newQuantity } : book
    ));

    const newTransaction = {
      id: Date.now(),
      bookTitle: selectedBook.title,
      action,
      quantity: amount,
      date: new Date().toLocaleString(),
      staffName: currentUser.name
    };

    setTransactions([newTransaction, ...transactions]);
    setMessage("Transaction saved successfully.");
    setQuantity("1");
  }

  return (
    <section>
      <h1>Stock Transactions</h1>
      <div className="panel">
        <h2>Add or deduct stock</h2>
        {books.length === 0 ? (
          <p>Add a book on the Books page before recording a transaction.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>Book
                <select value={bookId} onChange={(event) => setBookId(event.target.value)}>
                  <option value="">Choose a book</option>
                  {books.map((book) => (
                    <option key={book.id} value={book.id}>
                      {book.title} (stock: {book.quantity})
                    </option>
                  ))}
                </select>
              </label>
              <label>Transaction type
                <select value={action} onChange={(event) => setAction(event.target.value)}>
                  <option value="add">Add stock (new books)</option>
                  <option value="deduct">Deduct stock (borrowed books)</option>
                </select>
              </label>
              <label>Number of copies
                <input type="number" min="1" step="1" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
              </label>
            </div>
            <button type="submit">Save transaction</button>
          </form>
        )}
        {message && <p className={message.startsWith("Transaction") ? "message" : "error"}>{message}</p>}
      </div>

      <div className="panel" style={{ marginTop: 20 }}>
        <h2>Transaction history</h2>
        {transactions.length === 0 ? (
          <p>No transactions have been recorded.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Date</th><th>Book</th><th>Action</th><th>Copies</th><th>Recorded by</th></tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.bookTitle}</td>
                    <td>{item.action === "add" ? "Stock added" : "Stock deducted"}</td>
                    <td>{item.quantity}</td>
                    <td>{item.staffName}</td>
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

export default Transactions;
