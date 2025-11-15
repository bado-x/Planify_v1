import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ModernAbout.css';
import HeroSection from './components/HeroSection';
import GlassmorphismCard from './components/GlassmorphismCard';
import Modal from './components/Modal';
import QuoteSection from './components/QuoteSection';
import ScrollIndicator from './components/ScrollIndicator';
import BackgroundEffects from './components/BackgroundEffects';
import usePerformance from './hooks/usePerformance';
import { TrendingUp, Target, Lightbulb } from 'lucide-react';

const ModernAbout = () => {
    const [activeModal, setActiveModal] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const { reducedMotion, getAnimationConfig } = usePerformance();

    // Ensure page is fully loaded
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const modalContent = {
        journey: {
            title: "Our Journey",
            content: "Planify was born from a simple observation: most productivity tools are either too complicated or too basic. We wanted to create something different—a platform that's powerful enough for professional teams, yet simple enough to start using in minutes. We believe that great work happens when tools get out of the way and let teams focus on what matters.",
            icon: TrendingUp
        },
        mission: {
            title: "Mission & Vision",
            content: {
                mission: "To empower individuals and teams to achieve more by providing intuitive tools that turn chaos into clarity, and ideas into action.",
                vision: "A world where productivity tools enhance creativity rather than restrict it—where every team, regardless of size, has access to enterprise-level organization without the enterprise-level complexity."
            },
            icon: Target
        },
        values: {
            title: "Our Values",
            content: [
                {
                    title: "Simplicity First",
                    description: "Powerful doesn't mean complicated"
                },
                {
                    title: "Built for Humans",
                    description: "Technology should adapt to people"
                },
                {
                    title: "Better Together",
                    description: "Great achievements through collaboration"
                },
                {
                    title: "Continuous Growth",
                    description: "We evolve with our users' needs"
                }
            ],
            icon: Lightbulb
        }
    };

    const handleCardClick = (modalType) => {
        setActiveModal(modalType);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
    };

    const scrollToContent = () => {
        const cardsSection = document.getElementById('cards-section');
        if (cardsSection) {
            cardsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-teal-700 flex items-center justify-center">
                <motion.div
                    className="text-white text-2xl font-bold"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    Loading Amazing Experience...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-teal-500 to-teal-700 relative overflow-hidden">
            {/* Background Effects */}
            <BackgroundEffects />

            {/* Hero Section */}
            <HeroSection
                title="About Planify"
                subtitle="Redefining how teams work together"
                onScrollToContent={scrollToContent}
            />

            {/* Scroll Indicator */}
            <ScrollIndicator />

            {/* Cards Section */}
            <section id="cards-section" className="py-20 px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <GlassmorphismCard
                            icon={TrendingUp}
                            title="Our Journey"
                            description="Discover how Planify evolved from a simple idea to a powerful productivity platform"
                            onClick={() => handleCardClick('journey')}
                            delay={0}
                        />
                        <GlassmorphismCard
                            icon={Target}
                            title="Mission & Vision"
                            description="Learn about our mission to empower teams and our vision for the future"
                            onClick={() => handleCardClick('mission')}
                            delay={0.1}
                        />
                        <GlassmorphismCard
                            icon={Lightbulb}
                            title="Our Values"
                            description="The core principles that guide everything we do at Planify"
                            onClick={() => handleCardClick('values')}
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <QuoteSection />

            {/* Modals */}
            {activeModal && (
                <Modal
                    isOpen={!!activeModal}
                    onClose={handleCloseModal}
                    title={modalContent[activeModal].title}
                    content={modalContent[activeModal].content}
                    icon={modalContent[activeModal].icon}
                />
            )}
        </div>
    );
};

export default ModernAbout;