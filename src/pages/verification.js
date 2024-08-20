import MainNavbar from "@/components/ui/mainNavbar";
import { useAuthContext } from "@/context/AuthContext";
import { faPaperPlane, faPlane, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAuth, sendEmailVerification } from "firebase/auth";
import Head from "next/head";
import { useEffect, useState } from "react";
import handler from "./api/decryption";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import AlertSection from "@/components/ui/alertSection";
import ErrorAlertSection from "@/components/ui/errorAlertSection";
import firebase from "@/lib/firebase";

const VerificationSection = () => {
    const [isVerificationEmailHasSent, setIsVerificationEmailHasSent] = useState(false);
    const [error, setError] = useState(null);
    const {user, db} = useAuthContext();
    const router = useRouter()

    // useEffect(() => {
    //     if(user) {
    //         sendEmailVerification(user)
    //         .then(() => {
    //             setIsVerificationEmailHasSent(true);
    //         })
    //         .catch((err) => {
    //             setError({status:true, message : "Something went wrong, Please try again later"})
    //         })
    //     }
    // }, [user])

    async function verifyButtonHandler() {
        user.reload()

        if (user.emailVerified) {
            updateDoc(doc(db, "users", user.uid), {
                "emailVerified" : true
            })
            .then(() => {
                router.push("/dashboard");
            })
            .catch((err) => {
                setError({status : true, message : "Something went wrong, Please try again later"})
            })
        } else {
            setError({status:true, message : "Your account has not been verified"})
        }
    }

    function sentVerificationHandler () {
        sendEmailVerification(user)
            .then(() => {
                setIsVerificationEmailHasSent(true);
            })
            .catch((err) => {
                setError({status:true, message : "Something went wrong, Please try again later"})
                console.log(err.message)
            })
    }

    return (
        <>
            <Head>
                <title>Verify your account</title>
            </Head>

            {
                error &&
                <ErrorAlertSection data={error} setData={setError}/>
            }

            <main className="w-full min-h-screen grid place-content-center">
                <MainNavbar/>
                {
                    isVerificationEmailHasSent?
                    <div className="flex flex-col items-center space-y-5 text-center p-10">
                        <h2 className="text-2xl 2xl:text-4xl">Verify your account</h2>
                        <p className="w-full 2xl:w-[60%]">
                            A verification email has been sent to your account. Please verify your email before accessing our services.
                        </p>
                        <button className="flex space-x-2 items-center bg-purple-1 hover:bg-cyan-500 w-fit px-7 py-2 rounded text-white duration-200" onClick={verifyButtonHandler}>
                            <FontAwesomeIcon icon={faRefresh}/>
                            <span>
                                Verify
                            </span>
                        </button> 
                    </div>
                    :
                    <div className="flex flex-col items-center space-y-5 text-center p-10">
                        <h2 className="text-2xl 2xl:text-4xl">Verify your account</h2>
                        <p className="w-full 2xl:w-[60%]">
                            Please click the button below to request a verification email. Don’t forget to check your inbox and verify your email address to complete the process. 
                        </p>
                        <button className="flex space-x-2 items-center bg-purple-1 hover:bg-cyan-500 w-fit px-7 py-2 rounded text-white duration-200" onClick={sentVerificationHandler}>
                            <FontAwesomeIcon icon={faPaperPlane}/>
                            <span>
                                Sent email verification
                            </span>
                        </button>
                    </div>
                }
            </main>
        </>
    )
}

export default VerificationSection;