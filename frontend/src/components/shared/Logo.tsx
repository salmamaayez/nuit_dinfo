import { Link } from "react-router-dom";

import styles from "./Logo.module.css";
import logo from "/logos/logo1.png";

const Logo = () => {
	return (
		<div className={styles.parent}>
				<Link to={"/"}>
					<img src={logo} alt='logo' className={styles.logo} />
				</Link>
				<p className={styles.logo_p}>
					<span className={styles.span}>MiniMind</span>
				</p>
		</div>
	);
};

export default Logo;
