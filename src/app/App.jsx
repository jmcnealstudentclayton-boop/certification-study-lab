import { useEffect, useState } from "react";
import HomePage from "../pages/home/HomePage.jsx";
import CertificationPage from "../pages/certification/CertificationPage.jsx";
import StudyPage from "../pages/study/StudyPage.jsx";
import hackerrankSqlBasic, { sqlAdvanced, sqlIntermediate } from "../content/certifications/sqlTracks.js";

const certifications = {
  [hackerrankSqlBasic.id]: hackerrankSqlBasic,
  [sqlIntermediate.id]: sqlIntermediate,
  [sqlAdvanced.id]: sqlAdvanced,
};

function readRoute() {
  const [page, id] = window.location.hash.replace(/^#\/?/, "").split("/");

  if (page === "certification" && id) {
    return { page, id };
  }

  if (page === "study" && id) {
    return { page, id };
  }

  return { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute());
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  function openHome() {
    window.location.hash = "dashboard";
  }

  function openCertification(certificationId) {
    window.location.hash = `certification/${certificationId}`;
  }

  function openStudy(certificationId) {
    window.location.hash = `study/${certificationId}`;
  }

  const certification = certifications[route.id];

  if (route.page === "certification" && certification) {
    return <CertificationPage certification={certification} onBack={openHome} onStartStudy={openStudy} />;
  }

  if (route.page === "study" && certification) {
    return <StudyPage certification={certification} onBack={() => openCertification(certification.id)} />;
  }

  return <HomePage onOpenCertification={openCertification} />;
}
