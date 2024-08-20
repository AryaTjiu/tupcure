import MainNavbar from "@/components/ui/mainNavbar";
import PrivacyPolicySection from '@/components/privacyPolicy/privacyPolicySection';
import { SmartNavbarSection } from "@/components/ui/smartBarSection";
import Head from "next/head";

const PrivacyPolicyPage = () => {
    return (
        <>
            <Head>
                <title>Privacy Policy | Tupcure</title>
            </Head>
            <main>
                <SmartNavbarSection/>
                <MainNavbar/>
                <PrivacyPolicySection/>
            </main>
        </>
    )
}

export default PrivacyPolicyPage;