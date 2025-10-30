import BookCard from "./BookCard";

export default function BookList({ books }){
  if(!books) return null;
  if(books.length === 0) {
    return <div className="text-center py-12 text-gray-500">No results yet. Try a search above.</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {books.map(b => <BookCard key={b.key} book={b} />)}
    </div>
  );
}
