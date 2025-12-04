
import ReactMarkdown from 'react-markdown';
import reactGFM from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { motion } from 'framer-motion';

import styles from "./ChatItem.module.css";
import 'highlight.js/styles/atom-one-dark.css';
//import MessageActions from './MessageActions';
import { BotIcon, UserIcon } from './Icons';


type Props = {
	content: string;
	role: string;
	onRegenerate?: () => void;
};

const ChatItem = (props: Props) => {

	const messageVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: { duration: 0.4, ease: "easeOut" }
		}
	};

	const botMsg = (
		<motion.div 
			className={`${styles.parent} ${styles.bot_parent}`}
			variants={messageVariants}
			initial="hidden"
			animate="visible"
		>
			<div className={`${styles.avatar} ${styles.bot_avatar}`}>
				<BotIcon />
			</div>
			<div className={styles.messageContent}>
				<div className={`${styles.msg} markdown-body`}>
					<ReactMarkdown remarkPlugins={[reactGFM]} rehypePlugins={[rehypeHighlight]}>  
						{props.content}
					</ReactMarkdown>
				</div>
				{/*<MessageActions 
					content={props.content} 
					role="assistant" 
					onRegenerate={props.onRegenerate}
				/>*/}
			</div>
		</motion.div>
	);

	const userMsg = (
		<motion.div 
			className={`${styles.parent} ${styles.user_parent}`}
			variants={messageVariants}
			initial="hidden"
			animate="visible"
		>
			<div className={`${styles.avatar} ${styles.user_avatar}`}>
				<UserIcon />
			</div>
			<div className={styles.messageContent}>
				<div className={styles.msg}>
					<p>{props.content}</p>
				</div>
				{/*<MessageActions 
					content={props.content} 
					role="user"
				/>*/}
			</div>
		</motion.div>
	);

	return (
		<>
			{props.role === "assistant" && botMsg}
			{props.role === "user" && userMsg}
		</>
	);
};

export default ChatItem;



