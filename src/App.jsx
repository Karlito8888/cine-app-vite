import Home from "./pages/Home";
import LikePage from "./pages/LikePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/coups-de-coeur" element={<LikePage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
