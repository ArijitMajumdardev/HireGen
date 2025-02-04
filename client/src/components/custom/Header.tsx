import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to navigate and scroll
  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/"); // Navigate to home first
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to ensure the home page loads
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <Link to={'/'}>
      <h1 className="text-2xl font-bold text-gray-900">ResumeGen</h1>
      </Link>
      
      <div className="hidden md:flex gap-6 text-gray-700">
        <button onClick={() => handleNavigation("features")} className="hover:text-gray-900">
          Features
        </button>
        <button onClick={() => handleNavigation("how-it-works")} className="hover:text-gray-900">
          How It Works
        </button>
        <button onClick={() => handleNavigation("contact")} className="hover:text-gray-900">
          Contact
        </button>
      </div>

      <Link to="/dashboard">
        <Button className="bg-gray-900 text-white hidden md:block">Get Started</Button>
      </Link>

      {/* Mobile Menu */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-6 bg-white shadow-md rounded-lg p-4 flex flex-col gap-4 md:hidden">
          <button onClick={() => handleNavigation("features")} className="hover:text-gray-900">
            Features
          </button>
          <button onClick={() => handleNavigation("how-it-works")} className="hover:text-gray-900">
            How It Works
          </button>
          <button onClick={() => handleNavigation("contact")} className="hover:text-gray-900">
            Contact
          </button>
          <Button className="bg-gray-900 text-white w-full">Get Started</Button>
        </div>
      )}
    </header>
  );
}
