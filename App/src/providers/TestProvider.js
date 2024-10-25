import { useContext } from "react";
import React from "react";

const TestContext = React.createContext();

export const TestProvider = ({ children }) => {
    const [typePractice, setTypePracitce] = React.useState({
        value: "new"
    });

    return (
        <TestContext.Provider value={{ typePractice, setTypePracitce }}>
            {children}
        </TestContext.Provider>
    );
}
