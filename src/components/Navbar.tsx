import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Professor", path: "/professor" },
  { name: "Research", path: "/research" },
  { name: "Member", path: "/member" },
  { name: "Publication", path: "/publication" },
  { name: "News", path: "/news" },
  { name: "Collaborator", path: "/collaborator" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b",
        scrolled ? "bg-white/90 backdrop-blur-md py-2 border-slate-200 shadow-sm" : "bg-white py-4 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex flex-col">
          <span className="text-xl font-bold tracking-tighter text-primary">Biometamaterials</span>
          <span className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em]">RESEARCH LABORATORY</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "nav-link text-sm uppercase tracking-wide",
                location.pathname === item.path && "text-primary font-bold"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/admin" className="text-xs text-slate-400 hover:text-primary transition-colors">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 py-4 shadow-xl">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "block px-6 py-3 text-sm font-medium border-l-4 transition-all",
                location.pathname === item.path ? "text-primary border-primary bg-primary/5" : "text-slate-600 border-transparent"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
