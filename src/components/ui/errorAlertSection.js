import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

const ErrorAlertSection = ({data, setData}) => {
    const alertRef = useRef();

    useEffect(() => {   
        if(data && alertRef.current) {
            if(window.innerWidth < 640) {
                alertRef.current.style.left = "20px";
            } else {
                alertRef.current.style.left = "3rem";
            }

            const timeout1 = setTimeout(() => {
                alertRef.current.style.left = "-100%";

                const timeout2 = setTimeout(() => {
                    setData(null)
                }, 200)

                return () => clearTimeout(timeout2);
            }, 3000)

            return () => clearTimeout(timeout1);
        }
    }, [data])

    function closeAlert() {
        alertRef.current.style.left = "-100%";

        const timeout2 = setTimeout(() => {
            setData(null)
        }, 200)

        return () => clearTimeout(timeout2);
    }
    
    return (
        <section className={`absolute px-5 xl:px-10 h-16 xl:h-20 bottom-10 -left-full border w-[80vw] xl:w-96 bg-[#ff003c] text-white flex justify-between items-center space-x-4 rounded-md text-sm xl:text-lg duration-150`} ref={alertRef}>
            <span>
                {data.message}
            </span>
            <button className="hover:scale-110 duration-200" onClick={closeAlert}>
                <FontAwesomeIcon icon={faCircleXmark} className="text-xl"/>
            </button>
        </section>
    )
}


export default ErrorAlertSection;