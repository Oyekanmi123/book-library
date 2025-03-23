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
        <div  className="flex justify-center my-4">
            <form onSubmit={handleSubmit}  className="flex gap-2">
                <input type="text" placeholder="Search by title or author..." value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 border border-gray-300 rounded-md w-80 outline-none text-gray-900 placeholder:text-gray-500"/>
    
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
            </form>
        </div>
    )
};



export default SearchBar;