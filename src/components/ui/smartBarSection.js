import { faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export const SmartNavbarSection = () => {
    return (
        <div className="w-full py-5 bg-black text-white px-10 xl:px-20 flex justify-center items-center space-x-3 font-bold z-40 relative">
            <FontAwesomeIcon icon={faCircleInfo} className="text-xl hidden md:inline-block"/>
            <span className="text-xs xl:text-base">
                {/* This website is in development mode, some features may not be usable yet */}
                This website is just personal project by <Link href={"#"} className="text-purple-400">Arya T</Link>, dont save your important account in this website
            </span>
        </div>
    )
}