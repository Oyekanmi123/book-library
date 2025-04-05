import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  if (!book || !book.key) return null;

  const bookId = book.key.replace("/works/", "");
  const bookCover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover"; // Placeholder image

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 flex flex-col  h-[500px] max-h-[500px]">
      <img
        src={bookCover}
        alt={book.title}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {book.title}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-1">
            ✍ {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
          </p>
          <p className="text-sm text-gray-500">
            📅 First Published: {book.first_publish_year || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            🌍 Language: {book.language 
              ? book.language.slice(0, 2).map(lang => lang.toUpperCase()).join(", ")
              : "Unknown"}
          </p>
        </div>
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