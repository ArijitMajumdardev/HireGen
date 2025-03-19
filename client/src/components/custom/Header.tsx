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
    <header className="w-full px-6 py-4 bg-white shadow-md flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-gray-900">ResumeGen</h1>
      </Link>

      <div className="hidden md:flex gap-6 text-gray-700  md:w-full justify-center md:gap-4 ">
        <button
          onClick={() => handleNavigation("features")}
          className="hover:text-gray-900"
        >
          Features
        </button>
        <button
          onClick={() => handleNavigation("how-it-works")}
          className="hover:text-gray-900"
        >
          How It Works
        </button>
        <button
          onClick={() => handleNavigation("contact")}
          className="hover:text-gray-900"
        >
          Contact
        </button>
      </div>

      {isLogged ? (
        <div
          className={` md:flex gap-2 hidden }  ${
            location.pathname !== "/dashboard" ? "w-72 " : ""
          } `}
        >
          {location.pathname !== "/dashboard" ? (
            <Link to={"/dashboard"}>
              <Button className="bg-gray-900 text-white w-full">
                dashboard
              </Button>
            </Link>
          ) : (
            <></>
          )}
          <Button
            className="bg-gray-900 text-white w-28"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button
            className="bg-gray-900 text-white w-36 hidden md:block "
            onClick={HandleLoginDialog}
          >
            Get Started
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
    </header>
  );
}
