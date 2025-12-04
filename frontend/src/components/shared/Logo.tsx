import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
	return (
		<div className={styles.parent}>
			<Link to={"/"} className={styles.logoLink}>
				<div className={styles.logoIcon}>
					<span className={styles.village}>🏘️</span>
					<span className={styles.brain}>🧠</span>
				</div>
				<div className={styles.logoText}>
					<span className={styles.miniText}>Mini</span>
					<span className={styles.mindText}>Mind</span>
				</div>
			</Link>
			{/*<p className={styles.tagline}>Village Numérique 🌱</p>*/}
		</div>
	);
};

export default Logo;
