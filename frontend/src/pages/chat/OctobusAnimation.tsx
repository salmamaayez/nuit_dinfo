import { motion } from "framer-motion";
import { Prediction } from "./PredictionDisplay";
import styles from "./OctobusAnimation.module.css";

type OctobusAnimationProps = {
  selectedWord: Prediction;
  userWords: Array<{ word: string; index: number; angle: number }>;
  onClose: () => void;
};

const OctobusAnimation = ({
  selectedWord,
  userWords,
  onClose,
}: OctobusAnimationProps) => {
  return (
    <motion.div
      className={styles.octobusContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background overlay */}
      <div className={styles.overlay} onClick={onClose} />

      {/* SVG for tentacles */}
      <svg className={styles.tentaclesSvg} viewBox="0 0 100 100">
        <defs>
          {/* Gradient for tentacles */}
          <linearGradient id="tentacleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9b59b6" />
            <stop offset="50%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#3498db" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="tentacleGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

      {/* Draw lines connecting words to each other */}
        {userWords.map((wordData, idx) => {
          const distance = 45; // Distance from center for positioning
          const x1 = 50 + Math.cos(wordData.angle) * distance;
          const y1 = 50 + Math.sin(wordData.angle) * distance;
          
          // Connect to next word (creating a circle)
          const nextIdx = (idx + 1) % userWords.length;
          const nextWord = userWords[nextIdx];
          const x2 = 50 + Math.cos(nextWord.angle) * distance;
          const y2 = 50 + Math.sin(nextWord.angle) * distance;
          
          return (
            <g key={idx}>
              {/* Line connecting this word to next word */}
              <motion.line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="url(#tentacleGradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
                filter="url(#tentacleGlow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: 1, 
                  opacity: 1,
                }}
                transition={{ 
                  duration: 0.7, 
                  delay: idx * 0.15,
                  ease: "easeOut"
                }}
                className={styles.tentacle}
              />
              
              {/* Animated particle along the line */}
              <motion.circle
                r="0.5"
                fill="#fff"
                filter="url(#tentacleGlow)"
                initial={{ 
                  cx: x1,
                  cy: y1
                }}
                animate={{ 
                  cx: [x1, x2, x1],
                  cy: [y1, y2, y1],
                }}
                transition={{
                  duration: 2,
                  delay: idx * 0.15 + 0.7,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Octobus Head (center) */}
      <motion.div
        className={styles.octobusHead}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 15,
          delay: 0.3 
        }}
      >
        {/* Bobbing animation */}
        <motion.div
          className={styles.headInner}
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Eyes */}
          <div className={styles.eyes}>
            <motion.div 
              className={styles.eye}
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <div className={styles.pupil} />
            </motion.div>
            <motion.div 
              className={styles.eye}
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
            >
              <div className={styles.pupil} />
            </motion.div>
          </div>
          
          {/* Smile */}
          <div className={styles.smile}>
            <svg viewBox="0 0 100 50" className={styles.smileSvg}>
              <path
                d="M 20 20 Q 50 40 80 20"
                stroke="#2c3e50"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>
          
          {/* Word text */}
          <div className={styles.headWord}>{selectedWord.word}</div>
        </motion.div>
        
        {/* Glow effect */}
        <div className={styles.headGlow} />
      </motion.div>

      {/* Other words positioned around the octobus */}
      {userWords.map((wordData, idx) => {
        const radius = 280; // Distance from center in pixels
        const x = Math.cos(wordData.angle) * radius;
        const y = Math.sin(wordData.angle) * radius;
        
        return (
          <motion.div
            key={idx}
            className={styles.orbitWord}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x,
              y,
            }}
            transition={{ 
              duration: 0.6,
              delay: idx * 0.15 + 0.5,
              type: "spring",
              stiffness: 150
            }}
          >
            <div className={styles.wordBubble}>
              <div className={styles.wordText}>{wordData.word}</div>
            </div>
          </motion.div>
        );
      })}

      {/* Floating particles in background */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.floatingParticle}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Explanatory message at bottom */}
      <motion.div
        className={styles.explanationMessage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className={styles.messageIcon}>💡</div>
        <div className={styles.messageText}>
          Le pourcentage (<strong>{selectedWord.confidence}%</strong>) est calculé d'après les <strong>relations entre ces mots</strong>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OctobusAnimation;
