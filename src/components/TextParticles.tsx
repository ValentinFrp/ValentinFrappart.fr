import React, { useEffect, useRef } from 'react';

interface TextParticlesProps {
    text: string;
    className?: string;
}

interface Particle {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
}

const TextParticles: React.FC<TextParticlesProps> = ({ text, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mousePosition = useRef({ x: 0, y: 0 });
    const isHovering = useRef(false);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const updateCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            createTextParticles();
        };

        const createTextParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.font = 'bold 48px Inter, system-ui, sans-serif';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            particlesRef.current = [];

            for (let y = 0; y < canvas.height; y += 4) {
                for (let x = 0; x < canvas.width; x += 4) {
                    const index = (y * canvas.width + x) * 4;
                    if (pixels[index + 3] > 128) {
                        particlesRef.current.push({
                            x: Math.random() * canvas.width,
                            y: Math.random() * canvas.height,
                            targetX: x,
                            targetY: y,
                            size: 2,
                            color: 'white',
                            vx: 0,
                            vy: 0
                        });
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach(particle => {
                const dx = particle.targetX - particle.x;
                const dy = particle.targetY - particle.y;

                if (isHovering.current) {
                    const mouseX = mousePosition.current.x;
                    const mouseY = mousePosition.current.y;
                    const distX = mouseX - particle.x;
                    const distY = mouseY - particle.y;
                    const distance = Math.sqrt(distX * distX + distY * distY);

                    if (distance < 100) {
                        const force = (100 - distance) / 100;
                        particle.vx -= (distX / distance) * force * 2;
                        particle.vy -= (distY / distance) * force * 2;
                    }
                }

                particle.vx += dx * 0.08;
                particle.vy += dy * 0.08;
                particle.vx *= 0.92;
                particle.vy *= 0.92;
                particle.x += particle.vx;
                particle.y += particle.vy;

                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
            });

            animationFrameId.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePosition.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseEnter = () => {
            isHovering.current = true;
        };

        const handleMouseLeave = () => {
            isHovering.current = false;
        };

        window.addEventListener('resize', updateCanvasSize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        updateCanvasSize();
        animate();

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [text]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-24 ${className}`}
        />
    );
};

export default TextParticles;