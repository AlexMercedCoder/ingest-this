import { useEffect, useRef } from "react";

export default function Comments() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    
    // Function to get current theme
    const getTheme = () => {
        const theme = document.documentElement.getAttribute("data-theme");
        return theme === "dark" ? "transparent_dark" : "light";
    };

    const updateGiscusTheme = () => {
        const theme = getTheme();
        const iframe = document.querySelector("iframe.giscus-frame");
        if (!iframe) return;
        
        iframe.contentWindow.postMessage(
            { giscus: { setConfig: { theme } } },
            "https://giscus.app"
        );
    };

    // Check if script already exists
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
    // Use explicit theme based on current state instead of "preferred_color_scheme"
    script.setAttribute("data-theme", getTheme()); 
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "true");
    script.classList.add("giscus-script");

    ref.current.appendChild(script);

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
                updateGiscusTheme();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return <div style={{width: '100%', marginTop: '40px'}} ref={ref} />;
}
