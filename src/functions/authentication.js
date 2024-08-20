import { doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { hashingPassword } from "./password";
import firebase from "@/lib/firebase"
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useAuthContext } from "@/context/AuthContext";
import { getCredentialData } from "./getCredentialData";

export async function registerWithEmailAndPassword (email, password, router) {
    try {
        const cred = await createUserWithEmailAndPassword(firebase.auth, email, password);
    
        const userData = getCredentialData(cred, {password : password}, "email-password");

        await runTransaction(firebase.db, async(transaction) => {
            const userDocRef = doc(firebase.db, "users", userData.uid);
            transaction.set(userDocRef, userData);

            const folderDocRef = doc(firebase.db, "accounts", cred.user.uid);
            const folderID = `${userData.uid}_folder_0`

            const folderData = {
                [folderID] : {
                    name : "my_accounts",
                    id : folderID,
                    created_at : serverTimestamp(),
                    value : [],
                    index_folder : 0,
                }
            }
            transaction.set(folderDocRef, folderData);

            router.push("/verification");  
        })

        return({status : "success", code : "success", message : "User registration successful", cred : userData});
    } catch (err) {
        let errorCode = "unknown-error";
        if (err.code) {
            errorCode = err.code;
        }
        return({ status: "error", code: errorCode, message: err.message });
    }       
}

export async function continueWithGoogleProvider() {
    try {
        const cred = await signInWithPopup(firebase.auth, firebase.googleProvider);
        
        const userData = getCredentialData(cred, {}, "google-provider");

        const docSnap = await getDoc(doc(firebase.db, "users", userData.uid))
        if(docSnap.exists()) {
            const userData = {
                lastLoginAt : cred.user.reloadUserInfo.lastLoginAt
            }
            await updateDoc(doc(firebase.db, "users", userData.uid), {
                userData
            })
        } else {
            await runTransaction(firebase.db, async(transaction) => {


                // gunakan runTransaction

                const userDocRef = doc(firebase.db, "users", userData.uid);
                transaction.set(userDocRef, userData);

                const folderDocRef = doc(firebase.db, "accounts", userData.uid);
                const folderID = `${userData.uid}_folder_0`

                const folderData = {
                    [folderID] : {
                        name : "my_accounts",
                        id : folderID,
                        created_at : serverTimestamp(),
                        value : [],
                        index_folder : 0,
                    }
                }
                transaction.set(folderDocRef, folderData);
            })
        }

        return { status: "success", code: "success", message: "User registration successful" };
    } catch (err) {
        let errorCode = "unknown-error";
        if (err.code) {
            errorCode = err.code;
        }
        return { status: "error", code: errorCode, message: err.message };
    }
}

export async function signInWithEmailPasswordProvider(email, password) {
    try {
        const cred = await signInWithEmailAndPassword(firebase.auth, email, password);
    
        const userData = {
            lastLoginAt : cred.user.reloadUserInfo.lastLoginAt
        }

        await updateDoc(doc(firebase.db, "users", cred.user.uid), {
            userData
        })

        return({status : "success", code : "success", message : "User registration successful"});
    } catch (err) {
        let errorCode = "unknown-error";
        if (err.code) {
            errorCode = err.code;
        }
        return({ status: "error", code: errorCode, message: err.message });
    }
}

export async function signOutHandler(router) {
    try {
        await signOut(firebase.auth);
        router.push("/login");
    } catch (err) {
        let errorCode = "unknown-error";
        if (err.code) {
            errorCode = err.code;
        }
        return { status : "error", code : errorCode, message : err.message }
    }
}