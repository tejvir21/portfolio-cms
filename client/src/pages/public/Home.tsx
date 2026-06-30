import Navbar from "../../components/common/Navbar";

import HeroSection from "../../components/sections/HeroSection";
// import StatsSection from "../../components/sections/StatsSection";
import EngineeringHighlights from "../../components/sections/EngineeringHighlights";

import ExperienceSection from "../../components/sections/ExperienceSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import AchievementsSection from "../../components/sections/AchievementsSection";
import SkillsSection from "../../components/sections/SkillsSection";
import CertificatesSection from "../../components/sections/CertificatesSection";
import ContactSection from "../../components/sections/ContactSection";
import SEO from "@/lib/seo";
import { useEffect } from "react";
import { useSeoStore } from "@/store/seo.store";
import PageLoader from "@/components/common/PageLoader";

export default function Home() {
  const { fetchSeo, seo } = useSeoStore();

  useEffect(() => {
    fetchSeo();
  }, []);

  if (!seo) return <PageLoader />;

  return (
    <>
      <SEO
        title={seo?.homeTitle || "Tejvir's Portfolio"}
        description={seo?.homeDescription || ""}
        keywords={seo?.keywords?.join(", ")}
        ogImage={seo?.ogImage || "/favicon.svg"}
      />

      <Navbar />

      <HeroSection />

      {/* <StatsSection /> */}

      <EngineeringHighlights />

      <ExperienceSection />

      <ProjectsSection />

      <AchievementsSection />

      <SkillsSection />

      <CertificatesSection />

      <ContactSection />
    </>
  );
}
