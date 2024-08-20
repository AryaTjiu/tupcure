import PasswordsSection from "@/components/dashboard/passwords/passwordsSection"
import DashboardLayout from "./layout/dashboardLayout"

const Passwords = () => {
    return (
        <DashboardLayout title={"My passwords - tupcure"}>
            <PasswordsSection/>
        </DashboardLayout>
    )
}

export default Passwords