// import './App.css'
import { useState } from "react"
import axios from "axios"
import SearchBar from "./components/SearchBar"
import BookCard from "./components/BookCard";


function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState("false");
    const [error, setError] = useState("");

      const fetchBooks = async(query) =>{
        setLoading(true);
        setError("");

        try{
          const response = await axios.get(
            `https://openlibrary.org/search.json?q=${query}`
          );
          setBooks(response.data.docs.slice(0, 10));  // Show only first 10 results
        }catch{
          setError("Failed to fetch books. please try again");
        }finally{
          setLoading(false)
        }
      }
    
    return (
    <>
      <div  className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Book Library</h1>
        <SearchBar onSearch={fetchBooks} />

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      </div>
      
    </>
  )
}

export default App
