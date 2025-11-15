import { motion } from "framer-motion";
import { Button } from "react-bootstrap";
import styles from "./BackgroundPaths.module.css";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from "./ui/animated-modal";

function FloatingPaths({ position }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className={styles.floatingPathsContainer}>
      <svg className={styles.floatingPathsSvg} viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.3 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.5, 1, 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function BackgroundPaths({
  title = "YOUR WORKFLOW IS UNIQUE, SIMPLIFY IT IN ONE PLACE",
  subtitle = "Boosting Productivity and Achieving Goals",
  onGetStarted,
  onLearnMore
}) {
  const words = title.split(" ");

  return (
    <div className={styles.backgroundPathsWrapper}>
      <div className={styles.floatingPathsBackground}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className={styles.backgroundPathsContent}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className={styles.backgroundPathsTextContainer}
        >
          <h1 className={styles.backgroundPathsTitle}>
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className={styles.backgroundPathsWord}>
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className={styles.backgroundPathsLetter}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          <p className={styles.backgroundPathsSubtitle}>{subtitle}</p>

          <div className={styles.backgroundPathsButtonsContainer}>
            {/* Start Now Button */}
            <button
              className={`${styles.backgroundPathsButtonPrimary} group/btn`}
              onClick={onGetStarted}
            >
              <span className={`${styles.backgroundPathsButtonText} group-hover/btn:translate-x-40 text-center transition duration-500`}>
                Start Now
              </span>
              <div className={`${styles.backgroundPathsButtonIconContainer} -translate-x-40 group-hover/btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20`}>
                <RocketIcon className={styles.backgroundPathsButtonIcon} />
              </div>
            </button>

            {/* Learn More Button */}
            <button
              className={`${styles.backgroundPathsButtonSecondary} group/btn`}
              onClick={onLearnMore}
            >
              <span className={`${styles.backgroundPathsButtonText} group-hover/btn:translate-x-40 text-center transition duration-500`}>
                Learn More
              </span>
              <div className={`${styles.backgroundPathsButtonIconContainer} -translate-x-40 group-hover/btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 z-20`}>
                <BookIcon className={styles.backgroundPathsButtonIcon} />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
// Button Icons
const RocketIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const BookIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

// Icons for the modal
const TaskIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 11l3 3l8-8" />
    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9s4.03-9 9-9c1.51 0 2.93.37 4.18 1.03" />
  </svg>
);

const CalendarIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ProgressIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="3" />
    <path d="m16.24 7.76l1.42-1.42M20.49 12H22M17.66 16.24l1.42 1.42M12 20.49V22M6.34 16.24l-1.42 1.42M2 12h1.51M4.64 7.76L6.06 6.34" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const TeamIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m22 21-3-3m0 0a5 5 0 0 0-7-7 5 5 0 0 0 7 7z" />
  </svg>
);

const NotificationIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="m13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const AnalyticsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 3v18h18" />
    <path d="m19 9-5 5-4-4-3 3" />
  </svg>
);