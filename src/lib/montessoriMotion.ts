import gsap from "gsap";

/**
 * Montessori Motion Philosophy:
 * - Natural physical weight & friction (no artificial linear snaps or frantic strobe).
 * - Gentle deceleration (back.out(1.2) or power2.out) mirroring wooden blocks sliding into place.
 * - Staggered sensory reveal: items appear one by one to avoid cognitive overload.
 * - Tactile feedback: smooth elastic squeeze upon interaction (control of error).
 * - Respects prefers-reduced-motion for neurodivergent & sensitive learners.
 */

export const MONTESSORI_EASINGS = {
  tactile: "back.out(1.3)",
  gentle: "power2.out",
  woodSpring: "elastic.out(1, 0.75)",
  floating: "sine.inOut",
};

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Staggers a collection of child elements (e.g., cards, checklist items, steps)
 */
export function montessoriStaggerEntrance(
  targets: string | Element | Element[] | NodeListOf<Element>,
  options: {
    stagger?: number;
    yOffset?: number;
    delay?: number;
    duration?: number;
    ease?: string;
  } = {}
) {
  if (prefersReducedMotion()) {
    return gsap.set(targets, { opacity: 1, y: 0 });
  }

  const {
    stagger = 0.08,
    yOffset = 18,
    delay = 0.05,
    duration = 0.6,
    ease = MONTESSORI_EASINGS.tactile,
  } = options;

  return gsap.fromTo(
    targets,
    { opacity: 0, y: yOffset, scale: 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      delay,
      ease,
      clearProps: "transform",
    }
  );
}

/**
 * Tactile pop/squeeze when checking a task, clicking a stamp or completing a step
 */
export function montessoriTactileBounce(target: Element | null) {
  if (!target || prefersReducedMotion()) return;

  const tl = gsap.timeline();
  tl.to(target, {
    scale: 0.92,
    duration: 0.12,
    ease: "power1.in",
  }).to(target, {
    scale: 1.08,
    duration: 0.22,
    ease: MONTESSORI_EASINGS.woodSpring,
  }).to(target, {
    scale: 1,
    duration: 0.15,
    ease: "power2.out",
    clearProps: "transform",
  });

  return tl;
}

/**
 * Continuous gentle idle float for characters (Boty, gems, badges)
 */
export function montessoriIdleFloat(
  target: Element | null,
  options: { y?: number; duration?: number } = {}
) {
  if (!target || prefersReducedMotion()) return null;

  const { y = -5, duration = 2.4 } = options;

  return gsap.to(target, {
    y,
    duration,
    repeat: -1,
    yoyo: true,
    ease: MONTESSORI_EASINGS.floating,
  });
}

/**
 * Unrolls a container like a Montessori work rug (alfombra de trabajo)
 */
export function montessoriUnroll(
  target: Element | null,
  options: { delay?: number; duration?: number } = {}
) {
  if (!target) return;
  if (prefersReducedMotion()) {
    gsap.set(target, { opacity: 1, y: 0 });
    return;
  }

  const { delay = 0, duration = 0.65 } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y: 24, scaleY: 0.96, transformOrigin: "top center" },
    {
      opacity: 1,
      y: 0,
      scaleY: 1,
      duration,
      delay,
      ease: MONTESSORI_EASINGS.tactile,
      clearProps: "transform",
    }
  );
}

/**
 * Transitions an animation stage when moving to the next step
 */
export function montessoriStageTransition(target: Element | null) {
  if (!target || prefersReducedMotion()) return;

  return gsap.fromTo(
    target,
    { opacity: 0.65, scale: 0.985 },
    {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: MONTESSORI_EASINGS.tactile,
      clearProps: "transform",
    }
  );
}

/**
 * Celebratory pulse when completing a task, mission, or puzzle
 */
export function montessoriSuccessPulse(target: Element | null) {
  if (!target || prefersReducedMotion()) return;

  const tl = gsap.timeline();
  tl.to(target, {
    scale: 1.05,
    boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)",
    duration: 0.25,
    ease: "power2.out",
  }).to(target, {
    scale: 1,
    boxShadow: "none",
    duration: 0.35,
    ease: "power2.inOut",
    clearProps: "all",
  });

  return tl;
}
