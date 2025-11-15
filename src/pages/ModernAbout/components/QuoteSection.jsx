import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Users } from 'lucide-react';
import usePerformance from '../hooks/usePerformance';

const QuoteSection = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const { reducedMotion, getAnimationConfig } = usePerformance();

    // Parallax effects
    const y = useTransform(scrollY, [0, 1000], [0, -100]);
    const opacity = useTransform(scrollY, [600, 800, 1000], [0, 1, 0.8]);

    // Animation config
    const animationConfig = getAnimationConfig();

    // Mouse tracking for interactive effects
    useEffect(() => {
        if (reducedMotion) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            setMousePosition({
                x: (clientX / innerWidth - 0.5) * 30,
                y: (clientY / innerHeight - 0.5) * 30
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [reducedMotion]);

    // Typewriter effect for quote
    const quoteText = "Building the future of productivity, one feature at a time.";
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (reducedMotion) {
            setDisplayedText(quoteText);
            setShowCursor(false);
            return;
        }

        let index = 0;
        const timer = setInterval(() => {
            if (index < quoteText.length) {
                setDisplayedText(quoteText.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
                setShowCursor(false);
            }
        }, 80);

        return () => clearInterval(timer);
    }, [reducedMotion]);

    return (
        <section className="py-20 px-4 relative z-10 overflow-hidden">
            <motion.div
                className="max-w-5xl mx-auto"
                style={{ y: reducedMotion ? 0 : y, opacity: reducedMotion ? 1 : opacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: animationConfig.duration, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative p-12 md:p-16 rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                >
                    {/* Animated background pattern */}
                    <motion.div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 20% 20%, #2DD4BF 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, #14B8A6 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, #0F766E 0%, transparent 50%)
              `,
                        }}
                        animate={!reducedMotion ? {
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                        } : {}}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    {/* Decorative Quote Marks */}
                    <motion.div
                        className="absolute top-8 left-8 text-emerald-400/30"
                        style={{
                            transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                        }}
                        animate={!reducedMotion ? {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                        } : {}}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Quote size={80} strokeWidth={1} />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-8 right-8 text-teal-400/30 rotate-180"
                        style={{
                            transform: reducedMotion ? 'rotate(180deg)' : `rotate(180deg) translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px)`
                        }}
                        animate={!reducedMotion ? {
                            rotate: [180, 185, 175, 180],
                            scale: [1, 1.1, 1]
                        } : {}}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                        }}
                    >
                        <Quote size={80} strokeWidth={1} />
                    </motion.div>

                    {/* Main Quote */}
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <motion.blockquote
                            className="text-2xl md:text-3xl lg:text-4xl italic text-white font-light leading-relaxed mb-12"
                            style={{
                                fontFamily: 'Georgia, serif',
                                transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                            }}
                        >
                            <span className="relative">
                                "{displayedText}"
                                {showCursor && !reducedMotion && (
                                    <motion.span
                                        className="inline-block w-1 h-8 bg-emerald-400 ml-2"
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    />
                                )}

                                {/* Text glow effect */}
                                <motion.span
                                    className="absolute inset-0 blur-sm opacity-30"
                                    style={{ color: '#2DD4BF' }}
                                    animate={!reducedMotion ? {
                                        opacity: [0.3, 0.5, 0.3]
                                    } : {}}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    "{displayedText}"
                                </motion.span>
                            </span>
                        </motion.blockquote>

                        {/* Attribution Section */}
                        <motion.div
                            className="flex items-center justify-center space-x-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: animationConfig.duration, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            {/* Team Avatar */}
                            <motion.div
                                className="relative"
                                whileHover={!reducedMotion ? {
                                    scale: 1.1,
                                    rotate: 5,
                                    transition: { duration: 0.3 }
                                } : {}}
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                                    <Users size={28} className="text-white" />
                                </div>

                                {/* Pulsing ring */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                                    animate={!reducedMotion ? {
                                        scale: [1, 1.3, 1],
                                        opacity: [0.5, 0, 0.5]
                                    } : {}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                />
                            </motion.div>

                            {/* Attribution Text */}
                            <div className="text-left">
                                <motion.cite
                                    className="text-xl font-semibold text-white not-italic block"
                                    style={{
                                        transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                                    }}
                                >
                                    The Planify Team
                                </motion.cite>
                                <motion.p
                                    className="text-emerald-400/80 text-sm font-medium"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: animationConfig.duration, delay: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    Building Tomorrow's Productivity
                                </motion.p>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        {!reducedMotion && (
                            <>
                                {/* Floating orbs */}
                                <motion.div
                                    className="absolute top-1/4 left-1/4 w-3 h-3 bg-emerald-400/60 rounded-full"
                                    animate={{
                                        y: [-10, 10, -10],
                                        opacity: [0.6, 1, 0.6],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)`
                                    }}
                                />

                                <motion.div
                                    className="absolute top-3/4 right-1/4 w-2 h-2 bg-teal-400/50 rounded-full"
                                    animate={{
                                        y: [10, -10, 10],
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [1, 1.5, 1]
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1
                                    }}
                                    style={{
                                        transform: `translate(${mousePosition.x * -0.15}px, ${mousePosition.y * -0.15}px)`
                                    }}
                                />

                                <motion.div
                                    className="absolute bottom-1/3 left-1/6 w-1.5 h-1.5 bg-emerald-300/70 rounded-full"
                                    animate={{
                                        y: [-5, 15, -5],
                                        opacity: [0.7, 1, 0.7],
                                        scale: [1, 1.3, 1]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 2
                                    }}
                                    style={{
                                        transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                                    }}
                                />
                            </>
                        )}
                    </div>

                    {/* Gradient overlay for depth */}
                    <div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.3) 70%, rgba(15, 23, 42, 0.6) 100%)',
                            pointerEvents: 'none'
                        }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default QuoteSection;