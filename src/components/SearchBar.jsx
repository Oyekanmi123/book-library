import { useState } from "react";

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() != ""){
            onSearch(query);
        }
    }

    return(
        <div  className="flex justify-center my-6 w-full px-4">
            <form onSubmit={handleSubmit}  className="w-full max-w-2xl flex items-center">
                <input type="text" placeholder="Search by title, author, or keyword..." value={query} onChange={(e) => setQuery(e.target.value)} className = "w-full px-10 py-3 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white-100"   />
    
                <button type="submit" className="ml-4 px-8 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition text-lg focus:outline-none">Submit</button>
            </form>
        </div>
    )
};



export default SearchBar;