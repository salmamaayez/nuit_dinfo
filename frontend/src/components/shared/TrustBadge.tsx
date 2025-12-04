import React from 'react';
import styles from './TrustBadge.module.css';

interface TrustBadgeProps {
	icon: string;
	title: string;
	variant?: 'local' | 'opensource' | 'secure' | 'school';
}

const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, title, variant = 'local' }) => {
	return (
		<div className={`${styles.badge} ${styles[variant]}`}>
			<span className={styles.icon}>{icon}</span>
			<span className={styles.title}>{title}</span>
		</div>
	);
};

export default TrustBadge;
