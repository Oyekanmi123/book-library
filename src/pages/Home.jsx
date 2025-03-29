// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import SearchBar from "../components/SearchBar";
// import BookCard from "../components/BookCard";
// import { SearchContext } from "../context/SearchContext";

// const categories = ["All", "Fantasy", "Drama", "Business", "Education", "Psychology", "Astrology"];

// const Home = () => {
//   const { books, setBooks } = useContext(SearchContext);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
  
//   // Fetch default books (e.g., Bestsellers) on first load
//   useEffect(() => {
//     const fetchDefaultBooks = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("https://openlibrary.org/search.json?q=bestseller");
//         setBooks(response.data.docs.slice(0, 10)); // Show first 10 results
//       } catch {
//         setError("Failed to load default books.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDefaultBooks();
//   }, [setBooks]);

//   const fetchBooks = async (query) => {
//     setLoading(true);
//     setError("");

//     try {
//       const response = await axios.get(
//         `https://openlibrary.org/search.json?q=${query}`
//       );
//       if (!response.data.docs || response.data.docs.length === 0) {
//         setError("No books found.");
//       }
//       setBooks(response.data.docs.slice(0, 10)); // Show first 10 results
//     } catch {
//       setError("Failed to fetch books. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#E3F2FD] flex flex-col items-center p-6">

//        {/* BOOKLY Name */}
//        <div className="w-full max-w-6xl">
//         <h1 className="text-4xl font-bold text-[#1565C0] text-left">BOOKLY</h1>
//       </div>

//       {/* Centered Search Bar */}
//         <SearchBar onSearch={fetchBooks} />
     
      

//       {/* Categories Section */}
//       <div className="flex flex-wrap justify-center mt-6 space-x-8">
//         {categories.map((category) => (
//           <button
//             key={category}
//             className={`px-4 py-2 rounded-full text-gray-700 shadow-md transition ${
//               selectedCategory === category ? "bg-blue-500 text-white focus:outline-none" : "bg-white"
//             }`}
//             onClick={() => setSelectedCategory(category)}
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Book Results */}
//       {loading && <p className="text-center mt-4">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Default Books Display */}
//       <div className="w-full max-w-5xl mt-8">
//         <h2 className="text-2xl font-semibold text-gray-900">📚 Popular Bestsellers</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//           {books.map((book) => (
//             <BookCard key={book.key} book={book} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useContext, useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import { SearchContext } from "../context/SearchContext";

const categories = ["All", "Fantasy", "Drama", "Business", "Education", "Psychology", "Astrology"];

const Home = () => {
  const { books, setBooks } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("searchedBooks"));
    if (storedBooks && storedBooks.length > 0) {
      setBooks(storedBooks); // Load previous search results
    } else {
      fetchDefaultBooks(); // Fetch bestsellers if no stored search exists
    }
  }, [setBooks]);

  const fetchDefaultBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://openlibrary.org/search.json?q=bestseller");
      const bestsellers = response.data.docs.slice(0, 10);
      setBooks(bestsellers);
    } catch {
      setError("Failed to load default books.");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (query) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      if (!response.data.docs || response.data.docs.length === 0) {
        setError("No books found.");
      } else {
        const searchedBooks = response.data.docs.slice(0, 10);
        setBooks(searchedBooks);
        localStorage.setItem("searchedBooks", JSON.stringify(searchedBooks)); // Store in localStorage
      }
    } catch {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E3F2FD] flex flex-col items-center p-6">
      
      {/* BOOKLY Name */}
      <div className="w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-[#1565C0] text-left">BOOKLY</h1>
      </div>

      {/* Centered Search Bar */}
      <SearchBar onSearch={fetchBooks} />

      {/* Categories Section */}
      <div className="flex flex-wrap justify-center mt-6 space-x-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-gray-700 shadow-md transition ${
              selectedCategory === category ? "bg-blue-500 text-white focus:outline-none" : "bg-white"
            }`}
            onClick={() => setSelectedCategory(category)}
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
          {books.length > 0 ? "📚 Search Results" : "📚 Popular Bestsellers"}
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