import { useEffect, useState, useRef, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

interface IntersectionObserverEntry {
  target: Element;
  isIntersecting: boolean;
  intersectionRatio: number;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {},
) => {
  const [activeElement, setActiveElement] = useState<string>("");
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Set<Element>>(new Set());

  const { threshold = 0.5, root = null, rootMargin = "0px" } = options;

  const observe = useCallback((element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.observe(element);
      elementsRef.current.add(element);
    }
  }, []);

  const unobserve = useCallback((element: Element) => {
    if (observerRef.current && element) {
      observerRef.current.unobserve(element);
      elementsRef.current.delete(element);
    }
  }, []);

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      elementsRef.current.clear();
    }
  }, []);

  useEffect(() => {
    const callback = (observerEntries: IntersectionObserverEntry[]) => {
      setEntries(observerEntries);

      let mostVisible: { element: Element; ratio: number } | null = null;

      observerEntries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!mostVisible || entry.intersectionRatio > mostVisible.ratio) {
            mostVisible = {
              element: entry.target,
              ratio: entry.intersectionRatio,
            };
          }
        }
      });

      if (mostVisible) {
        const id = mostVisible.element.getAttribute("id");
        if (id) {
          setActiveElement(id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin,
    });

    return () => {
      disconnect();
    };
  }, [threshold, root, rootMargin, disconnect]);

  return {
    activeElement,
    entries,
    observe,
    unobserve,
    disconnect,
  };
};

export const useActiveSection = (
  sectionIds: string[],
  options?: UseIntersectionObserverOptions,
) => {
  const [activeSection, setActiveSection] = useState<string>(
    sectionIds[0] || "",
  );
  const { observe, disconnect } = useIntersectionObserver({
    threshold: 0.3,
    ...options,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id && sectionIds.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
        ...options,
      },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
};

export const useScrollSpy = (
  selectors: string[],
  options?: UseIntersectionObserverOptions,
) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev,
          );

          const id = mostVisible.target.getAttribute("id");
          if (id) {
            setActiveId(id);
          }
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75, 1.0],
        rootMargin: "-10% 0px -10% 0px",
        ...options,
      },
    );

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => observer.observe(element));
    });

    return () => observer.disconnect();
  }, [selectors, options]);

  return activeId;
};

export const useLazyImages = (imageSelector: string = "img[data-src]") => {
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute("data-src");

            if (src) {
              img.src = src;
              img.removeAttribute("data-src");
              img.classList.add("loaded");
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      },
    );

    const images = document.querySelectorAll(imageSelector);
    images.forEach((img) => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, [imageSelector]);
};

export default useIntersectionObserver;
