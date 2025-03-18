import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import API from "@/lib/ServerAPI";
import { cn } from "@/lib/utils";
import { IResumeList } from "@/pages/Dashboard";
import { Menu } from "lucide-react";
import { SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
  return (
    <div className={cn(className)}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => handleNavigation("features")}
            className="hover:text-gray-900 "
          >
            <span className="text-center w-full">Features</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigation("how-it-works")}
            className="hover:text-gray-900"
          >
            <span className="text-center w-full">How It Works</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigation("contact")}
            className="hover:text-gray-900"
          >
             <span className="text-center w-full">Contact</span>
          </DropdownMenuItem>

          {isLogged ? (
            <>
              <DropdownMenuItem
                className="bg-gray-900 text-white w-full mb-2"
                onClick={handleLogout}
              >
                 <span className="text-center w-full">Logout</span>
              </DropdownMenuItem>
              {location.pathname !== "/dashboard" ? (
                <Link to={"/dashboard"}>
                  <DropdownMenuItem className="bg-gray-900 text-white w-full">
                  <span className="text-center w-full">Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              ) : (
                <></>
              )}
            </>
          ) : (
            <DropdownMenuItem
              className="bg-gray-900 text-white w-full"
              onClick={HandleLoginDialog}
            >
               <span className="text-center w-full">Get started</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownHeader;
