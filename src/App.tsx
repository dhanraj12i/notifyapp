import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import "./App.css";
import { HomePage } from "./componenets/HomePage";
import RequiredAuth from "./hooks/authCheck";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route element={<RequiredAuth />}>
          <Route path="/Login" element={<Login />} />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
