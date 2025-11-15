import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import usePerformance from '../hooks/usePerformance';

const HeroSection = ({ title, subtitle, onScrollToContent }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const { reducedMotion, getAnimationConfig } = usePerformance();

    // Parallax transforms
    const titleY = useTransform(scrollY, [0, 300], [0, -50]);
    const subtitleY = useTransform(scrollY, [0, 300], [0, -30]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

    // Animation config based on performance
    const animationConfig = useMemo(() => getAnimationConfig(), [getAnimationConfig]);

    // Mouse tracking for subtle interactive effects
    useEffect(() => {
        if (reducedMotion) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            setMousePosition({
                x: (clientX / innerWidth - 0.5) * 20,
                y: (clientY / innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [reducedMotion]);

    // Split title into words for better animation control
    const titleWords = title.split(' ');

    // Staggered letter animation variants
    const letterVariants = {
        hidden: {
            y: 100,
            opacity: 0,
            rotateX: -90,
            scale: 0.8
        },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: i * 0.03,
                type: "spring",
                stiffness: reducedMotion ? 300 : 150,
                damping: reducedMotion ? 30 : 25,
                duration: reducedMotion ? 0.01 : undefined
            }
        })
    };

    // Word animation variants
    const wordVariants = {
        hidden: { opacity: 0 },
        visible: (i) => ({
            opacity: 1,
            transition: {
                delay: i * 0.2,
                duration: reducedMotion ? 0.01 : 0.6,
                ease: "easeOut"
            }
        })
    };

    // Subtitle animation with typewriter effect
    const [displayedSubtitle, setDisplayedSubtitle] = useState('');

    useEffect(() => {
        if (reducedMotion) {
            setDisplayedSubtitle(subtitle);
            return;
        }

        let index = 0;
        const timer = setInterval(() => {
            if (index < subtitle.length) {
                setDisplayedSubtitle(subtitle.slice(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);

        return () => clearInterval(timer);
    }, [subtitle, reducedMotion]);

    return (
        <section className="min-h-screen flex items-center justify-center relative z-10 px-4 overflow-hidden">
            <div className="text-center max-w-5xl mx-auto">
                {/* Animated Title with Advanced Effects */}
                <motion.div
                    style={{
                        y: reducedMotion ? 0 : titleY,
                        opacity: reducedMotion ? 1 : opacity
                    }}
                    className="relative"
                >
                    {/* Background glow effect */}
                    <motion.div
                        className="absolute inset-0 blur-3xl opacity-30"
                        style={{
                            background: 'linear-gradient(45deg, #2DD4BF, #14B8A6, #0F766E)',
                            transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                        }}
                        animate={!reducedMotion ? {
                            scale: [1, 1.1, 1],
                            rotate: [0, 1, -1, 0]
                        } : {}}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <motion.h1
                        className="relative text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-teal-500 bg-clip-text text-transparent"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            letterSpacing: '-0.02em',
                            lineHeight: '0.9',
                            transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: animationConfig.duration }}
                    >
                        {titleWords.map((word, wordIndex) => (
                            <motion.span
                                key={wordIndex}
                                className="inline-block mr-4 md:mr-6"
                                variants={wordVariants}
                                initial="hidden"
                                animate="visible"
                                custom={wordIndex}
                            >
                                {word.split('').map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        custom={wordIndex * word.length + letterIndex}
                                        className="inline-block"
                                        whileHover={!reducedMotion ? {
                                            scale: 1.1,
                                            y: -5,
                                            transition: { duration: 0.2 }
                                        } : {}}
                                        style={{
                                            transformOrigin: 'center bottom',
                                            textShadow: '0 0 30px rgba(45, 212, 191, 0.5)'
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.span>
                        ))}
                    </motion.h1>
                </motion.div>

                {/* Enhanced Subtitle with Typewriter Effect */}
                <motion.div
                    style={{
                        y: reducedMotion ? 0 : subtitleY,
                        opacity: reducedMotion ? 1 : opacity
                    }}
                    className="relative"
                >
                    <motion.p
                        className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 font-light tracking-wide"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: animationConfig.duration,
                            delay: reducedMotion ? 0 : 1.5,
                            ease: "easeOut"
                        }}
                        style={{
                            transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                        }}
                    >
                        {displayedSubtitle}
                        {!reducedMotion && displayedSubtitle.length < subtitle.length && (
                            <motion.span
                                className="inline-block w-0.5 h-6 bg-emerald-400 ml-1"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.p>
                </motion.div>

                {/* Floating Action Hint */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: animationConfig.duration,
                        delay: reducedMotion ? 0 : 2.5,
                        ease: "easeOut"
                    }}
                    className="relative"
                >
                    <motion.button
                        onClick={onScrollToContent}
                        className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300"
                        whileHover={!reducedMotion ? {
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0 10px 30px rgba(45, 212, 191, 0.3)"
                        } : {}}
                        whileTap={!reducedMotion ? { scale: 0.95 } : {}}
                        style={{
                            transform: reducedMotion ? 'none' : `translate(${mousePosition.x * 0.005}px, ${mousePosition.y * 0.005}px)`
                        }}
                    >
                        <span className="relative z-10">Explore Our Story</span>

                        {/* Button glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Ripple effect */}
                        <motion.div
                            className="absolute inset-0 rounded-full border-2 border-emerald-400/50"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={!reducedMotion ? {
                                scale: [1, 1.5, 2],
                                opacity: [0.5, 0.2, 0]
                            } : {}}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut"
                            }}
                        />
                    </motion.button>
                </motion.div>

                {/* Decorative Elements */}
                {!reducedMotion && (
                    <>
                        <motion.div
                            className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full opacity-60"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{
                                transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)`
                            }}
                        />

                        <motion.div
                            className="absolute top-1/3 right-1/4 w-1 h-1 bg-teal-400 rounded-full opacity-40"
                            animate={{
                                scale: [1, 2, 1],
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1
                            }}
                            style={{
                                transform: `translate(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px)`
                            }}
                        />

                        <motion.div
                            className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-50"
                            animate={{
                                scale: [1, 1.8, 1],
                                opacity: [0.5, 0.9, 0.5]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 2
                            }}
                            style={{
                                transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px)`
                            }}
                        />
                    </>
                )}
            </div>
        </section>
    );
};

export default HeroSection;