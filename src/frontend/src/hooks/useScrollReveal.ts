import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.12 },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  });
}
