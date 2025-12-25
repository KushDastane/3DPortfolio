import { useExperience } from "../store/useExperience";
import About from "./screens/AboutScreen";
import Skills from "./screens/SkillsScreen";
import Projects from "./screens/ProjectsScreen";
import Experience from "./screens/ExperienceScreen";
import Testimonials from "./screens/TestimonialsScreen";
import Contact from "./screens/ContactScreen";

const screens = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  testimonials: Testimonials,
  contact: Contact,
};

export default function PortfolioUI() {
  const { activeSection, previousSection, isResyncing } = useExperience();

  const currentSection = isResyncing ? previousSection : activeSection;

  return (
    // UI layer sits above 3D, below nav buttons
    <div
      className={`fixed inset-0 z-40 ${
        activeSection ? "" : "pointer-events-none"
      }`}
    >
      {Object.entries(screens).map(([key, Screen]) => {
        const isActive = currentSection === key;

        return (
          <div
            key={key}
            className={`
              absolute inset-0 flex items-center justify-center
              ${isActive ? "opacity-100" : "opacity-0"}
            `}
          >
            {/*
              Only the actual UI content should receive pointer events.
              Background stays transparent and non-blocking.
            */}
            <div
              className={`${
                isActive ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              <Screen />
            </div>
          </div>
        );
      })}
    </div>
  );
}
