import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';

const V0FeatureCards = () => {
  const features = [
    {
      title: "Simple",
      subtitle: "No complexity",
      description: "We believe productivity tools should be intuitive, not overwhelming. Our clean interface gets you started in minutes.",
      icon: "⚡",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Powerful", 
      subtitle: "All features you need",
      description: "From task management to team collaboration, we've packed everything you need without the bloat.",
      icon: "🚀",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Affordable",
      subtitle: "Fair pricing for everyone", 
      description: "Quality productivity tools shouldn't break the bank. We offer transparent, fair pricing for individuals and teams.",
      icon: "💎",
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 h-full">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating orb effect */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-8 h-full flex flex-col">
                {/* Icon section */}
                <div className="mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl flex items-center justify-center border border-slate-600/50 group-hover:border-emerald-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <span className="text-2xl filter drop-shadow-lg">{feature.icon}</span>
                    </div>
                    {/* Glow effect behind icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>
                </div>

                {/* Content section */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-emerald-400 text-sm font-medium uppercase tracking-wider group-hover:text-white transition-colors duration-300">
                      {feature.subtitle}
                    </p>
                  </div>
                  
                  <p className="text-slate-300 text-sm leading-relaxed group-hover:text-slate-100 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom section */}
                <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-xs text-slate-400 group-hover:text-emerald-400 transition-colors duration-300">
                      Active
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono group-hover:text-slate-300 transition-colors duration-300">
                    #{String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Hover line effect */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default V0FeatureCards;