import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Fantasy", "Drama", "Business", "Education", "Psychology", "Astrology"];

const Home = () => {
  const { books, setBooks } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const storedCategory = localStorage.getItem("selectedCategory"); // Retrieve stored category
    const storedBooks = JSON.parse(localStorage.getItem("searchedBooks")); // Retrieve stored books
  
    if (storedCategory) {
      setSelectedCategory(storedCategory); // Restore category selection
      fetchBooks(storedCategory); // Fetch books based on stored category
    } else if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks); // Restore previous search results
    } else {
      fetchDefaultBooks(); // Load default bestsellers if nothing is stored
    }
  }, [setBooks]);

  const fetchDefaultBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://openlibrary.org/search.json?q=bestseller");
      const bestsellers = response.data.docs.slice(0, 10);
      setBooks(bestsellers);
      localStorage.removeItem("searchedBooks"); // Clear stored searches
    } catch {
      setError("Failed to load default books.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (query = "bestseller", category = "All") => {
    setLoading(true);
    setError("");
  
    let url = `https://openlibrary.org/search.json?q=${query}`;
    
    if (category !== "All") {
      url += `+subject:${category.toLowerCase()}`; // Fetch books by selected category
    }
  
    try {
      const response = await axios.get(url);
      if (!response.data.docs || response.data.docs.length === 0) {
        setError(`No books found for category: ${category}`);
      } else {
        const searchedBooks = response.data.docs.slice(0, 10);
        setBooks(searchedBooks);
        localStorage.setItem("searchedBooks", JSON.stringify(searchedBooks));
      }
    } catch {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setSelectedCategory("All"); // Reset category selection
    localStorage.removeItem("searchedBooks"); // Clear search results from local storage
    setBooks([]); // Reset books state
    fetchDefaultBooks(); // Load bestsellers
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] flex flex-col items-center p-6">
      
      {/* BOOKLY Name & Home Button */}
      <div className="w-full max-w-6xl flex justify-between">
        <h1 className="text-4xl font-bold text-[#1565C0]">BOOKLY</h1>
        <button
          onClick={goHome}
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition focus:outline-none"
        >
          Home
        </button>
      </div>

      {/* Search Bar */}
      <SearchBar onSearch={fetchBooks} />

      {/* Categories Section */}
      <div className="flex flex-wrap justify-center mt-6 space-x-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-gray-700 shadow-md transition focus:outline-none ${
              selectedCategory === category ? "bg-blue-500 text-white" : "bg-white"
            }`}
            onClick={() => {
              setSelectedCategory(category);
              localStorage.setItem("selectedCategory", category); // Store category in localStorage
              fetchBooks("bestseller", category); // Fetch books for selected category
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Book Results */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Book List */}
      <div className="w-full max-w-5xl mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          {localStorage.getItem("searchedBooks") ? "📚 Search Results" : "📚 Popular Bestsellers"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;