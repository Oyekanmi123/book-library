import { createContext, useState, useEffect } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [books, setBooks] = useState(
        JSON.parse(localStorage.getItem("searchedBooks")) || []);

    // Save books to localStorage whenever `books` state updates
    useEffect(() => {
        if (books.length > 0) {
        localStorage.setItem("searchedBooks", JSON.stringify(books));
        }
    }, [books]);

    return (
        <SearchContext.Provider value={{ books, setBooks }}>
            {children}
        </SearchContext.Provider>
    );
};