import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  if (!book || !book.key) return null;

  const bookId = book.key.replace("/works/", "");
  const bookCover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` // Use large high-quality cover
    : "https://via.placeholder.com/200x300?text=No+Cover"; // Placeholder if no cover

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col h-full">
    {/* High-quality Book Cover */}
    <img
      src={bookCover}
      alt={book.title}
      className="w-full h-64 object-cover rounded-t-lg"
    />

    {/* Book Details */}
    <div className="p-4 flex flex-col flex-grow justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {book.title}
        </h2>
        <p className="text-sm text-gray-600">
          {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
        </p>
        <p className="text-sm text-gray-500">
          📅 First Published: {book.first_publish_year || "N/A"}
        </p>
        <p className="text-sm text-gray-500">
          🏢 Publisher: {book.publisher ? book.publisher[0] : "N/A"}
        </p>
      </div>

      {/* View Details Button - Always at Bottom */}
      <Link
        to={`/book/${bookId}`}
        className="mt-3 block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        View Details
      </Link>
    </div>
  </div>
  );
};

export default BookCard;
