import { createContext, useContext, useState } from "react";

export const OffCanvasContext = createContext();

export const OffCanvasWrapper = ({children}) => {
    const [isOffCanvasVisible, setIsOffCanvasVisible] = useState(false);

    return (
        <OffCanvasContext.Provider value={{ isOffCanvasVisible, setIsOffCanvasVisible }}>
            {children}
        </OffCanvasContext.Provider>
    )
}

export const useOffCanvasContext = () => useContext(OffCanvasContext);