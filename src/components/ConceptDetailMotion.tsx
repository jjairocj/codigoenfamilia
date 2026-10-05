"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MONTESSORI_EASINGS, prefersReducedMotion } from "@/lib/montessoriMotion";

interface Props {
  children: React.ReactNode;
}

export default function ConceptDetailMotion({ children }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Unroll header
      gsap.fromTo(
        ".concept-motion-header",
        { opacity: 0, y: 15, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: MONTESSORI_EASINGS.tactile,
          clearProps: "transform",
        }
      );

      // Stagger main sensory blocks
      gsap.fromTo(
        ".concept-motion-box",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: MONTESSORI_EASINGS.gentle,
          delay: 0.1,
          clearProps: "transform",
        }
      );

      // Stagger sub-items (progression levels, mission cards)
      gsap.fromTo(
        ".concept-motion-item",
        { opacity: 0, scale: 0.95, y: 12 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: MONTESSORI_EASINGS.tactile,
          delay: 0.25,
          clearProps: "transform",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-8 sm:space-y-10">
      {children}
    </div>
  );
}
