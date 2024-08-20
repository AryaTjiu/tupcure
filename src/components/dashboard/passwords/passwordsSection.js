import DashboardNavbar from "../ui/dashboardNavbar";
import InformationBar from "../ui/informationBar";
import MyPasswordsSection from "./myPasswordsSection";

const PasswordsSection = () => {
    return (
        <section className="w-full h-screen p-10 px-10 xl:px-14 overflow-y-auto">
            <DashboardNavbar/>
            <InformationBar/>
            <MyPasswordsSection/>
        </section>
    )
}

export default PasswordsSection;