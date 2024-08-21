import DashboardLayout from "./layout/dashboardLayout";
import PasswordGeneratorSection from "@/components/dashboard/passwordGeneratorSection/passwordGeneratorSection";

const GeneratePassword = () => {
    return (
        <DashboardLayout title={"Password generator - Tupcure"}>
            <PasswordGeneratorSection/>
        </DashboardLayout>
    )
}

export default GeneratePassword;