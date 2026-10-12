function Dashboard({ books, transactions }) {
  const totalTitles = books.length;
  const totalCopies = books.reduce((sum, book) => sum + Number(book.quantity || 0), 0);
  const lowStockBooks = books.filter((book) => Number(book.quantity) < 2);

  return (
    <section>
      <h1>Dashboard</h1>
      <p>Here is the current availability of books in the library.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <div>Total book titles</div>
          <p className="stat-number">{totalTitles}</p>
        </div>
        <div className="stat-card">
          <div>Total copies in stock</div>
          <p className="stat-number">{totalCopies}</p>
        </div>
        <div className="stat-card">
          <div>Low-stock titles</div>
          <p className="stat-number">{lowStockBooks.length}</p>
        </div>
        <div className="stat-card">
          <div>Recorded transactions</div>
          <p className="stat-number">{transactions.length}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Book availability</h2>
        {books.length === 0 ? (
          <p>No books have been added yet. Open the Books page to add a book.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>ISBN</th>
                  <th>Copies</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr className={Number(book.quantity) < 2 ? "low-stock" : ""} key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.isbn}</td>
                    <td>{book.quantity}{Number(book.quantity) < 2 ? " (Low stock)" : ""}</td>
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

export default Dashboard;
