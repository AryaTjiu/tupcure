import DashboardNavbar from "../ui/dashboardNavbar";
import InformationBar from "../ui/informationBar";
import GeneratePasswordSection from "./generatePasswordSection";

const PasswordGeneratorSection = () => {
    return (
        <section className="w-full h-screen p-10 px-10 xl:px-14 overflow-y-auto">
            <DashboardNavbar/>
            <InformationBar/>
            <GeneratePasswordSection/>
        </section>
    )
}   

export default PasswordGeneratorSection;