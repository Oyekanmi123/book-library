import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null);
  const [author, setAuthor] = useState("Unknown Author");
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        setBook(data);

        if (data.authors?.length > 0) {
          const authorKeys = data.authors.map(authorObj => authorObj.author.key.replace("/authors/", ""));
          const authorDetails = await Promise.all(
            authorKeys.map(async (key) => {
              const authorRes = await fetch(`https://openlibrary.org/authors/${key}.json`);
              return authorRes.json();
            })
          );
          const authorNames = authorDetails.map(author => author.name || "Unknown Author");
          setAuthor(authorNames.join(", "));
        }

        if (data.edition_key?.length > 0) {
          const editionRes = await fetch(`https://openlibrary.org/books/${data.edition_key[0]}.json`);
          const editionData = await editionRes.json();
          setEdition(editionData);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching book details:", error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-600">Loading book details...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-300 flex items-center justify-center py-12 px-6">
      
    {/* Book Card */}
    <div className="max-w-3xl w-full p-6 bg-[#EDE7F6] shadow-lg rounded-lg border border-gray-300">
      
      {/* Book Cover & Details Wrapper */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Book Cover */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img 
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`} 
            alt={book?.title || "Book Cover"} 
            className="w-48 h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">{book?.title || "Title Unavailable"}</h1>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Author(s):</span> {author || "Unknown Author"}
          </p>
          <p className="text-gray-600">
            📅 <span className="font-semibold">Published:</span> {edition?.publish_date || book?.first_publish_date || "Not Available"}
          </p>
          <p className="text-gray-600">
            🏢 <span className="font-semibold">Publisher:</span> {edition?.publishers?.[0] || "Not Available"}
          </p>
          <p className="text-gray-600">
            📖 <span className="font-semibold">Pages:</span> {edition?.number_of_pages || "Not Listed"}
          </p>

          {/* Subjects */}
          {book?.subjects && book.subjects.length > 0 ? (
            <div>
              <h3 className="font-semibold text-gray-700">📚 Subjects:</h3>
              <p className="text-gray-600">
                {book.subjects.slice(0, 6).join(", ")} {book.subjects.length > 6 && "..."}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">📚 No subjects listed.</p>
          )}
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700">📖 Description:</h3>
        <p className="text-gray-700">
          {showFullDescription
            ? book?.description?.value || "No description available"
            : (book?.description?.value?.slice(0, 200) || "No description available") + "..."}
        </p>
        {book?.description?.value && book.description.value.length > 200 && (
          <button 
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-indigo-600 font-semibold hover:underline mt-2 transition duration-300"
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-[#B185DB] text-white rounded-md shadow-md hover:bg-[#9A6ACB] 
          transform hover:scale-105 transition duration-300"
        >
          ← Back
        </button>
        <a 
          href={`https://openlibrary.org/works/${id}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-6 py-2 bg-gradient-to-r from-[#C2A2E3] to-[#8B5FBF] text-white font-semibold rounded-lg shadow-md 
          hover:from-[#B185DB] hover:to-[#7D5BA6] hover:text-white transform hover:scale-105 transition duration-300 
          flex items-center justify-center"
        >
          📖 Preview Book
        </a>
      </div>

    </div>
  </div>
  );
};

export default BookDetails;