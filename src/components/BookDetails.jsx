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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-indigo-300 flex items-center justify-center py-10 px-4">
      
      {/* Book Card */}
      <div className="max-w-3xl mx-auto p-6 bg-[#EDE7F6] shadow-lg rounded-lg border border-gray-300 transform transition hover:scale-105 duration-300 ease-in-out">
        
        {/* Book Cover */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img 
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`} 
            alt={book?.title || "Book Cover"} 
            className="w-48 h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{book?.title || "Title Unavailable"}</h1>
          <p className="text-lg text-gray-700"><span className="font-semibold">Author(s):</span> {author || "Unknown Author"}</p>
          <p className="text-sm text-gray-500 mt-2">
            📅 <span className="font-semibold">Published:</span> {edition?.publish_date || book?.first_publish_date || "Not Available"}
          </p>
          <p className="text-sm text-gray-500">
            🏢 <span className="font-semibold">Publisher:</span> {edition?.publishers?.[0] || "Not Available"}
          </p>
          <p className="text-sm text-gray-500">
            📖 <span className="font-semibold">Pages:</span> {edition?.number_of_pages || "Not Listed"}
          </p>
          <p className="text-sm text-gray-500">
            📚 <span className="font-semibold">Subjects:</span> {book?.subjects?.join(", ") || "No subjects listed"}
          </p>
          
          {/* Description with "Read More" Toggle */}
          <div className="mt-4 overflow-hidden">
            <p className="text-gray-800 break-words whitespace-pre-wrap">
              {showFullDescription
                ? book?.description?.value || "No description available"
                : (book?.description?.value?.slice(0, 200) || "No description available") + "..."}
            </p>
            {book?.description?.value && book?.description?.value.length > 200 && (
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-indigo-600 font-semibold hover:underline mt-2 transition duration-300 focus:outline-none"
              >
                {showFullDescription ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-5 flex gap-3">
            <button 
              onClick={() => navigate(-1)} 
              className="px-4 py-2 bg-[#B185DB] text-white rounded-md shadow-md hover:bg-[#9A6ACB] 
              transform hover:scale-105 transition duration-300 hover:border-none"
            >
              ← Back
            </button>
            <a 
              href={`https://openlibrary.org/works/${id}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2 bg-gradient-to-r from-[#C2A2E3] to-[#8B5FBF] text-white font-semibold rounded-lg shadow-md 
              hover:from-[#B185DB] hover:to-[#7D5BA6] hover:text-white transform hover:scale-105 transition duration-300 
              flex items-center justify-center text-center w-full sm:w-auto"
            >
              📖 Preview Book
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetails;