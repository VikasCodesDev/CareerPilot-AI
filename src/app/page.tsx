import {
  AiAgentCardsSection,
  AnnouncementBanner,
  ArchitectureSection,
  AutonomousWorkflowSection,
  CareerJourneySection,
  FaqSection,
  FeaturesGridSection,
  FooterSection,
  HeroSection,
  HowItWorksSection,
  IbmSkillsBuildSection,
  Navigation,
  ProblemSection,
  RoadmapPreviewSection,
  TechStackSection,
  TestimonialsSection,
  TrustedBySection,
  WhySection,
} from "@/features/landing";

export default function HomePage() {
  return (
    <>
      <AnnouncementBanner />
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <TrustedBySection />
        <ProblemSection />
        <WhySection />
        <FeaturesGridSection />
        <AutonomousWorkflowSection />
        <ArchitectureSection />
        <HowItWorksSection />
        <CareerJourneySection />
        <AiAgentCardsSection />
        <TechStackSection />
        <IbmSkillsBuildSection />
        <RoadmapPreviewSection />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <FooterSection />
    </>
  );
}
