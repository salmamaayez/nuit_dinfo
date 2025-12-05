import Header from "./components/shared/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import SentenceTree from "./pages/SentenceTree";
import ImageDetection from "./pages/ImageDetection";


import styles from "./App.module.css";

function App() {
  let routes;

  routes = (
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/sentence-tree" element={<SentenceTree />} />
      <Route path="/image-detection" element={<ImageDetection />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
  // }

  return (
    <div>
      <Header />
      <main className={styles.routes}>{routes}</main>
    </div>
  );
}

export default App;
