import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {
    const [books, setBooks] = useState([]);

    return (
        <SearchContext.Provider value={{ books, setBooks }}>
            {children}
        </SearchContext.Provider>
    );
};