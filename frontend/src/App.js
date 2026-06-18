import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Header from "@/components/site/Header";
import Hero from "@/components/site/Hero";
import Philosophy from "@/components/site/Philosophy";
import PracticeAreas from "@/components/site/PracticeAreas";
import Team from "@/components/site/Team";
import Contact from "@/components/site/Contact";

const Home = () => {
  return (
    <main data-testid="home-page" style={{ background: "var(--brand-ivory)" }}>
      <Header />
      <Hero />
      <Philosophy />
      <PracticeAreas />
      <Team />
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
