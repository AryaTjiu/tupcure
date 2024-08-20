import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { HeroSection } from "@/components/home/heroSection";
import MainNavbar from "@/components/ui/mainNavbar";
import FeatureSection from "@/components/home/featureSection";
import PlansSection from "@/components/home/plansSection";
import { SmartNavbarSection } from "@/components/ui/smartBarSection";
import PasswordGroupingSection from "@/components/home/passwordGroupingSection";
import PasswordGeneratorSection from "@/components/home/passwordGeneratorSection";
import MainFooter from "@/components/ui/mainFooter";
import PromotionSection from "@/components/home/promotionSection";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Best Password Management - TuppCure</title>
      </Head>
      <main className="w-full overflow-hidden">
        <SmartNavbarSection/>
        <MainNavbar/>
        <HeroSection/>
        <FeatureSection/>
        <PlansSection/>
        <PasswordGroupingSection/>
        <PasswordGeneratorSection/>
        <PromotionSection/>
        <MainFooter/>
      </main>
    </>
  );
}
