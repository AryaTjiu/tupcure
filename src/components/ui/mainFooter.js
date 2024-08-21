import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const MainFooter = () => {
    return (
        <section className="w-full flex flex-col selection:text-black overflow-hidden">
            <div className="w-full py-32 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-x-20 gap-y-10 px-10 md:px-28 xl:px-40 2xl:px-96 bg-neutral-900">
                <div className="flex flex-col space-y-2 xl:space-y-5">
                    <span className="font-semibold text-white text-lg">
                        TUPPCURE
                    </span>
                    <p className="text-neutral-300 text-sm">
                        Tupcure is an online platform that helps you store and manage your account.
                    </p>
                </div>
                <div className="flex flex-col space-y-2 xl:space-y-5">
                    <span className="font-semibold text-white text-lg">
                        ANOTHER PROJECT
                    </span>
                    <ul className="flex flex-col space-y-2">
                        <Link href={"https://cornqr.vercel.app/"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li>
                                Corn QR
                            </li>
                        </Link>
                        <Link href={"https://cinehunt.vercel.app/"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li>
                                Cine Hunt
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2 xl:space-y-5">
                    <span className="font-semibold text-white text-lg">
                        USEFUL LINKS
                    </span>
                    <ul className="flex flex-col space-y-2">
                        <Link href={"/"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li>
                                About
                            </li>
                        </Link>
                        <Link href={"/privacy-policy"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li>
                                Privacy policy
                            </li>
                        </Link>
                        <Link href={"mailto:tuppsoftware@gmail.com"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li>
                                Help
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="flex flex-col space-y-2 xl:space-y-5">
                    <span className="font-semibold text-white text-lg">
                        CONTACT
                    </span>
                    <ul className="flex flex-col space-y-2">
                        <Link href={"mailto:tuppsoftware@gmail.com"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li className="flex space-x-2 items-center">
                                <FontAwesomeIcon icon={faEnvelope}/>
                                <span>
                                    tuppsoftware@gmail.com
                                </span>
                            </li>
                        </Link>
                        <Link href={"https://www.instagram.com/tuppn_/"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li className="flex space-x-2 items-center">
                                <FontAwesomeIcon icon={faInstagram}/>
                                <span>
                                    Tuppn_
                                </span>
                            </li>
                        </Link>
                        {/* <Link href={"#"} className="hover:text-purple-1 duration-200 w-fit text-sm text-neutral-300">    
                            <li className="flex space-x-2 items-center">
                                <FontAwesomeIcon icon={faFacebook}/>
                                <span>
                                    Tuppn_
                                </span>
                            </li>
                        </Link> */}
                    </ul>
                </div>
            </div>
            <div className="w-full py-5 bg-neutral-950 text-neutral-300 text-center text-sm">
                &copy; 2024 Tuppcure. All rights reserved.
            </div>
        </section>
    )
}

export default MainFooter;