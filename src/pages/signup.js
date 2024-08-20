import MainNavbar from "@/components/ui/mainNavbar"
import { withoutAuth } from "@/functions/authMiddleware"
import { registerWithEmailAndPassword, continueWithGoogleProvider } from "@/functions/authentication"
import { passwordStrength } from "check-password-strength"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import validator from "validator";
import { compareBetweenPlainAndHashedText } from "@/functions/password"
import { sendEmailVerification } from "firebase/auth"

const Signup = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);
    const [passwordStrengthStatus, setPasswordStrengthStatus] = useState(false);

    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [confirmPasswordInputValue, setConfirmPasswordInputValue] = useState("");
    const [planInputValue, setPlanInputValue] = useState("");

    const [passwordHasLowercaseCharacter, setPasswordHasLowercaseCharacter] = useState(false);
    const [passwordHasUppercaseCharacter, setPasswordHasUppercaseCharacter] = useState(false);
    const [passwordHasNumber, setPasswordHasNumber] = useState(false);
    const [passwordHasSymbols, setPasswordHasSymbols] = useState(false);

    function inputPasswordHandler(e) {
        setPasswordInputValue(e.target.value)
        setPasswordStrengthStatus(passwordStrength(passwordInputValue).value)

        setPasswordHasLowercaseCharacter(/[a-z]/.test(e.target.value));
        setPasswordHasUppercaseCharacter(/[A-Z]/.test(e.target.value));
        setPasswordHasNumber(/[0-9]/.test(e.target.value));
        setPasswordHasSymbols(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.target.value));
    }

    function signupWithGoogleHandler () {
        continueWithGoogleProvider()
        .then((result) => {
            if(result.status == "error") {
                if(result.code == "auth/email-already-in-use") {
                    setError({type : "auth_error", message : "Email is already in use"})
                } else if(result.code == "user-already-authenticated") {
                    setError({type : "auth_error", message : result.message})
                } else {
                    setError({type : "server_error", message : result.message})
                }
            } else {
                router.push("/dashboard");
            }
        })
    }
 
    function signupHandler (e) {
        e.preventDefault()

        const email = emailInputValue;
        const password = passwordInputValue;
        const confirmPassword = confirmPasswordInputValue;
        const plan = planInputValue;

        // check that all inputs are filled
        if(!password || !confirmPassword || plan == "Choose your plan" || !plan || !email) {
            setError({
                type : "incomplete_data",
                message : "Please fill in the empty input"
            })
            return null;
        }

        // check password input length
        if(password.length < 8) {
            setError({
                type: "input_password_error",
                message : "Password must be at least 8 characters long"
            })
            return null;
        }

        // check the password input value and confirm the password input value has the same value
        if(password !== confirmPassword) {
            setError({
                type : "input_password_error",
                message : "The passwords you entered do not match, Please try again."
            })
            return null;
        }

        // check whether the email, password and plan entered is valid
        let emailIsValid = validator.isEmail(email)
        if(!emailIsValid) {
            setError({
                type : "input_email_error",
                message : "Please enter a valid email address."
            })
            return null;
        }

        setIsLoading(true);

        fetch('/api/processSignupData', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({ email, password, confirmPassword, plan })
        })
        .then(response => response.json())
        .then(async result => {
            const isPasswordMatch = compareBetweenPlainAndHashedText(password, result.value.hashedPassword);

            if(isPasswordMatch) {
                try {
                    registerWithEmailAndPassword(result.value.email, result.value.hashedPassword, router)
                    .then((result) => {
                        setIsLoading(false);
    
                        if(result.status == "success") {
                            router.push("/verification");  
                            return null;  
                        } else if(result.code == "auth/email-already-in-use") {
                            setError({type : "auth_error", message : "This email is already in use"})
                            return null;
                        } 
                        else if(result.code == "user-already-authenticated") {
                            setError({type : "auth_error", message : "You are logged in"})
                            return null;
                        } else {
                            setError({type : "server_error", message : "Something went wrong, try again later"});
                            return null;
                        }
                    })
                    
                } catch (error) {
                    setIsLoading(false);
    
                    setError({
                        type : "auth_error",
                        message : "Something went wrong, try again later"
                    })
                    return null;
                }
            } else {
                setError({
                    type : "auth_error",
                    message : "An error occurred, please do not change the data"
                })
                return null;
            }
        })
        .catch(err => {
            setIsLoading(false)
            setError({type: "server_error", message: "Something went wrong, try again later"})
            return null;
        })
    }    

    return (
        <>
            <Head>
                <title>Get started - Tupcure</title>
            </Head>
            <main>
                <MainNavbar/>
                <section className="w-full min-h-screen p-14 py-32 flex justify-center items-center">
                    <div className="w-full md:w-[55%] lg:w-[40%] 2xl:w-[20%] flex flex-col text-center space-y-10">
                        <h3 className="text-3xl">GET STARTED</h3>
                        <div className="flex flex-col space-y-5">
                            <button className="w-full border border-gray-2 rounded-[5px] py-3 2xl:py-4 flex justify-center items-center space-x-5" onClick={signupWithGoogleHandler}>
                                <div className="relative w-7 h-7">
                                    <Image src={"assets/google-logo.svg"} width={100} height={100} layout="responsive"/>
                                </div>
                                <span className="text-sm 2xl:text-lg font-light">
                                    Continue with google
                                </span>
                            </button>
                            <div className="relative h-6 flex items-center">
                                <div className="w-full h-[1px] bg-gray-2"></div>
                                <div className="absolute bg-white w-fit h-fit px-3 left-0 right-0 top-0 bottom-0 m-auto">
                                    or
                                </div>
                            </div>
                            <form className="flex flex-col space-y-5" onSubmit={signupHandler}>
                                <input className="w-full px-8 py-3 2xl:py-4 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none" type="email" name="email" placeholder="Email" value={emailInputValue} onChange={(e) => setEmailInputValue(e.target.value)} required/>

                                <input className={`w-full px-8 py-3 2xl:py-4 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none duration-150 ${(error && error.type == "input_password_error")? "border-red-500 text-red-500" : ""}`} type="password" name="password" placeholder="Password" value={passwordInputValue} onChange={(e) => {inputPasswordHandler(e)}} required/>

                                <input className={`w-full px-8 py-3 2xl:py-4 border border-gray-2 rounded-[5px] active:outline-none focus:outline-none duration-150 ${(error && error.type == "input_password_error")? "border-red-500 text-red-500" : ""}`} type="password" name="password" placeholder="Confirm password" value={confirmPasswordInputValue} onChange={(e)=>setConfirmPasswordInputValue(e.target.value)} required/>

                                <span className={`text-left flex space-x-1`}>
                                    <span>Password strength :</span>
                                    {
                                        passwordInputValue.length > 0 &&
                                        <span className={`${
                                            passwordStrengthStatus == "Too weak"? "text-red-500" :
                                            passwordStrengthStatus == "Weak"? "text-orange-400" :
                                            passwordStrengthStatus == "Medium"? "text-yellow-500" :
                                            passwordStrengthStatus == "Strong"? "text-green-500" : ""
                                        }`}>
                                            {passwordStrengthStatus && passwordStrengthStatus}
                                        </span>
                                    }
                                </span>
                                
                                <div className="flex flex-col space-y-2">
                                    <div className="flex space-x-2">
                                        <input type="checkbox" className="checked:accent-green-500 duration-150" checked={passwordInputValue.length > 8}></input>
                                        <span className={`${passwordInputValue.length > 8 && "text-green-500"} duration-150`}>
                                            More than 8 character
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input type="checkbox" className="checked:accent-green-500 duration-150" checked={passwordHasLowercaseCharacter}></input>
                                        <span className={`${passwordHasLowercaseCharacter && "text-green-500"} duration-150`}>
                                            Include Lowercase Character
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input type="checkbox" className="checked:accent-green-500 duration-150" checked={passwordHasUppercaseCharacter}></input>
                                        <span className={`${passwordHasUppercaseCharacter && "text-green-500"} duration-150`}>
                                            Include Uppercase Character
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input type="checkbox" className="checked:accent-green-500 duration-150" checked={passwordHasNumber}></input>
                                        <span className={`${passwordHasNumber && "text-green-500"} duration-150`}>
                                            Include number
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <input type="checkbox" className="checked:accent-green-500 duration-150" checked={passwordHasSymbols}></input>
                                        <span className={`${passwordHasSymbols && "text-green-500"} duration-150`}>
                                            Include Symbols
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-2 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <select id="countries" className="w-full h-10" onChange={(e) => setPlanInputValue(e.target.value)} required>
                                        <option selected>Choose your plan</option>
                                        <option value="free">Free plan</option>
                                    </select>
                                </div>

                                {
                                    error && 
                                    <span className="text-red-500 text-left">{error.message}</span>
                                }
                                
                                <button type="submit" className="w-full bg-purple-1 hover:bg-cyan-600 rounded-[5px] text-white py-3 2xl:py-4 flex items-center justify-center duration-200">
                                    <span className={`${isLoading && "hidden"}`}>Get started</span>
                                    <div className={`${isLoading ? "flex items-center space-x-2" : "hidden"}`}>
                                        <Image src={"/assets/loader/box-loader.gif"} width={32} height={32}/>
                                        <span className="text-lg">
                                            Loading ...
                                        </span>
                                    </div>
                                </button>
                            </form>
                            <p>
                                You have an account? <Link href={"login"} className="text-purple-1 hover:text-cyan-500 duration-150">Sign in</Link> now
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default withoutAuth(Signup);