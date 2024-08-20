import DashboardNavbar from "../ui/dashboardNavbar";
import InformationBar from "../ui/informationBar";
import PromotionBarSection from "../ui/promotionBarSection";
import FeaturesSection from "./featuresSection";

const HomeSection = () => {
    return (
        <section className="w-full h-screen p-10 px-10 xl:px-14 space-y-5 xl:space-y-12 overflow-auto">
            <DashboardNavbar/>
            <div className="space-y-8 xl:space-y-12">
                <InformationBar/>
                <PromotionBarSection/>
                <FeaturesSection/>
            </div>
        </section>
    )
}   

export default HomeSection;