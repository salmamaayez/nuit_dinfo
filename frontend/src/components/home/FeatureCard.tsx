import React from 'react';
import styles from './FeatureCard.module.css';

interface FeatureCardProps {
	icon: string;
	title: string;
	description: string;
	color?: 'green' | 'blue' | 'orange' | 'burgundy';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
	icon, 
	title, 
	description,
	color = 'green' 
}) => {
	return (
		<div className={`${styles.card} ${styles[color]}`}>
			<div className={styles.iconWrapper}>
				<span className={styles.icon}>{icon}</span>
			</div>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.description}>{description}</p>
		</div>
	);
};

export default FeatureCard;
