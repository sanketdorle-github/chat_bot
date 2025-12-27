import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ChatBot from "./components/ChatBot";
// import About from "./pages/About";

const App = () => {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
      <ChatBot
        
        position="bottom-right"
        theme={{
          primary: "#3b82f6",
          secondary: "#1e40af",
          background: "#ffffff",
          text: "#1f2937",
        }}
      />
    </>
  );
};

export default App;
