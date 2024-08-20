import HomeSection from "@/components/dashboard/homeSection/homeSection";
import DashboardLayout from "./layout/dashboardLayout";

const Dashboard = () => {
    return (
        <DashboardLayout title={"My account - Tupcure"}>
            <HomeSection/>
        </DashboardLayout>
    )
}

export default Dashboard;