import { useAuthContext } from "@/context/AuthContext"
import { faContactBook, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useState } from "react"

const MainNavbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {user} = useAuthContext()

    return (
        <header className="w-full flex items-center justify-between absolute z-50 px-10 2xl:px-28 py-7 text-neutral-800 text-sm">
            <div className="flex items-center space-x-10">
                <Link href={"/"}>
                    <span className="absolute md:relative left-10 top-5 md:top-0 md:left-0 text-2xl text-black z-20">
                        TUPCURE
                    </span>
                </Link>
                <ul className="hidden md:flex items-center space-x-4">
                    <li>
                        <Link href={"#price"} className={`border-b border-transparent hover:border-cyan-600 hover:text-cyan-600 hover:pb-2 duration-150`}>
                            Pricing
                        </Link>
                    </li>
                    <li>
                        <button className="flex cursor-pointer items-center relative" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <div className={`absolute -bottom-36 scale-0 ${isDropdownOpen && "-bottom-[19rem] scale-100"} w-80 border border-purple-1 bg-purple-0.1 rounded text-start px-5 py-4 duration-200 ease-in-out`}>
                                <span className="text-purple-1 py-2">
                                    Resource
                                </span>
                                <Link href={"/"}>
                                    <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                        <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                            <FontAwesomeIcon icon={faContactBook}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                About
                                            </span>
                                            <span className="text-sm text-neutral-700">
                                                About our services
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={"mailto:tuppsoftware@gmail.com"}>
                                    <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                        <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                            <FontAwesomeIcon icon={faContactBook}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                Help Center
                                            </span>
                                            <span className="text-sm text-neutral-700">
                                                Need help? contact us
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                                <Link href={"/privacy-policy"}>
                                    <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                        <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                            <FontAwesomeIcon icon={faContactBook}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold">
                                                Privacy Policy
                                            </span>
                                            <span className="text-sm text-neutral-700">
                                                About the terms of our privacy policy
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* content */}
                            <span>
                                Resource    
                            </span>
                            <div className={`${isDropdownOpen && "rotate-180"} duration-100`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>

                            {/* close button */}
                            <div className="hidden group-focus:inline-block bg-opacity-0 absolute top-0 left-0 w-full h-full" role="button" tabIndex={1}></div>
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                {
                    user && user.uid?
                        <>
                            <ul className="hidden md:flex space-x-4">
                                <li>
                                    <Link href={"/signup"} className={`border-b border-transparent hover:border-cyan-600 hover:text-cyan-600 hover:pb-2 duration-150`}>
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                            <div role="button" tabIndex={1} className="inline-block md:hidden group duration-200">
                                {/* open button */}
                                <div className="group-focus:hidden flex absolute top-7 right-10 flex-col space-y-1 z-20 group">
                                    <div className="w-5 h-[3px] bg-black"></div>
                                    <div className="w-5 h-[3px] bg-black"></div>
                                    <div className="w-5 h-[3px] bg-black"></div>
                                </div>
                                {/* close button */}
                                <div className="hidden group-focus:flex absolute top-7 right-10 flex-col space-y-1 z-20 group duration-200" role="button" tabIndex={1}>
                                    <FontAwesomeIcon icon={faX} className="text-xl rotate-180 duration-200"/>
                                </div>

                                <div className="shadow-md flex flex-col w-full py-5 pt-20 px-10 absolute bg-white -top-[200vh] group-focus:top-0 left-0 z-10 duration-200">
                                    <div className="w-full flex flex-col py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                        <span className="text-purple-1 mb-3">
                                            Resource
                                        </span>
                                        <Link href={"/"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        About
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        About our services
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={"mailto:tuppsoftware@gmail.com"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        Help Center
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        Need help? contact us
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={"/privacy-policy"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        Privacy Policy
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        About the terms of our privacy policy
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <Link href={"#price"}>
                                        <div className="w-full py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                            Pricing
                                        </div>
                                    </Link>
                                    <Link href={"/dashboard"}>
                                        <div className="w-full py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                            Dashboard
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <ul className="hidden md:flex space-x-4">
                                <li>
                                    <Link href={"/signup"} className={`border-b border-transparent hover:border-cyan-600 hover:text-cyan-600 hover:pb-2 duration-150`}>
                                        Get Started
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/login"} className={`border-b border-transparent hover:border-cyan-600 hover:text-cyan-600 hover:pb-2 duration-150`}>
                                        Login
                                    </Link>
                                </li>
                            </ul>
                            <div role="button" tabIndex={1} className="inline-block md:hidden group duration-200">
                                {/* open button */}
                                <div className="group-focus:hidden flex absolute top-7 right-10 flex-col space-y-1 z-20 group">
                                    <div className="w-5 h-[3px] bg-black"></div>
                                    <div className="w-5 h-[3px] bg-black"></div>
                                    <div className="w-5 h-[3px] bg-black"></div>
                                </div>
                                {/* close button */}
                                <div className="hidden group-focus:flex absolute top-7 right-10 flex-col space-y-1 z-20 group duration-200" role="button" tabIndex={1}>
                                    <FontAwesomeIcon icon={faX} className="text-xl rotate-180 duration-200"/>
                                </div>

                                <div className="shadow-md flex flex-col w-full py-5 pt-20 px-10 absolute bg-white -top-[200vh] group-focus:top-0 left-0 z-10 duration-200">
                                    <div className="w-full flex flex-col py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                        <span className="text-purple-1 mb-3">
                                            Resource
                                        </span>
                                        <Link href={"/"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        About
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        About our services
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={"mailto:tuppsoftware@gmail.com"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        Help Center
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        Need help? contact us
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                        <Link href={"/privacy-policy"}>
                                            <div className="flex items-center space-x-2 px-3 py-4 w-full hover:bg-purple-100 rounded-lg duration-150">
                                                <div className="bg-purple-100 text-purple-1 px-2 py-1 border border-purple-200 rounded">
                                                    <FontAwesomeIcon icon={faContactBook}/>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">
                                                        Privacy Policy
                                                    </span>
                                                    <span className="text-sm text-neutral-700">
                                                        About the terms of our privacy policy
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <Link href={"#price"}>
                                        <div className="w-full py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                            Pricing
                                        </div>
                                    </Link>
                                    <Link href={"/signup"}>
                                        <div className="w-full py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                            Get Started
                                        </div>
                                    </Link>
                                    <Link href={"/login"}>
                                        <div className="w-full py-5 px-6 mx-0 m-2 rounded-lg bg-purple-0.1">
                                            Login
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </>
                }
            </div>
        </header>
    )
}

export default MainNavbar