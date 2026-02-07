import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-[64px]">
        {/* routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
