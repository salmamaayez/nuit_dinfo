import React from 'react';
import styles from './MessageActions.module.css';
import toast from 'react-hot-toast';
import { CopyIcon, RefreshIcon } from './Icons';

interface MessageActionsProps {
	content: string;
	role: 'user' | 'assistant';
	onRegenerate?: () => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({ content, role, onRegenerate }) => {
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(content);
			toast.success('Message copié !', { duration: 2000 });
		} catch (err) {
			toast.error('Erreur de copie', { duration: 2000 });
		}
	};

	return (
		<div className={styles.actions}>
			<button
				className={styles.actionBtn}
				onClick={handleCopy}
				title="Copier le message"
			>
				<CopyIcon />
			</button>
			
			{role === 'assistant' && onRegenerate && (
				<button
					className={styles.actionBtn}
					onClick={onRegenerate}
					title="Régénérer la réponse"
				>
					<RefreshIcon />
				</button>
			)}
		</div>
	);
};

export default MessageActions;
