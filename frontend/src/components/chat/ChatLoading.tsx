import Spinner from "../shared/Spinner";
import styles from "./ChatItem.module.css";
import { BotIcon } from "./Icons";

const ChatLoading = () => {
	return (
		<div className={`${styles.parent} ${styles.bot_parent}`}>
			<div className={`${styles.avatar} ${styles.bot_avatar}`}>
				<BotIcon />
			</div>
			<div className={styles.spinner}>
				<Spinner/>
			</div>
		</div>
	);
};

export default ChatLoading;

