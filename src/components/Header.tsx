import { useAuth } from "@/context/AuthContext";
import { BellIcon, SearchIcon, Settings, UserCircle } from "lucide-react";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate("/login");
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">
              Fran Ad Dashboard
            </h1>
            <div className="flex items-center space-x-5 ">
              <SearchIcon className="size-5 cursor-pointer" />
              <BellIcon className="size-5 cursor-pointer" />
              <div className="flex items-center gap-2 cursor-pointer">
                <UserCircle className="size-5 " />
                <p className="text-black font-medium">{user?.name}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Settings className="size-5 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="gap-2">
                    Sign Out
                    <GoSignOut className="size-4" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
