import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/lib/firebase";


const AuthContext = createContext();

export const AuthWrapper = ({children}) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(firebase.auth);
    const [googleProvider, setGoogleProvider] = useState(firebase.googleProvider);
    const [db, setDb] = useState(firebase.db);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
            } else {
                setUser(null);
            }
        })

        return () => unsubscribe();
    }, [auth])
    
    return (
        <AuthContext.Provider value={{auth, user, googleProvider, db}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("something went wrong!")
    }
    return context;
}