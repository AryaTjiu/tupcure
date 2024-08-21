import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

const LoaderSection = ({}) => {
    const transitionTypes = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'];
    // ref
    const loadingScreenRef = useRef();
    const progressBarRef = useRef();

    useEffect(() => {
        const handlePageLoad = () => {
            const diff = Math.random() * 2500 + 500;
            const duration = Math.min(diff, 3000);
            const transitionType = transitionTypes[Math.floor(Math.random() * transitionTypes.length)]
            
            if(progressBarRef && progressBarRef.current) {
                progressBarRef.current.style.transition = `width ${duration}ms ${transitionType}`;
                progressBarRef.current.style.width = "100%";
            }

            setTimeout(() => {
                if(loadingScreenRef && loadingScreenRef.current) {
                    loadingScreenRef.current.style.transition = "150ms";
                    loadingScreenRef.current.style.opacity = "0%";
                    setTimeout(() => {
                        if(loadingScreenRef && loadingScreenRef.current) {
                            loadingScreenRef.current.style.display = "none";
                        }
                    }, 150)
                }
            }, duration + 600)
        }

        if(document.readyState == "complete") {
            handlePageLoad();
        } else {
            window.addEventListener("load", handlePageLoad);
        }

        return () => {
            window.removeEventListener("load", handlePageLoad);
        }
    }, [])

    return (
        <section className="fixed w-full h-screen bg-purple-1 flex justify-center items-center z-[100]" ref={loadingScreenRef}>
            <div className="flex flex-col items-center text-white">
                <FontAwesomeIcon icon={faLock} className="text-6xl text-neutral-100"/>
                <div className="w-full h-1 bg-neutral-200 rounded-full mt-10 overflow-hidden">
                    <div className="w-0 h-full bg-purple-400" ref={progressBarRef}></div>
                </div>
                <span className="mt-5">
                    Always safe! We will encrypt your data
                </span>
                <div className="flex space-x-2 items-center text-sm text-neutral-200 mt-3">
                    <FontAwesomeIcon icon={faUser}/>
                    <span>
                        TUPCURE - ARYA
                    </span>
                </div>
            </div>
        </section>
    )
}

export default LoaderSection;