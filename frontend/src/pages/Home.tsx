import { NavLink } from "react-router-dom";
import TrustBadge from "../components/shared/TrustBadge";
import FeatureCard from "../components/home/FeatureCard";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.trustBadges}>
            <TrustBadge icon="🏠" title="IA 100% Locale" variant="local" />
            <TrustBadge icon="🌱" title="Open Source" variant="opensource" />
            <TrustBadge icon="🛡️" title="Données Sécurisées" variant="secure" />
            <TrustBadge icon="🎓" title="Pensé pour l'École" variant="school" />
          </div>
          
          <h1 className={styles.mainTitle}>
            Bienvenue au <span className={styles.highlight}>Village Numérique</span>
          </h1>
          
          <h2 className={styles.subtitle}>
            🌳 Ton Laboratoire d'IA Pédagogique
          </h2>
          
          <p className={styles.description}>
            Découvre comment fonctionne l'intelligence artificielle dans un environnement 
            <strong> local, sécurisé et ludique</strong>. Pas de Big Tech, pas de cloud, 
            juste toi et l'IA qui apprend ensemble ! 🚀
          </p>
          
          <div className={styles.ctaButtons}>
            <NavLink to="/chat" className={styles.primaryBtn}>
              🎯 Commence l'Expérience
            </NavLink>
          </div>
          
          <div className={styles.villageIllustration}>
            <div className={styles.house}>🏡</div>
            <div className={styles.tree}>🌲</div>
            <div className={styles.robot}>🤖</div>
            <div className={styles.tree}>🌳</div>
            <div className={styles.house}>🏘️</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>
          🔬 Qu'est-ce que tu vas apprendre ?
        </h2>
        
        <div className={styles.featureGrid}>
          <FeatureCard
            icon="💬"
            title="Chatbot Intelligent"
            description="Discute avec une IA et découvre comment elle comprend tes phrases et génère des réponses intelligentes."
            color="green"
          />
          
          <FeatureCard
            icon="🔮"
            title="Prédiction de Texte"
            description="Complète des phrases et vois comment l'IA prédit les prochains mots avec des scores de confiance."
            color="blue"
          />
          
          <FeatureCard
            icon="🌳"
            title="Jeu d'Arbre à Phrases"
            description="Construis des phrases mot par mot et explore toutes les possibilités ! L'IA te propose des mots et tu crées ton histoire."
            color="purple"
          />
          
          <FeatureCard
            icon="👁️"
            title="Vision Artificielle"
            description="Découvre comment l'IA 'voit' et analyse les images ! Teste la détection d'objets avec MobileNet."
            color="cyan"
          />
          
          <FeatureCard
            icon="🧠"
            title="Comprends l'IA"
            description="Apprends comment l'IA prend ses décisions, quels modèles elle utilise, et quelles données elle manipule."
            color="orange"
          />
          
          <FeatureCard
            icon="🔒"
            title="100% Privé et Local"
            description="Tes données restent sur ton appareil. Pas de Cloud, pas de tracking, juste de l'apprentissage pur !"
            color="burgundy"
          />
        </div>
      </section>

      {/* Educational Section */}
      <section className={styles.educational}>
        <div className={styles.educationalContent}>
          <h2 className={styles.sectionTitle}>
            📚 Pourquoi un "Village Numérique Résistant" ?
          </h2>
          
          <div className={styles.educationalGrid}>
            <div className={styles.educationalCard}>
              <span className={styles.cardIcon}>🏘️</span>
              <h3>Village = Communauté</h3>
              <p>
                Comme dans un village, nous apprenons ensemble, partageons nos connaissances 
                et construisons des outils pour tous.
              </p>
            </div>
            
            <div className={styles.educationalCard}>
              <span className={styles.cardIcon}>🛡️</span>
              <h3>Résistant = Indépendant</h3>
              <p>
                Nous résistons aux géants de la tech en créant des solutions locales, 
                éthiques et respectueuses de ta vie privée.
              </p>
            </div>
            
            <div className={styles.educationalCard}>
              <span className={styles.cardIcon}>🌱</span>
              <h3>Durable = Responsable</h3>
              <p>
                L'IA locale consomme moins d'énergie et ne nécessite pas de serveurs 
                massifs. C'est bon pour toi ET pour la planète !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className={styles.ctaFooter}>
        <h2>Prêt à explorer l'IA ? 🚀</h2>
        <p>Rejoins le village numérique et deviens un expert de l'intelligence artificielle !</p>
        <NavLink to="/chat" className={styles.primaryBtn}>
          Commencer maintenant
        </NavLink>
      </section>
    </div>
  );
};

export default Home;
