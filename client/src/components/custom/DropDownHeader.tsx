import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const DropDownHeader = ({
  className,
  handleNavigation,
  isLogged,
  handleLogout,
  HandleLoginDialog,
}: {
  className?: string;
  handleNavigation: (sectionId: string) => void;
  isLogged: boolean;
  handleLogout: () => void;
  HandleLoginDialog: () => void;
}) => {
  const location = useLocation();

  const navItemStyle =
    "hover:bg-[#2A273C] text-white px-3 py-2 rounded-md transition w-full text-center";

  const actionItemStyle =
    "bg-[#35324D] text-white font-medium hover:bg-[#44406B] transition px-3 py-2 rounded-md w-full text-center";

  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Menu className="w-6 h-6 text-white" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="bg-accent-2/80 backdrop-blur-md border border-[#2E2B3F] shadow-lg p-2 rounded-lg space-y-1 mt-2 min-w-[160px]"
          align="end"
        >
          <DropdownMenuItem onClick={() => handleNavigation("features")}>
            <span className={navItemStyle}>Features</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigation("how-it-works")}>
            <span className={navItemStyle}>How It Works</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => handleNavigation("contact")}>
            <span className={navItemStyle}>Contact</span>
          </DropdownMenuItem>

          {isLogged ? (
            <>
              <DropdownMenuItem onClick={handleLogout}>
                <span className={actionItemStyle}>Logout</span>
              </DropdownMenuItem>

              {location.pathname !== "/dashboard" && (
                <Link to="/dashboard">
                  <DropdownMenuItem>
                    <span className={actionItemStyle}>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </>
          ) : (
            <DropdownMenuItem onClick={HandleLoginDialog}>
              <span className={actionItemStyle}>Get Started</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownHeader;
