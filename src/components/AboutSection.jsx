import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';
import V0FeatureCards from './V0FeatureCards';

const AboutSection = () => {

  return (
    <section className={styles.aboutSection} id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.aboutHeader}
        >
          <h2 className={styles.aboutTitle}>Why We Built Planify</h2>
          <p className={styles.aboutDescription}>
            We noticed that most productivity tools are either too simple to be useful, or too complex to be usable. 
            Teams waste hours learning software instead of getting work done. We built Planify to solve this problem - 
            a platform that's powerful enough for professional teams, yet simple enough for anyone to master in minutes.
          </p>
        </motion.div>

        <V0FeatureCards />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className={styles.aboutCta}
        >
          <p className={styles.ctaText}>
            Ready to experience productivity without the complexity?
          </p>
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};



export default AboutSection;