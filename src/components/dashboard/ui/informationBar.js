import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InformationBar = () => {
    return (
        <section className="w-full bg-purple-1 text-white flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 lg:space-x-3 py-4 xl:py-5 px-6 my-7 xl:my-12 rounded-lg md:rounded-none">
            <div className="flex md:space-x-5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid hidden xl:inline-block"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                <span className="text-sm xl:text-base">Use our browser extension to manage your passwords and enjoy our features to the fullest</span>
            </div>
            <button className="w-full md:w-48 py-1 xl:py-2 bg-yellow-1 text-sm text-black rounded flex items-center justify-center space-x-2">
                <FontAwesomeIcon icon={faLock}/>
                <span>
                    Comming soon
                </span>
            </button>
        </section>
    )
}

export default InformationBar;