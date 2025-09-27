import React from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Boxes,
  ShoppingCart,
  Briefcase,
  UserCog,
  PackagePlus,
  ShieldCheck,
  PackageSearch,
} from "lucide-react";
import useUserRole from "../../hooks/useUserRole";
import logo from "../../assets/logo/logo.jpeg";

const Sidebar = ({ isOpen }) => {
  const { role, isLoading } = useUserRole();

  const linkClasses = "flex items-center gap-3 p-2 rounded hover:bg-base-300";

  return (
    <aside
      className={`bg-[#ddd] h-full p-4 transition-all duration-300 ${
        isOpen ? "w-40 lg:w-64" : "w-16"
      } overflow-hidden`}
    >
      <div className="space-y-2">
        <div className="p-1 mt-[-15px] ml-[-15px]">
          <NavLink to="/" className="flex justify-start p-2 ml-[-8]">
           
              <span className="flex items-start gap-2">
                <img src={logo} alt="Logo" className="ml-2 h-12 w-12 rounded-full" />
                <span className="pt-4 pl-2">Go Bangla</span>
              </span>
           
          </NavLink>
        </div>

        <NavLink to="/dashboard" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          {isOpen && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/dashboard/add-story" className={linkClasses}>
          <FileText className="w-5 h-5" />
          {isOpen && <span>Add Story</span>}
        </NavLink>

        <NavLink to="/dashboard/manage-stories" className={linkClasses}>
          <Boxes className="w-5 h-5" />
          {isOpen && <span>Manage Story</span>}
        </NavLink>

        {!isLoading && role === "admin" && (
          <>
            <NavLink to="/dashboard/make-admin" className={linkClasses}>
              <UserCog className="w-5 h-5" />
              {isOpen && <span>Manage Users</span>}
            </NavLink>

            <NavLink to="/dashboard/add-tour" className={linkClasses}>
              <PackagePlus className="w-5 h-5" />
              {isOpen && <span>Add Tour Plan</span>}
            </NavLink>
               <NavLink to="/dashboard/manage-tour" className={linkClasses}>
              
              <PackageSearch className="w-5 h-5" />
              {isOpen && <span>Manage Tour Plan</span>}
            </NavLink>

            <NavLink to="/dashboard/pending_guides" className={linkClasses}>
              <ShieldCheck className="w-5 h-5" />
              {isOpen && <span>Manage Candidates</span>}
            </NavLink>
          </>
        )}

        {!isLoading && role === "user" && (
          <>
            <NavLink to="/dashboard/join_as_guide" className={linkClasses}>
              <Briefcase className="w-5 h-5" />
              {isOpen && <span>Join As Guide</span>}
            </NavLink>

            <NavLink to="/dashboard/my-bookings" className={linkClasses}>
              <ShoppingCart className="w-5 h-5" />
              {isOpen && <span>My Bookings</span>}
            </NavLink>
          </>
        )}

        {!isLoading && role === "guide" && (
          <>
            <NavLink to="/dashboard/assigned-tours" className={linkClasses}>
              <ShoppingBag className="w-5 h-5" />
              {isOpen && <span>My Assigned Tours</span>}
            </NavLink>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
