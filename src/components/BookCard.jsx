const BookCard = ({ book }) => {
    return (
      <div className="border p-4 rounded-md shadow-md">
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={book.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h2 className="text-lg font-bold mt-2">{book.title}</h2>
        <p className="text-sm text-gray-600">
          {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </p>
      </div>
    );
  };
  
  export default BookCard;