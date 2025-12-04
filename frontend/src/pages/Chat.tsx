import { useRef, useState, useEffect, useLayoutEffect } from "react";
//import { motion } from "framer-motion";
import toast from "react-hot-toast";

import styles from "./Chat.module.css";
import ChatInput from "./chat/ChatInput";
import ChatMessages from "./chat/ChatMessages";
import ChatPlaceholder from "./chat/ChatPlaceholder";
import ChatLoading from "../components/chat/ChatLoading";
import PredictionDisplay from "./chat/PredictionDisplay";

import { getPredictions, Prediction } from "../../helpers/api"; // Ton backend

export type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteChatToggle, setDeleteChatToggle] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const variants = {
    animate: {
      y: [0, -10, 0, -10, 0],
      transition: {
        type: "spring",
        y: { repeat: Infinity, duration: 4, stiffness: 100, damping: 5 },
      },
    },
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMsgHandler = async () => {
    const content = inputRef.current?.value;
    if (!content) return;

    if (inputRef.current) inputRef.current.value = "";
    setChatMessages(prev => [...prev, { role: "user", content }]);
    setIsLoading(true);

    try {
      const newPredictions = await getPredictions(content);
      setPredictions(newPredictions);

      const confirmationMsg = `✨ J'ai analysé ton message ! Voici mes prédictions pour toi :`;

      setChatMessages(prev => [
        ...prev,
        { role: "assistant", content: confirmationMsg }
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de la récupération des prédictions 😕");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDelete = () => setDeleteChatToggle(prev => !prev);

  const handleSuggestionClick = (suggestion: string) => {
    if (inputRef.current) {
      inputRef.current.value = suggestion;
      inputRef.current.focus();
    }
  };

  const handlePredictionClick = (word: string) => {
    if (inputRef.current) {
      const currentValue = inputRef.current.value;
      inputRef.current.value = currentValue ? `${currentValue} ${word}` : word;
      inputRef.current.focus();
    }
  };

  const clearChats = () => {
    setChatMessages([]);
    setPredictions([]);
    setDeleteChatToggle(false);
  };

  return (
    <div className={styles.parent}>
      <div className={styles.chat} ref={messageContainerRef}>
{chatMessages.length === 0 ? (
  <ChatPlaceholder onSuggestionClick={handleSuggestionClick} variants={variants} />
) : (
  <>
    <ChatMessages 
      messages={chatMessages} 
      onRegenerate={(index) => {
        const userMessage = chatMessages[index - 1];
        if (!userMessage || userMessage.role !== "user") return;
        // Ici tu peux rappeler ton backend pour régénérer
        sendMsgHandler(); // simple exemple
      }}
    />
    {predictions.length > 0 && (
      <PredictionDisplay 
        predictions={predictions} 
        onWordClick={handlePredictionClick}
      />
    )}
  </>
)}
        {isLoading && <ChatLoading />}
      </div>
      <ChatInput
        inputRef={inputRef}
        deleteChatToggle={deleteChatToggle}
        toggleDelete={toggleDelete}
        clearChats={clearChats}
        sendMsg={sendMsgHandler}
        logoVariants={variants}
        isDisabled={isLoading}
      />
    </div>
  );
};

export default Chat;
