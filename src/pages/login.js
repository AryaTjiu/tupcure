import MainNavbar from "@/components/ui/mainNavbar";
import { continueWithGoogleProvider, signInWithEmailPasswordProvider } from "@/functions/authentication";
import { withoutAuth } from "@/functions/authMiddleware";
import sanitizeData from "@/functions/sanitizeData";
import { signInWithEmailAndPassword } from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import validator from "validator";

const Login = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");

    function signInHandler(e) {
        e.preventDefault()

        // check that all inputs are filled
        if(!passwordInputValue || !emailInputValue) {
            setError({
                type : "incomplete_data",
                message : "Please fill in the empty input"
            })
            return null;
        }
    
        // check passwordInputValue input length
        if(passwordInputValue.length < 8) {
            setError({
                type: "input_password_error",
                message : "Password must be at least 8 characters long"
            })
            return null;
        }

        let emailIsValid = validator.isEmail(emailInputValue)
        if(!emailIsValid) {
            setError({
                type : "input_email_error",
                message : "Please enter a valid email address."
            })
            return null;
        }

        const obj = {
            email : emailInputValue,
            password : passwordInputValue
        }

        const result = sanitizeData(obj)
        
        signInWithEmailPasswordProvider(result.email, result.password)
        .then((data) => {
            if(data.status == "success") {
                router.push("/dashboard");
                return null;
            } else if (data.status == "error") {
                if(data.code == "auth/invalid-credential") {
                    setError({type : "credential_error", message : "User not found, please check email and password!"})
                    return null;
                } else {
                    setError({type : "server_error", message : "something went wrong, try again later!"})
                    return null;
                }
            } 
        })
    }

    function signInWithGoogleHandler(e) {
        continueWithGoogleProvider()
        .then((data) => {
            if(data.status == "success") {
                router.push("/dashboard");
                return null;
            } else if (data.status == "error") {
                setError({type : "server_error", message : "something went wrong, try again later!"})
                return null;
            } 
        })
        .catch((err) => {
            setError({type : "server_error", message : "something went wrong, try again later!"})
            return null;
        })
    }

    return (
        <>
            <Head>
                <title>Log in - Tupcure</title>
            </Head>
            <main>
                <MainNavbar/>
                <section className="w-full min-h-screen p-14 flex justify-center items-center">
                    <div className="w-full md:w-[55%] lg:w-[30%] 2xl:w-[20%] flex flex-col text-center space-y-10">
                        <h3 className="text-2xl 2xl:text-3xl">LOG IN</h3>
                        <div className="flex flex-col space-y-5">
                            <button className="w-full border border-gray-2 rounded-[5px] py-3 2xl:py-4 flex justify-center items-center space-x-5" onClick={signInWithGoogleHandler}>
                                <div className="relative w-7 h-7">
                                    <Image src={"assets/google-logo.svg"} width={100} height={100} layout="responsive"/>
                                </div>
                                <span className="text-sm xl:text-base 2xl:text-lg font-light">
                                    Continue with google
                                </span>
                            </button>
                            <div className="relative h-6 flex items-center">
                                <div className="w-full h-[1px] bg-gray-2"></div>
                                <div className="absolute bg-white w-fit h-fit px-3 left-0 right-0 top-0 bottom-0 m-auto">
                                    or
                                </div>
                            </div>
                            <form className="flex flex-col space-y-5">
                                <input className="w-full px-8 py-3 2xl:py-4 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none" type="email" name="email" placeholder="Email" value={emailInputValue} onChange={(e) => setEmailInputValue(e.target.value)} required/>

                                <input className="w-full px-8 py-3 2xl:py-4 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none" type="password" name="password" placeholder="Password" value={passwordInputValue} onChange={(e) => setPasswordInputValue(e.target.value)}/>

                                {
                                    error && 
                                    <span className="text-red-500 text-left">{error.message}</span>
                                }

                                <button type="submit" className="w-full bg-purple-1 hover:bg-cyan-600 rounded-[5px] text-white py-3 2xl:py-4 flex justify-center duration-200" onClick={signInHandler}>
                                    Login
                                </button>
                            </form>
                            <Link href={"#"} className="text-purple-1 hover:text-cyan-500 duration-150">
                                Forgot password?
                            </Link>
                            <p>
                                Dont have an account? <Link href={"#"} className="text-purple-1 hover:text-cyan-500 duration-150">choose a plan</Link> and get started now
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default withoutAuth(Login);