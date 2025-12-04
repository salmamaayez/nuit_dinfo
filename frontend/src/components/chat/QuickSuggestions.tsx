import React from 'react';
import styles from './QuickSuggestions.module.css';
import { SparklesIcon } from './Icons';

interface QuickSuggestionsProps {
	onSuggestionClick: (suggestion: string) => void;
}

const QuickSuggestions: React.FC<QuickSuggestionsProps> = ({ onSuggestionClick }) => {
	const suggestions = [
		"Il était une fois",
		"Aujourd'hui je vais",
		"L'intelligence artificielle est",
		"Dans le futur, les robots",
		"Mon animal préféré est",
		"Si j'étais un super-héros",
		"La science permet de",
		"Un ordinateur peut"
	];

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>💡 Envie d'essayer ? Clique sur une phrase :</h3>
			<div className={styles.suggestionsGrid}>
				{suggestions.map((suggestion, index) => (
					<button
						key={index}
						className={styles.suggestionBtn}
						onClick={() => onSuggestionClick(suggestion)}
					>
						<SparklesIcon />
						<span className={styles.text}>{suggestion}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default QuickSuggestions;
