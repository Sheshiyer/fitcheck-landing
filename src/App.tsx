import { useState, useEffect } from "react";
import CinematicLanding from "./components/CinematicLanding";
import PrivacyPolicy from "./components/PrivacyPolicy";

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return path;
}

export default function App() {
  const path = useRoute();

  if (path === "/privacy") {
    return <PrivacyPolicy />;
  }

  return <CinematicLanding />;
}
