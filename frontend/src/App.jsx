import React, { useState } from 'react';
import { Book, Plus, Trash2, CheckCircle, XCircle, Search, RefreshCw, BookOpen } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_DATA = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', is_issued: false },
  { id: 2, title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', is_issued: true },
  { id: 3, title: '1984', author: 'George Orwell', isbn: '9780451524935', is_issued: false },
  { id: 4, title: 'Design Patterns', author: 'Erich Gamma', isbn: '9780201633610', is_issued: false },
];

export default function LibraryApp() {
  const [books, setBooks] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: ''
  });

  // --- API FUNCTIONS ---
  const fetchBooks = () => {
    setLoading(true);
    // Real API call would go here
    setTimeout(() => setLoading(false), 800);
  };

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;
    
    const newBook = { id: Date.now(), ...formData, is_issued: false };
    setBooks([newBook, ...books]);
    setFormData({ title: '', author: '', isbn: '' });
  };

  const handleDelete = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const toggleIssueStatus = (id, currentStatus) => {
    setBooks(books.map(book => book.id === id ? { ...book, is_issued: !currentStatus } : book));
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      {/* INTERNAL CSS FOR SIMPLICITY 
          (You can move this to App.css if you prefer)
      */}
      <style>{`
        /* --- RESET & BASICS --- */
        :root {
          --primary: #6200ea;
          --primary-dark: #3700b3;
          --background: #f5f5f5;
          --surface: #ffffff;
          --text-primary: #212121;
          --text-secondary: #757575;
          --error: #b00020;
          --success: #00c853;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
          --radius: 12px;
        }

        body {
          margin: 0;
          font-family: 'Roboto', 'Segoe UI', sans-serif;
          background-color: var(--background);
          color: var(--text-primary);
          -webkit-font-smoothing: antialiased;
        }

        /* --- LAYOUT --- */
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 24px;
          max-width: 1200px;
          margin: 32px auto;
          padding: 0 16px;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }

        /* --- APP BAR --- */
        .app-bar {
          background-color: var(--primary);
          color: white;
          padding: 16px 0;
          box-shadow: var(--shadow-md);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .app-bar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand h1 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .stats-badge {
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.85rem;
        }

        /* --- CARDS --- */
        .card {
          background: var(--surface);
          border-radius: var(--radius);
          box-shadow: var(--shadow-sm);
          padding: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          box-shadow: var(--shadow-md);
        }

        .card-header h2 {
          margin-top: 0;
          color: var(--primary);
          font-size: 1.25rem;
          margin-bottom: 24px;
        }

        /* --- FORM INPUTS (Material Style) --- */
        .input-group {
          position: relative;
          margin-bottom: 24px;
        }

        .input-group input {
          width: 100%;
          padding: 12px 12px 12px 0;
          font-size: 16px;
          border: none;
          border-bottom: 2px solid #ddd;
          background: transparent;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .input-group label {
          position: absolute;
          top: 12px;
          left: 0;
          color: #999;
          pointer-events: none;
          transition: 0.2s ease all;
        }

        .input-group input:focus ~ label,
        .input-group input:not(:placeholder-shown) ~ label {
          top: -8px;
          font-size: 12px;
          color: var(--primary);
        }

        .input-group input:focus {
          border-bottom-color: var(--primary);
        }

        /* --- BUTTONS --- */
        .btn {
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
          font-size: 0.9rem;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          width: 100%;
          box-shadow: 0 2px 4px rgba(98, 0, 234, 0.3);
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .btn-sm {
          padding: 6px 12px;
          font-size: 0.8rem;
        }

        .btn-outline-warn {
          background: #fff3e0;
          color: #ef6c00;
          border: 1px solid transparent;
        }
        .btn-outline-warn:hover { background: #ffe0b2; }

        .btn-outline-success {
          background: #e8f5e9;
          color: #2e7d32;
          border: 1px solid transparent;
        }
        .btn-outline-success:hover { background: #c8e6c9; }

        .icon-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
          padding: 8px;
          border-radius: 50%;
          transition: background 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-btn:hover {
          background-color: rgba(0,0,0,0.05);
          color: var(--primary);
        }

        .delete-btn:hover {
          color: var(--error);
          background-color: #ffebee;
        }

        /* --- SEARCH BAR --- */
        .search-bar {
          display: flex;
          align-items: center;
          padding: 12px 24px;
          gap: 12px;
          margin-bottom: 24px;
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .search-icon {
          color: var(--text-secondary);
        }

        /* --- BOOK GRID --- */
        .book-grid {
          display: grid;
          gap: 16px;
        }

        .book-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
        }

        .book-info h3 {
          margin: 0 0 4px 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .book-info .author {
          margin: 0 0 12px 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .chips {
          display: flex;
          gap: 8px;
        }

        .chip {
          font-size: 0.75rem;
          padding: 4px 8px;
          border-radius: 6px;
          font-weight: 500;
          background: #eee;
          color: #666;
        }

        .chip.status.available {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .chip.status.issued {
          background: #fff3e0;
          color: #ef6c00;
        }

        .book-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Material App Bar */}
      <header className="app-bar">
        <div className="app-bar-content">
          <div className="brand">
            <BookOpen size={24} />
            <h1>LibManager</h1>
          </div>
          <div className="stats-badge">
            <span>{books.length} Books</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* Left Panel: Add Book Card */}
        <section className="input-section">
          <div className="card form-card">
            <div className="card-header">
              <h2>Add New Book</h2>
            </div>
            <form onSubmit={handleAddBook}>
              <div className="input-group">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <label>Book Title</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
                <label>Author</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  placeholder=" "
                  value={formData.isbn}
                  onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                />
                <label>ISBN (Optional)</label>
              </div>
              <button type="submit" className="btn btn-primary">
                <Plus size={18} /> Add Book
              </button>
            </form>
          </div>
        </section>

        {/* Right Panel: Book List */}
        <section className="list-section">
          <div className="search-bar card">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search library..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchBooks} className="icon-btn" title="Refresh">
              <RefreshCw size={20} className={loading ? 'spinning' : ''} />
            </button>
          </div>

          <div className="book-grid">
            {filteredBooks.length === 0 ? (
              <div className="empty-state">
                <p>No books found.</p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div key={book.id} className="card book-card">
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author">by {book.author}</p>
                    <div className="chips">
                      <span className="chip isbn">{book.isbn || 'No ISBN'}</span>
                      <span className={`chip status ${book.is_issued ? 'issued' : 'available'}`}>
                        {book.is_issued ? 'Issued Out' : 'Available'}
                      </span>
                    </div>
                  </div>
                  <div className="book-actions">
                    <button 
                      onClick={() => toggleIssueStatus(book.id, book.is_issued)}
                      className={`btn btn-sm ${book.is_issued ? 'btn-outline-success' : 'btn-outline-warn'}`}
                    >
                      {book.is_issued ? 'Return' : 'Issue'}
                    </button>
                    <button onClick={() => handleDelete(book.id)} className="icon-btn delete-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}