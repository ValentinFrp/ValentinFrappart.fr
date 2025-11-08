import React, { useEffect, useRef, useCallback, useState } from "react";
import { throttle, prefersReducedMotion } from "../utils/seo";

interface VisualEffectsProps {
  variant?: "subtle" | "dynamic" | "intense";
  showWaves?: boolean;
  showOrbs?: boolean;
  showGrid?: boolean;
  showParticles?: boolean;
  className?: string;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  shape: "circle" | "triangle" | "square" | "hexagon";
  rotation: number;
  rotationSpeed: number;
}

const VisualEffects: React.FC<VisualEffectsProps> = ({
  variant = "dynamic",
  showWaves = true,
  showOrbs = true,
  showGrid = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const shapesRef = useRef<FloatingShape[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const generateShapes = useCallback(() => {
    const shapeCount =
      variant === "subtle" ? 3 : variant === "dynamic" ? 6 : 10;
    const shapes: ("circle" | "triangle" | "square" | "hexagon")[] = [
      "circle",
      "circle",
      "square",
    ];
    const colors = [
      "rgba(139, 92, 246, 0.05)",
      "rgba(59, 130, 246, 0.04)",
      "rgba(236, 72, 153, 0.03)",
    ];

    shapesRef.current = Array.from({ length: shapeCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 40,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.15 + 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
    }));
  }, [variant]);

  const animate = useCallback(() => {
    if (!isVisible || prefersReducedMotion()) return;

    shapesRef.current.forEach((shape) => {
      shape.y -= shape.speed;
      shape.rotation += shape.rotationSpeed;

      if (shape.y < -shape.size) {
        shape.y = window.innerHeight + shape.size;
        shape.x = Math.random() * window.innerWidth;
      }

      const dx = mouseRef.current.x - shape.x;
      const dy = mouseRef.current.y - shape.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        const force = (150 - distance) / 150;
        shape.x += dx * force * 0.01;
        shape.y += dy * force * 0.01;
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [isVisible]);

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      if (variant === "minimal") return;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    }, 32),
    [variant],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    generateShapes();
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [generateShapes, handleMouseMove]);

  useEffect(() => {
    if (isVisible && !prefersReducedMotion()) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animate]);

  const getVariantClasses = () => {
    switch (variant) {
      case "subtle":
        return "opacity-30";
      case "intense":
        return "opacity-80";
      default:
        return "opacity-50";
    }
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${getVariantClasses()} ${className}`}
    >
      {variant !== "minimal" && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/8 to-transparent" />
        </div>
      )}

      {showGrid && variant !== "minimal" && (
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      )}

      {/* Floating geometric shapes */}
      {showOrbs && (
        <div className="absolute inset-0">
          {shapesRef.current.map((shape) => (
            <div
              key={shape.id}
              className="absolute pointer-events-none transition-opacity duration-1000"
              style={{
                left: shape.x,
                top: shape.y,
                width: shape.size,
                height: shape.size,
                opacity: shape.opacity,
                transform: `rotate(${shape.rotation}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <ShapeRenderer shape={shape} />
            </div>
          ))}
        </div>
      )}

      {showWaves && variant === "intense" && (
        <div className="absolute inset-0 overflow-hidden opacity-50">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-900/5 to-transparent"></div>
        </div>
      )}

      {variant !== "minimal" && (
        <div className="absolute inset-0">
          <div
            className="absolute rounded-full blur-2xl opacity-60"
            style={{
              width: "150px",
              height: "150px",
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
              top: "20%",
              left: "20%",
            }}
          />
        </div>
      )}
    </div>
  );
};

const ShapeRenderer: React.FC<{ shape: FloatingShape }> = ({ shape }) => {
  const baseClasses = "w-full h-full backdrop-blur-sm";

  switch (shape.shape) {
    case "circle":
      return (
        <div
          className={`${baseClasses} rounded-full`}
          style={{ backgroundColor: shape.color }}
        />
      );
    case "triangle":
      return (
        <div
          className={baseClasses}
          style={{
            width: 0,
            height: 0,
            borderLeft: `${shape.size / 2}px solid transparent`,
            borderRight: `${shape.size / 2}px solid transparent`,
            borderBottom: `${shape.size}px solid ${shape.color}`,
          }}
        />
      );
    case "square":
      return (
        <div
          className={`${baseClasses} rounded-lg`}
          style={{ backgroundColor: shape.color }}
        />
      );
    case "hexagon":
      return (
        <div
          className={baseClasses}
          style={{
            backgroundColor: shape.color,
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        />
      );
    default:
      return null;
  }
};

export const effectPresets = {
  minimal: {
    variant: "subtle" as const,
    showWaves: false,
    showOrbs: false,
    showGrid: false,
    showParticles: false,
  },
  standard: {
    variant: "dynamic" as const,
    showWaves: false,
    showOrbs: true,
    showGrid: true,
    showParticles: false,
  },
  immersive: {
    variant: "intense" as const,
    showWaves: true,
    showOrbs: true,
    showGrid: true,
    showParticles: false,
  },
};

export default VisualEffects;
