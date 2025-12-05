import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { getNextWords, Prediction } from "../../helpers/api2";
import styles from "./SentenceTree.module.css";

type TreeNode = {
  word: string;
  prob?: number;
  children: TreeNode[];
  chosen: boolean;
};

const SentenceTree = () => {
  const [phrase, setPhrase] = useState("");
  const [treeData, setTreeData] = useState<TreeNode>({ word: "START", children: [], chosen: true });
  const [currentNode, setCurrentNode] = useState<TreeNode | null>(null);
  const [chosenPath, setChosenPath] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [startWord, setStartWord] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0); // Force tree updates

  const svgRef = useRef<SVGSVGElement>(null);

  const updatePhrase = (newPhrase: string) => {
    setPhrase(newPhrase.replace(/\s+$/, '') || " ");
  };

  const drawTree = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = Math.max(400, chosenPath.length * 120);
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const root = d3.hierarchy(treeData);
    const treeLayout = d3.tree<TreeNode>().size([width - 120, height - 80]);
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(60, 40)");

    // Links (lines between nodes)
    g.selectAll("path")
      .data(root.links())
      .join("path")
      .attr("class", "link")
      .attr("d", d3.linkVertical<any, any>()
        .x(d => d.x)
        .y(d => d.y))
      .attr("stroke", d => (d.source.data.chosen && d.target.data.chosen) ? "#667eea" : "#ddd")
      .attr("stroke-width", d => (d.source.data.chosen && d.target.data.chosen) ? 4 : 2)
      .attr("opacity", d => (d.source.data.chosen && d.target.data.chosen) ? 1 : 0.5)
      .attr("fill", "none")
      .attr("stroke-linecap", "round");

    // Nodes
    const node = g.selectAll("g.node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    // Circles for nodes
    node.append("circle")
      .attr("r", d => d.data.chosen ? 9 : 6)
      .attr("fill", d => d.data.chosen ? "#667eea" : "#e0e0e0")
      .attr("stroke", d => d.data.chosen ? "#4c51bf" : "#bbb")
      .attr("stroke-width", d => d.data.chosen ? 3 : 2);

    // Word text
    node.append("text")
      .attr("dy", -16)
      .attr("text-anchor", "middle")
      .text(d => d.data.word)
      .attr("fill", d => d.data.chosen ? "#667eea" : "#666")
      .attr("font-weight", d => d.data.chosen ? "bold" : "normal")
      .attr("font-size", d => d.data.chosen ? 14 : 12);

    // Probabilities
    node.filter(d => d.data.prob !== undefined)
      .append("text")
      .attr("dy", 24)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .text(d => `${((d.data.prob || 0) * 100).toFixed(0)}%`)
      .attr("fill", d => d.data.chosen ? "#667eea" : "#999")
      .attr("font-weight", d => d.data.chosen ? "bold" : "normal");
  };

  const loadNextWords = async (currentPhrase: string, node: TreeNode) => {
    setPredictions([]);
    setLoading(true);

    try {
      const response = await getNextWords(currentPhrase, 3);
      setLoading(false);

      console.log("📊 Réponse API:", response);

      if (response.length === 0) {
        finishGame();
        return;
      }

      // Add options to tree
      node.children = response.map(opt => ({
        word: opt.word,
        prob: opt.prob,
        children: [],
        chosen: false
      }));

      // Force tree update by incrementing counter
      setUpdateCounter(prev => prev + 1);
      setPredictions(response);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleWordChoice = (opt: Prediction, index: number) => {
    if (!currentNode) return;

    const newPhrase = phrase.trim() + " " + opt.word;
    setPhrase(newPhrase);
    updatePhrase(newPhrase);

    // Mark choice in tree
    currentNode.children[index].chosen = true;
    const chosenNode = currentNode.children[index];
    setCurrentNode(chosenNode);
    setChosenPath([...chosenPath, opt.word]);

    // Redraw tree immediately to show the choice
    setUpdateCounter(prev => prev + 1);

    console.log("✅ Mot choisi:", opt.word, "| Nouvelle phrase:", newPhrase);

    // Check if sentence ends
    if ([".", "!", "?"].includes(opt.word.trim())) {
      finishGame();
    } else {
      loadNextWords(newPhrase, chosenNode);
    }
  };

  const handleStart = () => {
    const debut = startWord.trim();
    if (!debut) {
      alert("⚠️ Tape un premier mot !");
      return;
    }

    setPhrase(debut);
    const initialTree: TreeNode = { word: debut, children: [], chosen: true };
    setTreeData(initialTree);
    setCurrentNode(initialTree);
    setChosenPath([debut]);

    updatePhrase(debut);

    setGameStarted(true);
    setGameFinished(false);
    setPredictions([]);
    setLoading(false);

    // Draw initial tree
    setTimeout(() => {
      setUpdateCounter(prev => prev + 1);
      console.log("🚀 Début du jeu avec:", debut);
      loadNextWords(debut, initialTree);
    }, 100);
  };

  const finishGame = () => {
    setGameFinished(true);
    setPredictions([]);
    setLoading(false);
  };

  const handleRestart = () => {
    setPhrase("");
    setTreeData({ word: "START", children: [], chosen: true });
    setCurrentNode(null);
    setChosenPath([]);
    setPredictions([]);
    setLoading(false);
    setGameStarted(false);
    setGameFinished(false);
    setStartWord("");
    setUpdateCounter(0);
  };

  // Redraw tree when updateCounter changes
  useEffect(() => {
    if (gameStarted) {
      drawTree();
    }
  }, [updateCounter, gameStarted]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌳 Arbre à Phrases Magiques</h1>
      <p className={styles.subtitle}>
        Construis ta phrase mot par mot avec l'IA et visualise l'arbre de décision en temps réel !
      </p>

      <div id="startArea" className={styles.startArea} style={{ display: gameStarted ? 'none' : 'block' }}>
        <label className={styles.startLabel}>Commence par un premier mot :</label>
        <input
          className={styles.startInput}
          placeholder="Ex : Il, La, Un, Je…"
          value={startWord}
          onChange={(e) => setStartWord(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleStart()}
        />
        <button className={styles.startBtn} onClick={handleStart}>
          🚀 Commencer l'aventure
        </button>
      </div>

      <div className={styles.gameSection} id="gameArea" style={{ display: gameStarted ? 'grid' : 'none' }}>
        <div className={styles.leftPanel}>
          <label className={styles.phraseLabel}>Ta phrase actuelle :</label>
          <div className={styles.phraseBox}>{phrase || " "}</div>

          {loading && (
            <div className={styles.loading}>🤖 IA réfléchit...</div>
          )}

          <div className={styles.choices}>
            {predictions.map((opt, index) => (
              <div
                key={index}
                className={styles.choice}
                onClick={() => handleWordChoice(opt, index)}
              >
                <div className={styles.choiceWord}>{opt.word}</div>
                <div className={styles.choiceProb}>{(opt.prob * 100).toFixed(1)}%</div>
              </div>
            ))}
          </div>

          <button 
            className={styles.stopBtn} 
            onClick={finishGame}
            style={{ display: gameFinished ? 'none' : 'block' }}
          >
            ⛔ Terminer la phrase
          </button>

          {gameFinished && (
            <div className={styles.result}>
              <h2 className={styles.resultTitle}>✨ Phrase terminée !</h2>
              <div className={styles.finalPhrase}>{phrase.trim()}</div>
              <p className={styles.wordCount}>
                📝 Nombre de mots : <strong>{chosenPath.length}</strong>
              </p>
              <button className={styles.startBtn} onClick={handleRestart}>
                🔄 Rejouer
              </button>
            </div>
          )}
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.treeContainer}>
            <h2 className={styles.treeTitle}>📊 Arbre de Décision</h2>
            <p className={styles.treeLegend}>
              <span className={styles.legendChosen}>● Ton chemin</span> |
              <span className={styles.legendOptions}>● Options possibles</span>
            </p>
            <svg ref={svgRef} className={styles.treeSvg}></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceTree;
