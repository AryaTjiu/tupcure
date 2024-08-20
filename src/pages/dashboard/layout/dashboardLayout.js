import DashboardSideBar from "@/components/dashboard/ui/dashboardSideBar";
import { useOffCanvasContext } from "@/context/OffCanvasContext";
import { withAuth } from "@/functions/authMiddleware";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";

const DashboardLayout = ({title, children}) => {
    const {isOffCanvasVisible,setIsOffCanvasVisible} = useOffCanvasContext();

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <main className="bg-gray-3 min-h-screen flex w-full relative">
                <button className={`inline-block lg:hidden ${isOffCanvasVisible? "scale-100" : "scale-0"} fixed px-5 py-4 bg-white border border-gray-2 rounded w-fit top-4 right-4 duration-200`} onClick={() => setIsOffCanvasVisible(false)}>
                    <FontAwesomeIcon icon={faX}/>
                </button>
                <DashboardSideBar/>

                {children}
            </main>
        </>
    )
}

export default withAuth(DashboardLayout);