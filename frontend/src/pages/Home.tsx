/*import mainBot from "/page-photos/homepage-bot.png";
import ui1 from "/page-photos/UI-1.png";

import { NavLink } from "react-router-dom";

import Section from "../components/home/Sections";

import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.parent}>
			<Section
				src={mainBot}
				alt='main-bot'
				animateImg={true}
				imgStyle={styles.ui1}
				reverse={false}>
				<h2>| NEXT GEN PLATFORM</h2>
				<h1>
					YOUR OWN PERSONAL <span className={styles.highlight}>CHAT BOT</span>
				</h1>
				<p>
					Experience the ultimate in user-friendly design with our secure and
					confidential chat interface, ensuring seamless and natural
					conversations while receiving assistance on a diverse range of topics
				</p>
				<NavLink to='/login' className={styles.btn}>
					Get Started For Free
				</NavLink>
			</Section>
		</div>
	);
};

export default Home;*/
import mainBot from "/page-photos/homepage-bot.png";
import ui1 from "/page-photos/UI-1.png";

import { NavLink } from "react-router-dom";

import Section from "../components/home/Sections";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.parent}>
      <Section
        src={mainBot}
        alt="main-bot"
        animateImg={true}
        imgStyle={styles.ui1}
        reverse={false}
      >
        <h2>🤖 AI4GOOD - MINIMIND</h2>
        <h1>
          🎯 TON LABORATOIRE{" "}
          <span className={styles.highlight}>D'IA PÉDAGOGIQUE</span>
        </h1>
        <p>
          🔍 Découvre comment fonctionne l'intelligence artificielle en
          complétant des phrases
          <br />
          📊 Explore les suggestions avec scores de confiance
          <br />
          🧠 Comprends les mécanismes de décision de l'IA
        </p>
        <NavLink to="/chat" className={styles.btn}>
          🚀 Commence l'Expérience
        </NavLink>
      </Section>
    </div>
  );
};

export default Home;
