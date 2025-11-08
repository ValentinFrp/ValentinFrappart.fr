import React, { useEffect, useRef, useCallback, useState } from "react";
import { throttle, prefersReducedMotion } from "../utils/seo";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

interface InteractiveParticlesProps {
  count?: number;
  colors?: string[];
  maxSize?: number;
  minSize?: number;
  speed?: number;
  interactive?: boolean;
  connectionDistance?: number;
  showConnections?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  count = 50,
  colors = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE"],
  maxSize = 4,
  minSize = 1,
  speed = 0.5,
  interactive = true,
  connectionDistance = 150,
  showConnections = true,
  className = "",
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: Math.random() * (maxSize - minSize) + minSize,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: Math.random() * 1000,
      maxLife: 1000 + Math.random() * 1000,
    }));
  }, [count, colors, maxSize, minSize, speed]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x <= 0 || particle.x >= canvas.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= canvas.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      }

      particle.life += 1;
      if (particle.life > particle.maxLife) {
        particle.life = 0;
        particle.x = Math.random() * canvas.width;
        particle.y = Math.random() * canvas.height;
        particle.opacity = Math.random() * 0.5 + 0.3;
      }

      const lifeCycle = particle.life / particle.maxLife;
      particle.opacity = 0.3 + 0.4 * Math.sin(lifeCycle * Math.PI);

      if (interactive) {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.001;
          particle.vy += dy * force * 0.001;
        }

        const maxVelocity = speed * 2;
        particle.vx = Math.max(
          -maxVelocity,
          Math.min(maxVelocity, particle.vx),
        );
        particle.vy = Math.max(
          -maxVelocity,
          Math.min(maxVelocity, particle.vy),
        );

        particle.vx *= 0.99;
        particle.vy *= 0.99;
      }
    });
  }, [interactive, speed]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showConnections) {
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    }

    particlesRef.current.forEach((particle) => {
      ctx.save();

      const gradient = ctx.createRadialGradient(
        particle.x,
        particle.y,
        0,
        particle.x,
        particle.y,
        particle.size,
      );
      gradient.addColorStop(
        0,
        `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
      );
      gradient.addColorStop(1, `${particle.color}00`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 10;
      ctx.shadowColor = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }, [showConnections, connectionDistance]);

  const animate = useCallback(() => {
    if (!isVisible || prefersReducedMotion()) return;

    updateParticles();
    draw();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [isVisible, updateParticles, draw]);

  const handleMouseMove = useCallback(
    throttle((event: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || !interactive) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    }, 16),
    [interactive],
  );

  const handleResize = useCallback(
    throttle(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        initializeParticles();
      }
    }, 250),
    [initializeParticles],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    initializeParticles();

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [interactive, handleMouseMove, handleResize, initializeParticles]);

  useEffect(() => {
    if (isVisible && !prefersReducedMotion()) {
      animate();
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, animate]);

  const handleTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (!interactive) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const touch = event.touches[0];

      mouseRef.current = {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    },
    [interactive],
  );

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        onTouchMove={handleTouchMove}
        style={{
          mixBlendMode: "screen",
          filter: "blur(0.5px)",
        }}
      />
    </div>
  );
};

export const particlePresets = {
  subtle: {
    count: 30,
    colors: ["#8B5CF6", "#A78BFA"],
    maxSize: 2,
    minSize: 1,
    speed: 0.3,
    showConnections: false,
  },
  energetic: {
    count: 80,
    colors: ["#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE", "#F3F4F6"],
    maxSize: 6,
    minSize: 2,
    speed: 1,
    showConnections: true,
    connectionDistance: 120,
  },
  minimal: {
    count: 20,
    colors: ["#8B5CF6"],
    maxSize: 3,
    minSize: 2,
    speed: 0.2,
    showConnections: false,
    interactive: false,
  },
  network: {
    count: 40,
    colors: ["#8B5CF6", "#3B82F6"],
    maxSize: 3,
    minSize: 2,
    speed: 0.4,
    showConnections: true,
    connectionDistance: 200,
  },
};

export default InteractiveParticles;
