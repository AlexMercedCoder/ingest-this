import script from "next/script";
import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Check if script already exists to avoid duplication
    if (ref.current.querySelector(".giscus-script")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "AlexMercedCoder/ingest-this");
    script.setAttribute("data-repo-id", "R_kgDOHBkxOw");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOHBkxO84C0VDz");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    script.classList.add("giscus-script");

    ref.current.appendChild(script);
  }, []);

  return <div style={{width: '100%', marginTop: '40px'}} ref={ref} />;
}
