import { useState } from "react";
import BookList from "./components/BookList";

export default function App(){
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchBooks(e){
    e?.preventDefault?.();
    if(!query.trim()) {
      setError("Please enter a book title or keyword.");
      return;
    }
    setError("");
    setLoading(true);
    setBooks([]);
    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=20`;
      const res = await fetch(url);
      if(!res.ok) throw new Error("Network response not ok");
      const data = await res.json();
      const docs = data.docs || [];
      // map to data we need
      const mapped = docs.map(d => ({
        key: d.key,
        title: d.title,
        author: (d.author_name && d.author_name.join(", ")) || "Unknown",
        year: d.first_publish_year || "—",
        cover_i: d.cover_i || null
      }));
      setBooks(mapped);
    } catch(err){
      console.error(err);
      setError("Failed to fetch results. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">Book Finder</h1>
        <p className="text-sm text-gray-600 mb-4">Search books by title (uses Open Library API)</p>

        <form onSubmit={searchBooks} className="flex gap-2 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type book title (e.g., harry potter)"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg">
            Search
          </button>
        </form>

        {error && <div className="text-sm text-red-600 mb-3">{error}</div>}
        {loading && <div className="text-sm text-gray-500 mb-3">Loading...</div>}

        <BookList books={books} />
      </div>
      <div className="max-w-3xl mx-auto mt-6 text-sm text-gray-500">
        Tip: Try titles like <b>harry potter</b>, <b>pride and prejudice</b>, or <b>data science</b>.
      </div>
    </div>
  );
}
