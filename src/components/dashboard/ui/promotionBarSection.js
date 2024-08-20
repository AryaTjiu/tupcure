import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PromotionBarSection = () => {
    return (
        <section className="w-full p-7 lg:p-6 2xl:p-12 bg-gradient-to-r from-[#EFEBFF] via-[#FFFDF2] to-[#EFEBFF] rounded-xl border border-gray-2 flex flex-col space-y-3">
            <h6 className="font-bold text-base xl:text-lg">
                UPGRADE YOUR PLAN
            </h6>
            <p className="w-full 2xl:w-[60%] text-sm">
                Are you satisfied with our service? We have more features to satisfy you, do you want to share your account with your family, client or worker? We have that feature and again, you can upgrade it to try it
            </p>
            <button className="w-fit px-4 py-2 bg-yellow-1 text-sm text-black rounded space-x-2">
                <FontAwesomeIcon icon={faLock}/>
                <span>Comming soon</span>
            </button>
        </section>
    )
}

export default PromotionBarSection;