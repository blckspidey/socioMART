import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import Explore from "./pages/Explore";
import GetStarted from "./pages/GetStarted";

import Login from "./pages/Login";

<Route path="/explore" element={<Explore />} />


function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-[64px]">
        {/* routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
