export default function BookCard({ book }){
  // cover url if cover_i exists
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="flex gap-4 p-3 border rounded-lg items-start">
      <div className="w-20 h-28 flex-shrink-0 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
        {cover ? (
          <img src={cover} alt={book.title} className="object-cover w-full h-full" />
        ) : (
          <div className="text-xs text-gray-400 px-2 text-center">No cover</div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{book.title}</h3>
        <div className="text-sm text-gray-600 mt-1">{book.author}</div>
        <div className="text-xs text-gray-500 mt-2">First published: {book.year}</div>
      </div>
    </div>
  );
}
