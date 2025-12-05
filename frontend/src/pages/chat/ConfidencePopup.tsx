import { motion } from "framer-motion";
import { Prediction } from "./PredictionDisplay";
import styles from "./ConfidencePopup.module.css";

type ConfidencePopupProps = {
  selectedWord: Prediction;
  userWords: string[];
  isVisible: boolean;
};

const ConfidencePopup = ({ selectedWord, userWords, isVisible }: ConfidencePopupProps) => {
  if (!isVisible) return null;

  // Calculate relationship strength based on word position in sentence
  const calculateRelationship = (word: string, index: number) => {
    // Words closer to the end of the sentence have higher relationship
    // This simulates how context builds up
    const positionFactor = ((index + 1) / userWords.length) * 100;
    const baseLine = selectedWord.confidence;
    
    // Add some variation based on word length (longer words = more context)
    const lengthFactor = Math.min(word.length * 5, 30);
    
    const relationship = Math.min(100, Math.round((positionFactor + lengthFactor + baseLine) / 3));
    return Math.max(40, relationship); // Minimum 40% to show connection
  };

  const getRelationshipLabel = (percentage: number) => {
    if (percentage >= 80) return { emoji: "🌟", text: "Très proche!", color: "#27ae60" };
    if (percentage >= 65) return { emoji: "💪", text: "Bon lien", color: "#3498db" };
    if (percentage >= 50) return { emoji: "👍", text: "Connexion", color: "#f39c12" };
    return { emoji: "🤔", text: "Faible", color: "#e74c3c" };
  };

  return (
    <motion.div
      className={styles.popupContainer}
      initial={{ x: 50, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 50, opacity: 0, scale: 0.9 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        delay: 1 
      }}
    >
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.headerIcon}>🎯</span>
        <h3 className={styles.headerTitle}>Comment ça marche?</h3>
      </div>

      {/* Explanation */}
      <div className={styles.explanation}>
        <p className={styles.explanationText}>
          Le mot <strong className={styles.highlightWord}>"{selectedWord.word}"</strong> est lié aux mots de ta phrase!
        </p>
      </div>

      {/* Relationships */}
      <div className={styles.relationships}>
        {userWords.map((word, index) => {
          const relationship = calculateRelationship(word, index);
          const label = getRelationshipLabel(relationship);
          
          return (
            <motion.div
              key={index}
              className={styles.relationshipItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              {/* Word name */}
              <div className={styles.relationshipWord}>{word}</div>
              
              {/* Progress bar */}
              <div className={styles.progressBarContainer}>
                <motion.div
                  className={styles.progressBar}
                  style={{ 
                    background: `linear-gradient(90deg, ${label.color}, ${label.color}dd)`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${relationship}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.3 + index * 0.1,
                    ease: "easeOut" 
                  }}
                >
                  <div className={styles.progressGlow} />
                </motion.div>
                
                {/* Percentage label */}
                <motion.div
                  className={styles.percentageLabel}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  {relationship}%
                </motion.div>
              </div>
              
              {/* Relationship strength label */}
              <motion.div
                className={styles.strengthLabel}
                style={{ color: label.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1 }}
              >
                {label.emoji} {label.text}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Educational note */}
      <motion.div
        className={styles.educationalNote}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className={styles.noteIcon}>💡</div>
        <p className={styles.noteText}>
          L'IA regarde tous les mots de ta phrase pour prédire le mot suivant!
        </p>
      </motion.div>

      {/* Confidence calculation */}
      <motion.div
        className={styles.confidenceBox}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2 }}
      >
        <div className={styles.confidenceHeader}>
          <span className={styles.confidenceIcon}>📊</span>
          <span className={styles.confidenceTitle}>Confiance totale</span>
        </div>
        <div className={styles.confidenceValue}>
          <span className={styles.confidenceNumber}>{selectedWord.confidence}</span>
          <span className={styles.confidencePercent}>%</span>
        </div>
        <div className={styles.confidenceExplanation}>
          Calculé à partir de toutes les connexions!
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className={styles.decorativeCircle1} />
      <div className={styles.decorativeCircle2} />
      <div className={styles.decorativeCircle3} />
    </motion.div>
  );
};

export default ConfidencePopup;
