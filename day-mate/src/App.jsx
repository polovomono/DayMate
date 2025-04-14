import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./Components/Loading/loading";
import Login from "./Components/Login/login";
import Origin from "./Components/main/origin";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Loader redirectTo="/login" duration={3000} />}
        />
        <Route
          path="/loading/login"
          element={<Loader redirectTo="/login" duration={3000} />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/loading/origin"
          element={<Loader redirectTo="/origin" duration={3000} />}
        />
        <Route path="/origin" element={<Origin />} />
      </Routes>
    </Router>
  );
}

export default App;
