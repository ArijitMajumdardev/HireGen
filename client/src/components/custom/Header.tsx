import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignUpDialog from "./SignUpDialog";
import { useAuthContext } from "@/context/AuthProvider";
import DropDownHeader from "./DropDownHeader";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogged, setOpenAuthDialog, openAuthDialog, setIsLogged } =
    useAuthContext();

  const HandleLoginDialog = () => {
    setOpenAuthDialog(true);
  };

  // Function to navigate and scroll
  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/"); // Navigate to home first
      setTimeout(() => {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100); // Delay to ensure the home page loads
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
  };

  return (
    <nav className="sticky top-6 z-50 bg-[#272533]/60 backdrop-blur-md  rounded-full px-8 py-3 flex items-center justify-between max-w-5xl mx-auto mt-6 shadow-md">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#F0A7C3] to-[#777AF1] bg-clip-text text-transparent">HireGen</h1>
      </Link>

      <div className="hidden md:flex gap-10 text-white text-base font-normal  md:w-full justify-center md:gap-10 ">
        <button
          onClick={() => handleNavigation("features")}
          className="hover:text-[#777AF1] transition-colors"
        >
          Features
        </button>
        <Link to={'/interview/dashboard'} >
        <button
          className="hover:text-[#777AF1] transition-colors"
          >
          Interview
        </button>
        </Link>
        <Link to={'/dashboard'}>
        <button
          className="hover:text-[#777AF1] transition-colors"
          >
          Resume
        </button>
          </Link>
      </div>

      {isLogged ? (
        <div
          className="hidden md:block"
        >
          <Button
            className="bg-[#777AF1] text-white hover:bg-[#9092f8] px-5 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div  className="hidden md:block">
          <Button
            className="bg-[#777AF1] text-white text-base font-normal hover:bg-[#9092f8] px-4 py-2 rounded-full"
            onClick={HandleLoginDialog}
          >
            Signup
          </Button>
        </div>
      )}

      {/* Mobile Menu */}

      <DropDownHeader
        className="md:hidden"
        handleNavigation={handleNavigation}
        handleLogout={handleLogout}
        HandleLoginDialog={HandleLoginDialog}
        isLogged={isLogged}
      />

      <SignUpDialog
        openDialog={openAuthDialog}
        setOpenDialog={setOpenAuthDialog}
      />
    </nav>
  );
}
