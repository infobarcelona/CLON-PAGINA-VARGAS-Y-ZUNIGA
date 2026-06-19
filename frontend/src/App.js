import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import News from "@/components/site/News";
import Studio from "@/components/site/Studio";
import PracticeAreas from "@/components/site/PracticeAreas";
import Experience from "@/components/site/Experience";
import Team from "@/components/site/Team";
import Recent from "@/components/site/Recent";
import CtaBands from "@/components/site/CtaBands";
import Contact from "@/components/site/Contact";

const Home = () => {
  return (
    <main data-testid="home-page" style={{ background: "var(--brand-cream)" }}>
      <Header />
      <Hero />
      <News />
      <Studio />
      <PracticeAreas />
      <Experience />
      <Team />
      <Recent />
      <CtaBands />
      <Contact />
    </main>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
