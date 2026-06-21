import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "@/App.css";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import SectionNav from "@/components/site/SectionNav";
import Home from "@/components/site/Sections/Home";
import Studio from "@/components/site/Sections/Studio";
import Clients from "@/components/site/Sections/Clients";
import Lawyers from "@/components/site/Sections/Lawyers";
import Areas from "@/components/site/Sections/Areas";
import Contact from "@/components/site/Sections/Contact";
import PrivacyPolicy from "@/components/site/Sections/PrivacyPolicy";

const SECTIONS = ["home", "studio", "clients", "lawyers", "areas", "contact"];

const SectionComponents = {
  home: Home,
  studio: Studio,
  clients: Clients,
  lawyers: Lawyers,
  areas: Areas,
  contact: Contact,
};

const Site = () => {
  const [section, setSection] = useState("home");
  const idx = SECTIONS.indexOf(section);

  const goTo = useCallback((key) => {
    if (SECTIONS.includes(key)) setSection(key);
  }, []);

  const goPrev = useCallback(() => {
    setSection((s) => {
      const i = SECTIONS.indexOf(s);
      return i > 0 ? SECTIONS[i - 1] : s;
    });
  }, []);
  const goNext = useCallback(() => {
    setSection((s) => {
      const i = SECTIONS.indexOf(s);
      return i < SECTIONS.length - 1 ? SECTIONS[i + 1] : s;
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  const Active = SectionComponents[section];

  return (
    <div className="app-shell" data-testid="app-shell">
      <Header sectionKey={section} onNavigate={goTo} sections={SECTIONS} />
      <main
        className="section-shell"
        data-testid={`active-section-${section}`}
        key={section}
      >
        <Active onNavigate={goTo} />
        <SectionNav
          index={idx}
          total={SECTIONS.length}
          onPrev={goPrev}
          onNext={goNext}
        />
      </main>
      <Footer sectionIndex={idx} totalSections={SECTIONS.length} onNavigate={goTo} />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
      </Routes>
    </LanguageProvider>
  );
}

export default App;
