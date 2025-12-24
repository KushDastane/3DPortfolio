import { useExperience } from "../store/useExperience";
import About from "./screens/AboutScreen";
import Skills from "./screens/SkillsScreen";
import Projects from "./screens/ProjectsScreen";
import Experience from "./screens/ExperienceScreen";
import Achievements from "./screens/AchievementsScreen";
import Testimonials from "./screens/TestimonialsScreen";
import Contact from "./screens/ContactScreen";

const screens = {
  about: About,
  skills: Skills,
  projects: Projects,
  experience: Experience,
  achievements: Achievements,
  testimonials: Testimonials,
  contact: Contact,
};

export default function PortfolioUI() {
  const { activeSection, previousSection, transitioning } = useExperience();

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      {Object.entries(screens).map(([key, Screen]) => {
        const isActive = activeSection === key;
        const isLeaving = previousSection === key && transitioning;

        return (
          <div
            key={key}
            className={`
              absolute inset-0 flex items-center justify-center
              transition-opacity duration-700 ease-out
              ${
                isActive && !transitioning
                  ? "opacity-100 pointer-events-auto"
                  : ""
              }
              ${isLeaving ? "opacity-0 pointer-events-none" : ""}
              ${!isActive && !isLeaving ? "opacity-0 pointer-events-none" : ""}
            `}
          >
            {/* UI CONTENT ONLY */}
            <div className="pointer-events-auto">
              <Screen />
            </div>
          </div>
        );
      })}
    </div>
  );
}
