import { useEffect, useState } from "react";
import HomePage from "../pages/home/HomePage.jsx";
import CertificationPage from "../pages/certification/CertificationPage.jsx";
import StudyPage from "../pages/study/StudyPage.jsx";
import CertificationsPage from "../pages/certifications/CertificationsPage.jsx";
import hackerrankSqlBasic, { sqlAdvanced, sqlIntermediate } from "../content/certifications/sqlTracks.js";
import { readProgress, saveProgress } from "../features/progress/progressStore.js";

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
  if (page === "certifications") return { page };

  return { page: "home" };
}

export default function App() {
  const [route, setRoute] = useState(readRoute);
  const [progress, setProgress] = useState(readProgress);

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
  function openCertifications() { window.location.hash = "certifications"; }
  function completeQuestion(certificationId, questionId) {
    setProgress((current) => { const next = { ...current, [certificationId]: [...new Set([...(current[certificationId] ?? []), questionId])] }; saveProgress(next); return next; });
  }
  function resetCertification(certificationId) { setProgress((current) => { const next = { ...current, [certificationId]: [] }; saveProgress(next); return next; }); }

  function openStudy(certificationId) {
    window.location.hash = `study/${certificationId}`;
  }

  const certification = certifications[route.id];

  if (route.page === "certification" && certification) {
    return <CertificationPage certification={certification} onBack={openHome} onStartStudy={openStudy} />;
  }

  if (route.page === "study" && certification) {
    return <StudyPage certification={certification} completedQuestionIds={progress[certification.id] ?? []} onBack={() => openCertification(certification.id)} onCompleteQuestion={completeQuestion} />;
  }
  if (route.page === "certifications") return <CertificationsPage certifications={Object.values(certifications)} onBack={openHome} onOpenCertification={openCertification} onReset={resetCertification} progress={progress} />;

  return <HomePage onManageCertifications={openCertifications} onOpenCertification={openCertification} progress={progress} />;
}
