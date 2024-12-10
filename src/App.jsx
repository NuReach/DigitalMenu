import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Anachak from "./pages/Anachak";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nhamsalmon" element={<Anachak />} />
      </Routes>
    </Router>
  );
}

export default App;
