"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const Gsap_Animations = () => {
  useEffect(() => {
    let context: gsap.Context | undefined;
    const frame = window.requestAnimationFrame(() => {
      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power2.out",
              scrollTrigger: {
                once: false,
                trigger: element,
                start: "top 94%",
                toggleActions: "play none none none",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".reveal-late").forEach((element) => {
          gsap.fromTo(
            element,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play reverse play reverse",
              },
            },
          );
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      context?.revert();
    };
  }, []);

  return null;
};

export default Gsap_Animations;
