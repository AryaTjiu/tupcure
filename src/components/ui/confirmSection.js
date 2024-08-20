import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef } from "react";

const ConfirmSection = ({dataConfirmValue, setDataConfirmValue, setResultConfirmation}) => {
    const confirmRef = useRef();

    useEffect(() => {   
        if(dataConfirmValue && confirmRef) {
            if(window.innerWidth < 640) {
                confirmRef.current.style.right = 0;
                confirmRef.current.style.left = 0;
            } else {
                confirmRef.current.style.right = "3rem";
            }
        }
    }, [dataConfirmValue])

    function selectChoiceHandler(choise) {
        if(choise) {
            setResultConfirmation({status : true, type : dataConfirmValue.type, data : {field_id : dataConfirmValue.field_id}});
        }

        confirmRef.current.style.right = "-200%";
        setTimeout(() => {
            setDataConfirmValue(null)
        }, 200)
    }

    return (
        <section className="fixed top-10 -right-full z-40 w-[80vw] md:w-[60vw] lg:w-[35vw] 2xl:w-96 m-auto xl:m-0 p-5 xl:p-10 bg-white border border-gray-2 rounded flex flex-col space-y-4 xl:space-y-5 items-start justify-between duration-150" ref={confirmRef}>
            <FontAwesomeIcon icon={faCircleExclamation} className="text-xl text-purple-1"/>
            <span className="text-sm md:text-base">
                {dataConfirmValue.text}
            </span>
            <div className="w-fit flex items-center space-x-5">
                <button className="px-7 py-2 border border-purple-1 hover:bg-purple-1 hover:text-white duration-200 rounded" onClick={() => selectChoiceHandler(false)}>
                    no
                </button>
                <button className="px-7 py-2 bg-purple-1 border border-purple-1 hover:bg-transparent hover:text-black duration-200 rounded text-white" onClick={() => selectChoiceHandler(true)}>
                    yes
                </button>
            </div>
        </section>
    )
}


export default ConfirmSection;