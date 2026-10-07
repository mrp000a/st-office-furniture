"use client"
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Gsap_Animations = () => {
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray(".reveal").forEach((el: any) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        once: false,
                        trigger: el,
                        start: "top 94%",
                        toggleActions: "play none none none",
                    },
                },
            );
        });
    }, []);
    useGSAP(() => {
        gsap.utils.toArray(".reveal-late").forEach((el: any) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play reverse play reverse",
                    },
                },
            );
        });
    }, []);
    return null;
}

export default Gsap_Animations
