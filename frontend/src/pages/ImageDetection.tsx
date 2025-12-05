import { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as tf from "@tensorflow/tfjs";
import styles from "./ImageDetection.module.css";

type Prediction = {
  className: string;
  probability: number;
};

const ImageDetection = () => {
  const [model, setModel] = useState<mobilenet.MobileNet | null>(null);
  const [currentImage, setCurrentImage] = useState<HTMLImageElement | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState("");
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const originalImgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanWindowRef = useRef<HTMLDivElement>(null);
  const scanLabelRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load model on mount
  useEffect(() => {
    loadModel();
  }, []);

  // Update image and canvas when content becomes visible
  useEffect(() => {
    if (showContent && imageSrc && currentImage) {
      console.log("🔄 useEffect triggered - updating refs");
      
      // Wait for next tick to ensure DOM is rendered
      setTimeout(() => {
        if (originalImgRef.current) {
          originalImgRef.current.src = imageSrc;
          console.log("✅ originalImgRef.current.src updated in useEffect");
        } else {
          console.log("⚠️ originalImgRef.current still null in useEffect");
        }
        
        if (canvasRef.current && currentImage) {
          drawGrid(currentImage);
          console.log("✅ drawGrid called from useEffect");
        } else {
          console.log("⚠️ canvasRef.current or currentImage null in useEffect");
        }
      }, 50);
    }
  }, [showContent, imageSrc, currentImage]);

  const loadModel = async () => {
    setLoading("⏳ Chargement du modèle IA...");
    try {
      await tf.ready();
      const loadedModel = await mobilenet.load();
      setModel(loadedModel);
      setLoading("✅ Modèle IA prêt ! Choisissez une image.");
    } catch (error) {
      console.error("Error loading model:", error);
      setLoading("❌ Erreur de chargement. Rechargez la page.");
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🔵 handleFileSelect called");
    const file = event.target.files?.[0];
    if (!file) {
      console.log("❌ No file selected");
      return;
    }

    console.log("✅ File selected:", file.name, file.type, file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("📖 FileReader onload triggered");
      const imgSrc = e.target?.result as string;
      console.log("🖼️ Image src set:", imgSrc.substring(0, 50) + "...");
      
      const img = new Image();
      img.src = imgSrc;
      
      img.onload = () => {
        console.log("✅ Image loaded successfully!", img.width, "x", img.height);
        setCurrentImage(img);
        setImageSrc(imgSrc);
        console.log("✅ setCurrentImage and setImageSrc called");
        
        setShowContent(true);
        console.log("✅ setShowContent(true) called");
        setShowResults(false);
        console.log("✅ setShowResults(false) called");
      };
      
      img.onerror = (error) => {
        console.error("❌ Image failed to load:", error);
      };
    };
    
    reader.onerror = (error) => {
      console.error("❌ FileReader error:", error);
    };
    
    reader.readAsDataURL(file);
    console.log("📖 FileReader.readAsDataURL started");
  };

  const drawGrid = (img: HTMLImageElement) => {
    console.log("🎨 drawGrid called with image:", img.width, "x", img.height);
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log("❌ canvasRef.current is null");
      return;
    }
    console.log("✅ Canvas ref found:", canvas);

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.log("❌ Could not get 2d context");
      return;
    }
    console.log("✅ Canvas context obtained");

    canvas.width = 400;
    canvas.height = 400;
    console.log("✅ Canvas size set to 400x400");

    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    console.log("✅ Image drawn on canvas");

    // Draw grid
    const gridSize = 20;
    const cellWidth = canvas.width / gridSize;
    const cellHeight = canvas.height / gridSize;

    ctx.strokeStyle = "rgba(102, 126, 234, 0.3)";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(canvas.width, i * cellHeight);
      ctx.stroke();
    }
    console.log("✅ Grid drawing completed");
  };

  const startScanning = async () => {
    if (isScanning || !currentImage) return;

    setIsScanning(true);
    setShowResults(false);

    // Afficher un message de chargement
    setLoading("🔍 Analyse en cours...");

    // Attendre un peu pour l'effet visuel
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading("🧠 Le cerveau de l'IA analyse l'image...");

    // Classifier l'image directement
    await classifyImage(currentImage);

    setIsScanning(false);
    setLoading("");
  };

  const classifyImage = async (img: HTMLImageElement) => {
    if (!model) {
      alert("Le modèle n'est pas encore chargé. Attendez quelques secondes.");
      return;
    }

    setLoading("🧠 Le cerveau de l'IA prend sa décision...");

    try {
      const preds = await model.classify(img);
      setPredictions(preds);
      setShowResults(true);
      setLoading("");
    } catch (error) {
      console.error("Classification error:", error);
      setLoading("❌ Erreur d'analyse.");
    }
  };

  const isCat = () => {
    const catKeywords = ["tabby", "cat", "persian", "siamese", "egyptian", "tiger cat"];
    return predictions.some((pred) =>
      catKeywords.some((keyword) => pred.className.toLowerCase().includes(keyword))
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🤖 MiniMind – Les Yeux Artificiels de l'IA</h1>
      <p className={styles.subtitle}>
        « Comment les yeux artificiels de l'IA détectent-ils un chat ? »
      </p>

      <div className={styles.uploadSection}>
        <button
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          📸 Choisir une image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>

      {loading && <div className={styles.loading}>{loading}</div>}

      {showContent && (
        <div className={styles.contentGrid}>
          <div className={styles.panel}>
            <h2>👁️ Vision Humaine</h2>
            <img ref={originalImgRef} className={styles.image} alt="Original" />
            <p>
              C'est ce que <strong>vous</strong> voyez : une image complète avec des
              formes, des couleurs et des textures.
            </p>
          </div>

          <div className={styles.panel}>
            <h2>🤖 Vision IA (Découpée)</h2>
            <div className={styles.scanContainer}>
              <canvas ref={canvasRef}></canvas>
              <div ref={scanWindowRef} className={`${styles.scanWindow} ${styles.hidden}`}></div>
              <div ref={scanLabelRef} className={`${styles.scanLabel} ${styles.hidden}`}>
                🔍 Analyse...
              </div>
            </div>
            <button
              className={styles.analyzeBtn}
              onClick={startScanning}
              disabled={isScanning}
            >
              🔍 Lancer l'analyse IA
            </button>
            <p>
              C'est ce que l'<strong>IA</strong> voit : l'image découpée en petits morceaux
              (pixels) transformés en nombres.
            </p>
          </div>
        </div>
      )}

      {showResults && predictions.length > 0 && (
        <div className={styles.resultSection}>
          <div className={styles.resultBox}>
            <div
              className={styles.resultText}
              style={{ color: isCat() ? "#28a745" : "#dc3545" }}
            >
              {isCat()
                ? "🐱 OUI ! L'IA a détecté un CHAT !"
                : "❌ NON, ce n'est pas un chat."}
            </div>
            <div className={styles.confidence}>
              L'IA pense que c'est :{" "}
              <strong>{predictions[0].className}</strong> (
              {(predictions[0].probability * 100).toFixed(1)}% de confiance)
            </div>

            <div className={styles.predictions}>
              <strong>🔍 Top 3 des prédictions de l'IA :</strong>
              {predictions.slice(0, 3).map((pred, index) => {
                const emoji = index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉";
                return (
                  <div key={index} className={styles.predictionItem}>
                    <span>
                      {emoji} {pred.className}
                    </span>
                    <span>
                      <strong>{(pred.probability * 100).toFixed(1)}%</strong>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.explanation}>
            <h3>💡 Comment ça marche ?</h3>
            <p>
              1. <strong>L'IA scanne l'image avec ses "yeux artificiels"</strong> (la
              fenêtre verte 9x9)
            </p>
            <p>
              2. <strong>Chaque zone scannée est transformée en nombres</strong> (comme 1
              000 000 de chats mémorisés)
            </p>
            <p>
              3. <strong>L'IA compare chaque morceau</strong> avec les 1 000 000 de chats
              qu'elle a vus pendant son entraînement
            </p>
            <p>
              4. <strong>Le réseau de neurones reconnaît les formes</strong> : oreilles
              pointues, moustaches, yeux de chat...
            </p>
            <p>
              5. <strong>Elle donne son verdict final</strong> avec un pourcentage de
              confiance !
            </p>
            <p>
              <em>
                ✨ L'IA a appris en voyant 1 million d'images de chats et sait maintenant
                reconnaître leurs caractéristiques !
              </em>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetection;
