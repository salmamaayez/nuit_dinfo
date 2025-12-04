import { AnimatePresence, motion } from "framer-motion";
import sendIcon from "/logos/send-icon.png";
import upArrow from "/logos/up-arrow.png";
import styles from "../Chat.module.css";

type Props = {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  deleteChatToggle: boolean;
  toggleDelete: () => void;
  clearChats: () => void;
  sendMsg: () => void;
  logoVariants: any;
  isDisabled: boolean;
};

const ChatInput = ({
  inputRef,
  deleteChatToggle,
  toggleDelete,
  clearChats,
  sendMsg,
  logoVariants,
  isDisabled,
}: Props) => {
  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputArea}>
        <div className={styles.eraseMsgs}>
          <motion.img
            variants={logoVariants}
            animate={!deleteChatToggle ? "animate" : "animateReverse"}
            src={upArrow}
            alt="top icon"
            onClick={toggleDelete}
          />
          <AnimatePresence>
            {deleteChatToggle && (
              <motion.button
                className={styles.eraseBtn}
                onClick={clearChats}
                variants={logoVariants}
                initial="initialBtn"
                animate="animateBtn"
                exit="exitBtn"
              >
                supprimer chat
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <textarea
          className={styles.textArea}
          maxLength={1500}
          ref={inputRef}
          rows={1}
          disabled={isDisabled}
          placeholder="Entrez le début de la phrase"
        />
        <button className={styles.icon} onClick={sendMsg} disabled={isDisabled}>
          <img alt="icon" src={sendIcon} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
