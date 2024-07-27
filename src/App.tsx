import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./componenets/Login";
import "./App.css";
// import { HomePage } from "./componenets/HomePage";
// import RequiredAuth from "./hooks/authCheck";

const App = () => {
  // debugger;
  return (
    <>
      <BrowserRouter>
        {/* header */}
        <Login />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route element={<RequiredAuth />}>
            <Route path="/home" element={<HomePage />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
