import React, { useState, useEffect, useCallback, useRef } from "react";

export interface PerformanceMetrics {
  isLowEndDevice: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
  connectionType: string;
  isSlowConnection: boolean;
  averageFPS: number;
  shouldReduceAnimations: boolean;
  shouldReduceEffects: boolean;
}

export interface PerformanceSettings {
  enableHeavyAnimations: boolean;
  enableParticles: boolean;
  enableComplexEffects: boolean;
  animationDuration: number;
  maxParticleCount: number;
}

export const useDevicePerformance = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    isLowEndDevice: false,
    deviceMemory: 4,
    hardwareConcurrency: 4,
    connectionType: "4g",
    isSlowConnection: false,
    averageFPS: 60,
    shouldReduceAnimations: false,
    shouldReduceEffects: false,
  });

  const frameCount = useRef(0);
  const lastTime = useRef(Date.now());
  const fps = useRef<number[]>([]);

  const measureFPS = useCallback(() => {
    frameCount.current++;
    const now = Date.now();

    if (now - lastTime.current >= 1000) {
      const currentFPS = Math.round(
        (frameCount.current * 1000) / (now - lastTime.current),
      );
      fps.current.push(currentFPS);

      if (fps.current.length > 10) {
        fps.current.shift();
      }

      frameCount.current = 0;
      lastTime.current = now;

      const avgFPS =
        fps.current.reduce((sum, f) => sum + f, 0) / fps.current.length;

      setMetrics((prev) => ({
        ...prev,
        averageFPS: avgFPS,
      }));
    }

    requestAnimationFrame(measureFPS);
  }, []);

  useEffect(() => {
    const deviceMemory = (navigator as any).deviceMemory || 4;

    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    const connection =
      (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
    const connectionType = connection?.effectiveType || "4g";
    const isSlowConnection = ["slow-2g", "2g", "3g"].includes(connectionType);

    const isLowEndDevice =
      deviceMemory <= 2 ||
      hardwareConcurrency <= 2 ||
      isSlowConnection ||
      /Android.*Chrome\/[.0-9]*\s(Mobile|eliboM)/.test(navigator.userAgent);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setMetrics({
      isLowEndDevice,
      deviceMemory,
      hardwareConcurrency,
      connectionType,
      isSlowConnection,
      averageFPS: 60,
      shouldReduceAnimations: isLowEndDevice || prefersReducedMotion,
      shouldReduceEffects: isLowEndDevice || deviceMemory <= 2,
    });

    const rafId = requestAnimationFrame(measureFPS);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [measureFPS]);

  return metrics;
};

export const usePerformanceSettings = (): PerformanceSettings => {
  const metrics = useDevicePerformance();

  return {
    enableHeavyAnimations:
      !metrics.shouldReduceAnimations && metrics.averageFPS > 30,
    enableParticles: !metrics.isLowEndDevice && metrics.deviceMemory > 2,
    enableComplexEffects:
      !metrics.shouldReduceEffects && metrics.averageFPS > 45,
    animationDuration: metrics.shouldReduceAnimations ? 150 : 300,
    maxParticleCount: metrics.isLowEndDevice
      ? 10
      : metrics.deviceMemory >= 8
        ? 50
        : 25,
  };
};

export const useConditionalRender = (
  condition: (metrics: PerformanceMetrics) => boolean,
  fallback?: React.ReactNode,
) => {
  const metrics = useDevicePerformance();
  const shouldRender = condition(metrics);

  return {
    shouldRender,
    metrics,
    renderComponent: (component: React.ReactNode) =>
      shouldRender ? component : fallback,
  };
};

export const usePerformanceThrottle = (callback: () => void, delay: number) => {
  const metrics = useDevicePerformance();
  const [throttledCallback, setThrottledCallback] = useState<
    (() => void) | null
  >(null);

  useEffect(() => {
    const adjustedDelay = metrics.isLowEndDevice ? delay * 2 : delay;

    let timeoutId: NodeJS.Timeout;
    let lastRun = 0;

    const throttled = () => {
      const now = Date.now();

      if (now - lastRun >= adjustedDelay) {
        callback();
        lastRun = now;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(
          () => {
            callback();
            lastRun = Date.now();
          },
          adjustedDelay - (now - lastRun),
        );
      }
    };

    setThrottledCallback(() => throttled);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [callback, delay, metrics.isLowEndDevice]);

  return throttledCallback;
};

export const useMemoryMonitor = () => {
  const [memoryInfo, setMemoryInfo] = useState({
    usedJSHeapSize: 0,
    totalJSHeapSize: 0,
    jsHeapSizeLimit: 0,
    isMemoryPressure: false,
  });

  useEffect(() => {
    const updateMemoryInfo = () => {
      if ((performance as any).memory) {
        const memory = (performance as any).memory;
        const usageRatio = memory.usedJSHeapSize / memory.jsHeapSizeLimit;

        setMemoryInfo({
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
          isMemoryPressure: usageRatio > 0.8,
        });
      }
    };

    const interval = setInterval(updateMemoryInfo, 5000);
    updateMemoryInfo();

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
};

export const useAdaptiveQuality = () => {
  const metrics = useDevicePerformance();
  const memory = useMemoryMonitor();

  const getQualityLevel = useCallback(() => {
    if (
      metrics.isLowEndDevice ||
      memory.isMemoryPressure ||
      metrics.averageFPS < 30
    ) {
      return "low";
    } else if (metrics.deviceMemory >= 8 && metrics.averageFPS >= 60) {
      return "high";
    } else {
      return "medium";
    }
  }, [metrics, memory]);

  const qualitySettings = {
    low: {
      enableAnimations: false,
      enableParticles: false,
      enableBlur: false,
      particleCount: 0,
      animationDuration: 100,
    },
    medium: {
      enableAnimations: true,
      enableParticles: false,
      enableBlur: true,
      particleCount: 15,
      animationDuration: 200,
    },
    high: {
      enableAnimations: true,
      enableParticles: true,
      enableBlur: true,
      particleCount: 50,
      animationDuration: 300,
    },
  };

  return {
    qualityLevel: getQualityLevel(),
    settings: qualitySettings[getQualityLevel()],
    metrics,
    memory,
  };
};

export const withPerformanceOptimization = <T extends object>(
  Component: React.ComponentType<T>,
  options: {
    skipOnLowEnd?: boolean;
    fallback?: React.ReactNode;
    condition?: (metrics: PerformanceMetrics) => boolean;
  } = {},
) => {
  return (props: T) => {
    const metrics = useDevicePerformance();

    const shouldSkip =
      (options.skipOnLowEnd && metrics.isLowEndDevice) ||
      (options.condition && !options.condition(metrics));

    if (shouldSkip) {
      return options.fallback || null;
    }

    return React.createElement(Component, props);
  };
};

export default {
  useDevicePerformance,
  usePerformanceSettings,
  useConditionalRender,
  usePerformanceThrottle,
  useMemoryMonitor,
  useAdaptiveQuality,
  withPerformanceOptimization,
};
