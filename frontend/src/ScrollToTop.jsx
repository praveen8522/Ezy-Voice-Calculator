import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll normal user pages
    window.scrollTo(0, 0);

    // Scroll admin content container
    const adminScrollContainer = document.querySelector(".admin-scroll-area");
    if (adminScrollContainer) {
      adminScrollContainer.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}
