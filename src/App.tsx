/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Professor from "./pages/Professor";
import Research from "./pages/Research";
import Member from "./pages/Member";
import Publication from "./pages/Publication";
import News from "./pages/News";
import Collaborator from "./pages/Collaborator";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/professor" element={<Professor />} />
              <Route path="/research" element={<Research />} />
              <Route path="/member" element={<Member />} />
              <Route path="/publication" element={<Publication />} />
              <Route path="/news" element={<News />} />
              <Route path="/collaborator" element={<Collaborator />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

