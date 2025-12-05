import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OctobusAnimation from "./OctobusAnimation";
import styles from "./PredictionDisplay.module.css";

export type Prediction = {
  word: string;
  confidence: number;
};

type PredictionDisplayProps = {
  predictions: Prediction[];
  onWordClick?: (word: string) => void;
  userInput?: string;
};

const PredictionDisplay = ({ predictions, onWordClick, userInput = "" }: PredictionDisplayProps) => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [octobusActive, setOctobusActive] = useState<number | null>(null);

  const handleWordClick = (word: string, index: number) => {
    // Trigger sparkle effect
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 600);
    
    // Activate octobus mode after sparkle
    setTimeout(() => {
      setOctobusActive(index);
    }, 300);
    
    onWordClick?.(word);
  };

  const handleCloseOctobus = () => {
    setOctobusActive(null);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 40) return styles.highConfidence;
    if (confidence >= 25) return styles.mediumConfidence;
    return styles.lowConfidence;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      y: 20,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  // Prepare data for octobus mode
  const getOctobusData = () => {
    if (octobusActive === null) return null;
    
    const selectedWord = predictions[octobusActive];
    
    // Split user input into words
    const userWords = userInput
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
      .map((word, idx) => ({ word, index: idx }));
    
    // Calculate angles for positioning words around the octobus
    const angleStep = (2 * Math.PI) / userWords.length;
    const wordsWithAngles = userWords.map((wordData, idx) => ({
      ...wordData,
      angle: idx * angleStep,
    }));
    
    return {
      selectedWord,
      selectedIndex: octobusActive,
      userWords: wordsWithAngles,
    };
  };

  const octobusData = getOctobusData();

  return (
    <>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className={styles.headerIcon}>✨</span>
          <h3 className={styles.headerTitle}>Mots Prédits</h3>
          <span className={styles.headerIcon}>✨</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!octobusActive && (
            <motion.div 
              className={styles.predictionsGrid}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {predictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className={`${styles.predictionCard} ${getConfidenceColor(prediction.confidence)} ${
                    clickedIndex === index ? styles.clicked : ""
                  }`}
                  onClick={() => handleWordClick(prediction.word, index)}
                  whileHover={{ 
                    scale: 1.05,
                    rotate: [0, -2, 2, -2, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Sparkle effect on click */}
                  {clickedIndex === index && (
                    <div className={styles.sparkles}>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={styles.sparkle}
                          initial={{ opacity: 1, scale: 0 }}
                          animate={{ 
                            opacity: 0, 
                            scale: 1,
                            x: Math.cos(i * 60 * Math.PI / 180) * 40,
                            y: Math.sin(i * 60 * Math.PI / 180) * 40,
                          }}
                          transition={{ duration: 0.6 }}
                        >
                          ✨
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Word */}
                  <div className={styles.wordContainer}>
                    <motion.span 
                      className={styles.word}
                      animate={clickedIndex === index ? {
                        scale: [1, 1.2, 1],
                        color: ["#2c3e50", "#f39c12", "#2c3e50"],
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {prediction.word}
                    </motion.span>
                  </div>

                  {/* Confidence Circle */}
                  <div className={styles.confidenceContainer}>
                    <svg className={styles.progressRing} width="80" height="80">
                      <circle
                        className={styles.progressRingBg}
                        cx="40"
                        cy="40"
                        r="32"
                      />
                      <motion.circle
                        className={styles.progressRingCircle}
                        cx="40"
                        cy="40"
                        r="32"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: prediction.confidence / 100 }}
                        transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                      />
                    </svg>
                    <div className={styles.confidenceText}>
                      <span className={styles.confidenceNumber}>{prediction.confidence}</span>
                      <span className={styles.confidencePercent}>%</span>
                    </div>
                  </div>

                  {/* Confidence Label */}
                  <div className={styles.confidenceLabel}>
                    {prediction.confidence >= 40 ? "🌟 Très sûr" : 
                     prediction.confidence >= 25 ? "👍 Bon" : 
                     "🤔 Possible"}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Octobus Animation Overlay */}
      <AnimatePresence>
        {octobusActive !== null && octobusData && (
          <OctobusAnimation
            selectedWord={octobusData.selectedWord}
            userWords={octobusData.userWords}
            onClose={handleCloseOctobus}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PredictionDisplay;
