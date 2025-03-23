import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [edition, setEdition] = useState(null);
  const [author, setAuthor] = useState("Unknown Author");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        const data = await res.json();
        console.log("Works API Response:", data);
        setBook(data);
  
        // Ensure `authors` exist and is not empty
        if (data.authors && data.authors.length > 0) {
          const authorKeys = data.authors.map(authorObj => authorObj.author.key.replace("/authors/", "")); // Extract author keys
          console.log("Extracted Author Keys:", authorKeys);
  
          // Fetch all authors' details
          const authorDetails = await Promise.all(
            authorKeys.map(async (key) => {
              const authorRes = await fetch(`https://openlibrary.org/authors/${key}.json`);
              return authorRes.json();
            })
          );
  
          console.log("Author API Responses:", authorDetails);
  
          // Set all author names
          const authorNames = authorDetails.map(author => author.name || "Unknown Author");
          setAuthor(authorNames.join(", ")); // Join multiple names into a single string
        }
        // Fetch edition details if available
        if (data.edition_key?.length > 0) {
          const editionRes = await fetch(`https://openlibrary.org/books/${data.edition_key[0]}.json`);
          const editionData = await editionRes.json();
          console.log("Edition API Response:", editionData);
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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{book?.title || "Title Unavailable"}</h1>
      <p className="text-lg text-gray-600">Author(s): {author || "Unknown Author"}</p>
      <p className="text-sm text-gray-500">
        📅 Published: {edition?.publish_date || book?.first_publish_date || "Not Available"}
      </p>
      <p className="text-sm text-gray-500">🏢 Publisher: {edition?.publishers?.[0] || "Not Available"}</p>
      <p className="text-sm text-gray-500">📖 Pages: {edition?.number_of_pages || "Not Listed"}</p>
      <p className="text-sm text-gray-500">
        📚 Subjects: {book?.subjects?.join(", ") || "No subjects listed"}
      </p>
      <p className="mt-4">{book?.description?.value || "No description available"}</p>
      <a href="/" className="text-blue-500 hover:underline mt-4 block">Back to Books</a>
    </div>
  );
};

export default BookDetails;