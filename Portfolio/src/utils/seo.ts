export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
}

export interface StructuredData {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url?: string;
  image?: string;
  author?: {
    "@type": string;
    name: string;
    url?: string;
  };
  sameAs?: string[];
}

export const updateSEO = (data: SEOData) => {
  document.title = data.title;

  updateMetaTag("description", data.description);

  updateMetaTag("og:title", data.title, "property");
  updateMetaTag("og:description", data.description, "property");
  updateMetaTag("og:type", data.type || "website", "property");

  if (data.image) {
    updateMetaTag("og:image", data.image, "property");
    updateMetaTag("twitter:image", data.image);
  }

  if (data.url) {
    updateMetaTag("og:url", data.url, "property");
    updateMetaTag("twitter:url", data.url);
  }

  updateMetaTag("twitter:title", data.title);
  updateMetaTag("twitter:description", data.description);
  updateMetaTag("twitter:card", "summary_large_image");

  if (data.keywords && data.keywords.length > 0) {
    updateMetaTag("keywords", data.keywords.join(", "));
  }
};

const updateMetaTag = (
  name: string,
  content: string,
  attribute: string = "name",
) => {
  let element = document.querySelector(`meta[${attribute}="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

export const generateStructuredData = (data: StructuredData): string => {
  return JSON.stringify(data, null, 2);
};

export const injectStructuredData = (data: StructuredData) => {
  const existingScript = document.getElementById("structured-data");
  if (existingScript) {
    existingScript.remove();
  }

  const script = document.createElement("script");
  script.id = "structured-data";
  script.type = "application/ld+json";
  script.textContent = generateStructuredData(data);
  document.head.appendChild(script);
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const lazyLoadImages = (selector: string = "img[data-src]") => {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.classList.remove("loading");
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: "50px" },
    );

    document.querySelectorAll(selector).forEach((img) => {
      imageObserver.observe(img);
    });
  }
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const prefersReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const getCanonicalUrl = (): string => {
  const canonical = document.querySelector('link[rel="canonical"]');
  return canonical ? (canonical as HTMLLinkElement).href : window.location.href;
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const measurePerformance = (name: string, fn: () => void) => {
  if ("performance" in window) {
    const startTime = performance.now();
    fn();
    const endTime = performance.now();
    console.log(`${name} took ${endTime - startTime} milliseconds`);
  } else {
    fn();
  }
};

export const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals")
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((error) => {
        console.warn("Web Vitals could not be loaded:", error);
      });
  }
};
