import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useParallax from '../hooks/useParallax';
import usePerformance from '../hooks/usePerformance';

const BackgroundEffects = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { isLowPerformance, reducedMotion, getAnimationConfig } = usePerformance();
    const gradientRef = useParallax(0.3, { enableOnMobile: false });
    const linesRef = useParallax(0.5, { enableOnMobile: false });
    const particlesRef = useRef(null);
    const canvasRef = useRef(null);

    // Animation config based on performance
    const animationConfig = useMemo(() => getAnimationConfig(), [getAnimationConfig]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Particle system for desktop only
    useEffect(() => {
        if (isMobile || isLowPerformance || reducedMotion || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = -10;
                this.speed = Math.random() * 2 + 0.5;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.y += this.speed;
                this.x += Math.sin(this.y * 0.01) * 0.5;

                if (this.y > canvas.height + 10) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = '#2DD4BF';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Create particles
        const particles = Array.from({ length: 50 }, () => new Particle());

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [isMobile, isLowPerformance, reducedMotion]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Animated Gradient Mesh */}
            <motion.div
                ref={gradientRef}
                className={`absolute inset-0 ${isMobile ? 'opacity-20' : 'opacity-30'}`}
                style={{
                    background: 'linear-gradient(45deg, #2DD4BF, #14B8A6, #0F766E, #2DD4BF)',
                    backgroundSize: '400% 400%',
                    willChange: 'background-position'
                }}
                animate={!reducedMotion ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                } : {}}
                transition={{
                    duration: reducedMotion ? 0 : 15,
                    repeat: reducedMotion ? 0 : Infinity,
                    ease: "linear"
                }}
            />

            {/* Flowing Geometric Lines - Hidden on mobile for performance */}
            {!isMobile && (
                <motion.svg
                    ref={linesRef}
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 1200 800"
                    preserveAspectRatio="xMidYMid slice"
                    style={{ willChange: 'transform' }}
                >
                    <defs>
                        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#0F766E" stopOpacity="0.4" />
                        </linearGradient>
                        <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#0F766E" stopOpacity="0.6" />
                            <stop offset="50%" stopColor="#14B8A6" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>

                    {/* Primary flowing line */}
                    <motion.path
                        d="M0,400 Q300,200 600,400 T1200,400"
                        stroke="url(#lineGradient1)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: reducedMotion ? 1 : 1,
                            opacity: reducedMotion ? 0.5 : 1
                        }}
                        transition={{
                            duration: reducedMotion ? 0.01 : 3,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Secondary flowing line */}
                    <motion.path
                        d="M0,300 Q400,100 800,300 T1200,300"
                        stroke="url(#lineGradient2)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: reducedMotion ? 1 : 1,
                            opacity: reducedMotion ? 0.3 : 1
                        }}
                        transition={{
                            duration: reducedMotion ? 0.01 : 4,
                            delay: reducedMotion ? 0 : 0.5,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Tertiary flowing line */}
                    <motion.path
                        d="M0,500 Q200,300 400,500 T800,500 T1200,500"
                        stroke="url(#lineGradient1)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: reducedMotion ? 1 : 1,
                            opacity: reducedMotion ? 0.2 : 1
                        }}
                        transition={{
                            duration: reducedMotion ? 0.01 : 5,
                            delay: reducedMotion ? 0 : 1,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Animated stroke dash for dynamic effect */}
                    {!reducedMotion && !isLowPerformance && (
                        <motion.path
                            d="M0,600 Q600,400 1200,600"
                            stroke="url(#lineGradient2)"
                            strokeWidth="0.5"
                            fill="none"
                            strokeDasharray="20 40"
                            initial={{ strokeDashoffset: 0 }}
                            animate={{ strokeDashoffset: -60 }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    )}
                </motion.svg>
            )}

            {/* Particle Canvas - Desktop only */}
            {!isMobile && !isLowPerformance && !reducedMotion && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ mixBlendMode: 'screen' }}
                />
            )}

            {/* Subtle Grid Pattern */}
            <div
                className={`absolute inset-0 ${isMobile ? 'opacity-3' : 'opacity-5'}`}
                style={{
                    backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.1) 1px, transparent 1px)
          `,
                    backgroundSize: isMobile ? '30px 30px' : '50px 50px'
                }}
            />

            {/* Radial gradient overlay for depth */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 118, 110, 0.1) 70%, rgba(15, 118, 110, 0.2) 100%)'
                }}
            />
        </div>
    );
};

export default BackgroundEffects;