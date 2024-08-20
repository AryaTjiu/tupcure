import { useAuthContext } from "@/context/AuthContext";
import { useOffCanvasContext } from "@/context/OffCanvasContext";
import { signOutHandler } from "@/functions/authentication";
import { getCurrentPath } from "@/functions/getCurrentPath";
import { faChevronDown, faSignOut, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardSideBar = () => {
    // context
    const {user} = useAuthContext(); 
    const {isOffCanvasVisible, setIsOffCanvasVisible} = useOffCanvasContext();
    // requirement
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState({title:"", descriptionPath:""})
    
    useEffect(() => {
        const currentPlainPath = router.asPath;
        setCurrentPath(getCurrentPath(currentPlainPath));
    }, [])

    return (
        <section className={`fixed ${isOffCanvasVisible ? "left-0" : "-left-full"} top-0 lg:left-0 lg:relative w-[80vw] md:w-[45vw] lg:w-[35vw] xl:w-[25vw] h-screen bg-white border-r border-gray-2.5 flex flex-col py-10 duration-200 z-20`}>
            <div className="flex flex-col space-y-5 px-8 xl:px-12 mb-8">
                <h2 className="text-3xl">TUPCURE</h2>
                <hr className="border-gray-2.5"></hr>
            </div>
            <div className="flex flex-col font-light text-sm">
                <Link href={"/dashboard"}>
                    <button className={`text-left flex items-start space-x-3 w-full py-5 px-8 xl:px-12 focus:bg-purple-0.1 ${currentPath && currentPath.title == "home" ? "px-9 bg-purple-0.1 border-l-8 border-purple-1" : ""} duration-200`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <span>
                            Home
                        </span>
                    </button>
                </Link>
                <Link href={"/dashboard/passwords"}>
                    <button className={`text-left flex items-start space-x-3 w-full py-5 px-8 xl:px-12 focus:bg-purple-0.1 ${currentPath && currentPath.title == "passwords" ? "px-8 xl:px-9 bg-purple-0.1 border-l-8 border-purple-1" : ""} duration-200`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-key"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path></svg>
                        <span className="group-hover:text-purple-1 duration-200">
                            My passwords
                        </span>
                    </button>
                </Link>
                {/* information and logout button */}
                {/* <Link href="/dashboard/generate" className="lg:hidden">
                    <button className={`text-left flex items-start space-x-3 w-full py-5 px-8 xl:px-12 focus:bg-purple-0.1 duration-200`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle" className="group-hover:stroke-purple-1 duration-150"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        <span>
                            Help
                        </span>
                    </button>
                </Link> */}
                <Link href="/dashboard/generate" className="lg:hidden">
                    <button className={`text-left flex items-center space-x-3 w-full py-5 px-8 xl:px-12 focus:bg-purple-0.1 duration-200`} onClick={() => signOutHandler(router)}>
                        <FontAwesomeIcon icon={faSignOut}/>
                        <span>
                            Logout
                        </span>
                    </button>
                </Link>

                {/* services section */}
                <span className="px-8 xl:px-12 text-lg font-normal mb-2 mt-5">
                    SERVICES
                </span>
                <Link href="/dashboard/generate">
                    <button className={`text-left flex items-start space-x-3 w-full py-5 px-8 xl:px-12 focus:bg-purple-0.1 ${ currentPath && currentPath.title == "passwordGenerator" ? "px-9 bg-purple-0.1 border-l-8 border-purple-1" : ""} duration-200`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        <span>
                            Passwords generator
                        </span>
                    </button>
                </Link>
                
                {/* active user email */}
                <span className="lg:hidden absolute bottom-4 left-4">{user && user.email}</span>
            </div>
        </section>
    )
}

export default DashboardSideBar;