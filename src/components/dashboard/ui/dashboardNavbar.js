import { useAuthContext } from "@/context/AuthContext"
import { useOffCanvasContext } from "@/context/OffCanvasContext"
import { signOutHandler } from "@/functions/authentication"
import { getCurrentPath } from "@/functions/getCurrentPath"
import { faChevronDown, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DashboardNavbar = () => {
    const router = useRouter();
    const { auth } = useAuthContext();
    const { isOffCanvasVisible, setIsOffCanvasVisible } = useOffCanvasContext();

    const [currentPath, setCurrentPath] = useState({title:"home", descriptionPath:"Home"})
    const [userData, setUserData] = useState(false);
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        if(!userData) {
            const fetchUserData = () => {
                setUserData(auth.currentUser);
                setIsMounted(true);
            }

            fetchUserData();

            const intervalId = setInterval(fetchUserData, 500);
            
            return () => clearInterval(intervalId);
        }

    }, [auth.currentUser, userData])

    useEffect(() => {
        const currentPlainPath = router.asPath;
        setCurrentPath(getCurrentPath(currentPlainPath));
    }, [router.asPath])

    if(!isMounted) {
        return (
            <section>
                Loading...
            </section>
        )
    }

    return (
        <header className="w-full flex justify-between items-center">
            {currentPath && currentPath.title == "home"?     
                <h3 className="text-2xl lg:text-xl 2xl:text-3xl">Home</h3>
                :
                <h3 className="text-xl 2xl:text-3xl">
                    <span className="text-neutral-600">Home</span> {">"} {currentPath && currentPath.descriptionPath}
                </h3>
            }

            {/* open offcanvas button */}
            <button className={`${isOffCanvasVisible? "scale-0 opacity-0" : "scale-100"} flex lg:hidden flex-col space-y-1 duration-200`} onClick={() => setIsOffCanvasVisible(true)}>
                <div className="w-5 h-[2px] bg-black"></div>
                <div className="w-5 h-[2px] bg-black"></div>
                <div className="w-5 h-[2px] bg-black"></div>
            </button>

            {/* link group */}
            <div className="text-sm space-x-10 font-light hidden lg:flex">
                {/* <Link href="#" className="flex items-center space-x-1 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle" className="group-hover:stroke-purple-1 duration-150"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <span className="group-hover:text-purple-1 duration-150">
                        Help
                    </span>
                </Link> */}
                <button className="flex items-center space-x-1 relative group">
                    <span>{userData && userData.email}</span>
                    <FontAwesomeIcon icon={faChevronDown} className="group-focus:rotate-180 duration-150 ease-out"></FontAwesomeIcon>

                    <div className="hidden group-focus:inline-block absolute top-0 left-0 w-full h-full" tabIndex={0} onClick={(e) => e.currentTarget.focus()}></div>
                    <div className="w-full absolute left-0 bg-white border border-gray-2.5 rounded scale-0 top-0 hover:text-purple-1 group-focus:scale-100 group-focus:top-8 duration-150 ease-linear">
                        <div className="w-full h-full p-5 text-center space-x-3" onClick={() => signOutHandler(router)}>
                            <FontAwesomeIcon icon={faSignOut}/>
                            <span className="text-semibold">
                                LOGOUT
                            </span>
                        </div>
                    </div>
                </button>
            </div>
        </header>
    )
}

export default DashboardNavbar