import { useEffect, useRef, useState, useCallback } from "react";
import { throttle, prefersReducedMotion } from "../utils/seo";

export const easings = {
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  bounceOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  elasticOut: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  backOut: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
} as const;

export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 600,
    easing: easings.easeOut,
  },
  fadeInUp: {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    duration: 600,
    easing: easings.easeOut,
  },
  fadeInDown: {
    from: { opacity: 0, transform: "translateY(-30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    duration: 600,
    easing: easings.easeOut,
  },
  fadeInLeft: {
    from: { opacity: 0, transform: "translateX(-30px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    duration: 600,
    easing: easings.easeOut,
  },
  fadeInRight: {
    from: { opacity: 0, transform: "translateX(30px)" },
    to: { opacity: 1, transform: "translateX(0)" },
    duration: 600,
    easing: easings.easeOut,
  },
  scaleIn: {
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    duration: 400,
    easing: easings.bounceOut,
  },
  slideInUp: {
    from: { transform: "translateY(100%)" },
    to: { transform: "translateY(0)" },
    duration: 500,
    easing: easings.easeOut,
  },
  rotateIn: {
    from: { opacity: 0, transform: "rotate(-10deg) scale(0.9)" },
    to: { opacity: 1, transform: "rotate(0deg) scale(1)" },
    duration: 700,
    easing: easings.backOut,
  },
} as const;

interface AnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
  repeat?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
  fillMode?: "none" | "forwards" | "backwards" | "both";
}

interface ScrollAnimationOptions extends AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  stagger?: number;
}

export const useAnimation = (
  animationName: keyof typeof animations,
  options: AnimationOptions = {},
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  const trigger = useCallback(() => {
    if (prefersReducedMotion()) return;
    setIsVisible(true);
  }, []);

  const reset = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    const animation = animations[animationName];
    const {
      duration = animation.duration,
      delay = 0,
      easing = animation.easing,
    } = options;

    if (isVisible) {
      Object.assign(element.style, animation.from);
      element.style.transition = `all ${duration}ms ${easing}`;
      element.style.transitionDelay = `${delay}ms`;

      requestAnimationFrame(() => {
        Object.assign(element.style, animation.to);
      });
    }
  }, [isVisible, animationName, options]);

  return {
    ref: elementRef,
    trigger,
    reset,
    isVisible,
  };
};

export const useScrollAnimation = (
  animationName: keyof typeof animations,
  options: ScrollAnimationOptions = {},
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const hasTriggered = useRef(false);

  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    stagger = 0,
    ...animationOptions
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!triggerOnce || !hasTriggered.current) {
              setTimeout(() => {
                setIsVisible(true);
                hasTriggered.current = true;
              }, stagger);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, stagger]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion()) return;

    const animation = animations[animationName];
    const {
      duration = animation.duration,
      delay = 0,
      easing = animation.easing,
    } = animationOptions;

    if (isVisible) {
      Object.assign(element.style, animation.from);
      element.style.transition = `all ${duration}ms ${easing}`;
      element.style.transitionDelay = `${delay}ms`;

      requestAnimationFrame(() => {
        Object.assign(element.style, animation.to);
      });
    } else {
      Object.assign(element.style, animation.from);
    }
  }, [isVisible, animationName, animationOptions]);

  return {
    ref: elementRef,
    isVisible,
  };
};

export const useStaggeredAnimation = (
  animationName: keyof typeof animations,
  itemCount: number,
  options: ScrollAnimationOptions = {},
) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  const { stagger = 100, threshold = 0.1, rootMargin = "0px" } = options;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisibleItems(new Set(Array.from({ length: itemCount }, (_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.findIndex(
              (ref) => ref === entry.target,
            );
            if (index !== -1) {
              setTimeout(() => {
                setVisibleItems((prev) => new Set([...prev, index]));
              }, index * stagger);
            }
          }
        });
      },
      { threshold, rootMargin },
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [itemCount, stagger, threshold, rootMargin]);

  const getItemRef = useCallback((index: number) => {
    return (el: HTMLElement | null) => {
      itemRefs.current[index] = el;
    };
  }, []);

  return {
    containerRef,
    getItemRef,
    isItemVisible: (index: number) => visibleItems.has(index),
  };
};

export const useParallax = (speed: number = 0.5) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleScroll = throttle(() => {
      const element = elementRef.current;
      if (!element) return;

      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;

      element.style.transform = `translateY(${rate}px)`;
    }, 16);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return elementRef;
};

export const useMouseFollower = (
  sensitivity: number = 0.1,
  maxDistance: number = 20,
) => {
  const elementRef = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleMouseMove = throttle((e: MouseEvent) => {
      const element = elementRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * sensitivity;
      const deltaY = (e.clientY - centerY) * sensitivity;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const limitedDistance = Math.min(distance, maxDistance);
      const angle = Math.atan2(deltaY, deltaX);

      const x = Math.cos(angle) * limitedDistance;
      const y = Math.sin(angle) * limitedDistance;

      setPosition({ x, y });
    }, 16);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [sensitivity, maxDistance]);

  useEffect(() => {
    const element = elementRef.current;
    if (element && !prefersReducedMotion()) {
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
  }, [position]);

  return elementRef;
};

export const useTypingAnimation = (
  text: string,
  speed: number = 100,
  startDelay: number = 0,
) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }

    let timeout: NodeJS.Timeout;
    let index = 0;

    const typeNextCharacter = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
        timeout = setTimeout(typeNextCharacter, speed);
      } else {
        setIsComplete(true);
      }
    };

    timeout = setTimeout(typeNextCharacter, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
};

export const useCounterAnimation = (
  end: number,
  duration: number = 2000,
  start: number = 0,
  easing: (t: number) => number = (t) => t,
) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasAnimated) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            if (prefersReducedMotion()) {
              setCount(end);
              if (observerRef.current) {
                observerRef.current.unobserve(entry.target);
              }
              return;
            }

            const startTime = performance.now();
            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easedProgress = easing(progress);
              const current = start + (end - start) * easedProgress;

              setCount(Math.floor(current));

              if (progress < 1) {
                animationRef.current = requestAnimationFrame(animate);
              } else {
                setCount(end);
                if (observerRef.current) {
                  observerRef.current.unobserve(entry.target);
                }
              }
            };

            animationRef.current = requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (elementRef.current && observerRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [end, duration, start, easing, hasAnimated]);

  return { count, ref: elementRef };
};

export const createKeyframes = (
  name: string,
  keyframes: Record<string, any>,
) => {
  const style = document.createElement("style");
  const keyframeRules = Object.entries(keyframes)
    .map(([percent, styles]) => {
      const styleRules = Object.entries(styles)
        .map(([property, value]) => `${property}: ${value}`)
        .join("; ");
      return `${percent} { ${styleRules} }`;
    })
    .join(" ");

  style.textContent = `@keyframes ${name} { ${keyframeRules} }`;
  document.head.appendChild(style);

  return name;
};

export default {
  useAnimation,
  useScrollAnimation,
  useStaggeredAnimation,
  useParallax,
  useMouseFollower,
  useTypingAnimation,
  useCounterAnimation,
  animations,
  easings,
  createKeyframes,
};
