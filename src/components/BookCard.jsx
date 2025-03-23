import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  
  const bookId = book.key.replace("/works/", "");

  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <img
        src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : "https://via.placeholder.com/150"}
        alt={book.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-lg font-bold mt-2">{book.title}</h2>
      <p className="text-sm text-gray-600">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-sm text-gray-500">📅 First published: {book.first_publish_year || "N/A"}</p>
      <p className="text-sm text-gray-500">🏢 Publisher: {book.publisher ? book.publisher[0] : "N/A"}</p>

      <Link to={`/book/${bookId}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;