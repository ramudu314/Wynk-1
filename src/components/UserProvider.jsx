import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [searchSong, setSearchSong] = useState([]);

    const value = {
        searchSong,
        setSearchSong,
        // Add other properties and methods as needed
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    return useContext(UserContext);
}
