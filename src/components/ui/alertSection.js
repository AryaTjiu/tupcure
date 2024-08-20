import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

const AlertSection = ({text, setTextAlertValue}) => {
    const alertRef = useRef();

    useEffect(() => {   
        if(text && alertRef.current) {
            if(window.innerWidth < 640) {
                alertRef.current.style.left = "40px";
            } else {
                alertRef.current.style.left = "3rem";
            }

            const timeout1 = setTimeout(() => {
                alertRef.current.style.left = "-100%";

                const timeout2 = setTimeout(() => {
                    setTextAlertValue(false)
                }, 200)

                return () => clearTimeout(timeout2);
            }, 3000)

            return () => clearTimeout(timeout1);
        }
     }, [text])
    
    return (
        <section className={`fixed px-3 xl:px-10 h-16 xl:h-20 bottom-10 -left-full border w-[70vw] md:w-[40vw] xl:min-w-96 bg-purple-1 text-white flex justify-between items-center rounded-md text-sm xl:text-lg duration-150`} ref={alertRef}>
            <span>
                {text}
            </span>
            <button className="hover:scale-110 duration-200">
                <FontAwesomeIcon icon={faCircleXmark} className="text-xl"/>
            </button>
        </section>
    )
}


export default AlertSection;