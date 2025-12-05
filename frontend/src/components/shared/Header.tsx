import Logo from "./Logo";
import styles from "./Header.module.css";
import NavigationLink from "./NavigationLink";

const Header = () => {
  return (
    <div className={styles.parent}>
      <div>
        <Logo />
      </div>
      <div>
        <NavigationLink to="/chat" text="ChatBot" />
        <NavigationLink to="/sentence-tree" text="🌳 Jeu d'Arbre" />
        <NavigationLink to="/image-detection" text="👁️ Yeux IA" />
        <NavigationLink to="/" text="Acceuil " />
      </div>
    </div>
  );
};

export default Header;
