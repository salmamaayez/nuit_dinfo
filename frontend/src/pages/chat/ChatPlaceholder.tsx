import { motion } from "framer-motion";
import QuickSuggestions from "../../components/chat/QuickSuggestions";
import styles from "../Chat.module.css";

type Props = {
  onSuggestionClick: (suggestion: string) => void;
  variants: any;
};

const ChatPlaceholder = ({ onSuggestionClick, variants }: Props) => {
  return (
    <div className={styles.no_msgs}>
      <h2>Bienvenue dans ton Chatbot Complète-Phrase !</h2>
      <motion.div
        className={styles.no_msg_logo}
        variants={variants}
        animate="animate"
      ></motion.div>
      <div className={styles.instructions}>
        <p className={styles.intro}>
          Ici, c'est simple : <strong>tu commences… l'IA termine !</strong>
        </p>
        <p>
          Tape un mot, un début de phrase, même un truc bizarre — et regarde comment notre 
          assistant intelligent imagine la suite. Chaque mot proposé est accompagné d'un 
          <strong> score</strong> qui te montre à quel point il est pertinent dans la phrase.
        </p>
        <div className={styles.gameSteps}>
          <div className={styles.step}>
            <span className={styles.stepIcon}>🔍</span>
            <span className={styles.stepText}>Tu testes</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>🤖</span>
            <span className={styles.stepText}>L'IA propose</span>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>📊</span>
            <span className={styles.stepText}>Tu découvres comment elle réfléchit</span>
          </div>
        </div>
        <p className={styles.footer}>
          Ce chat n'est pas juste là pour répondre… <strong>il est là pour t'apprendre</strong> 
          comment une IA choisit, prédit, et construit une idée.
        </p>
      </div>
      <QuickSuggestions onSuggestionClick={onSuggestionClick} />
    </div>
  );
};

export default ChatPlaceholder;
