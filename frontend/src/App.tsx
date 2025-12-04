import Header from "./components/shared/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";


import styles from "./App.module.css";

function App() {
  let routes;

  routes = (
    <Routes>
      <Route path="/chat" element={<Chat />} />
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
