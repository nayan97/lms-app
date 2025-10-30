import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  FileText,
  ShoppingBag,
  Boxes,
  ShoppingCart,
  Briefcase,
  PackagePlus,
  ShieldCheck,
  PackageSearch,
  UserCog,
} from "lucide-react";

import logo from "../../../public/logo.png";
import { t } from "i18next";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const menuRef = useRef(null);

  // 🔹 Handle outside click + resize
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsOpen]);

  // 🔹 Close on link click (for mobile)
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const linkClasses =
    "flex items-center gap-3 p-2 rounded hover:bg-base-300 transition duration-200";

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-base-100 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        w-64 lg:w-64 lg:translate-x-0 shadow-lg`}
      >
        <div className="p-4 space-y-2">
          {/* Logo */}
          <div className="flex items-center gap-2 p-2 mb-4 border-b pb-3">
            <img src={logo} className="w-15 h-15" />
            <span className="text-lg font-semibold">{t("LifeChange")}</span>
          </div>
          <>
            <NavLink
              to="/dashboard"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>{t("Dashboard")}</span>
            </NavLink>
            <NavLink
              to="/dashboard/add-category"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <FileText className="w-5 h-5" />
              <span> {t("Category")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/add-size"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <Boxes className="w-5 h-5" />
              <span> {t("AddSize")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/add-color"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <Boxes className="w-5 h-5" />
              <span>{t("AddColor")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/add-product"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <PackagePlus className="w-5 h-5" />
              <span>{t("AddProduct")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/all-order"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <PackageSearch className="w-5 h-5" />
              <span>{t("Orders")}</span>
            </NavLink>

            <NavLink
              to="/dashboard/manage-users"
              onClick={handleLinkClick}
              className={linkClasses}
            >
              <UserCog className="w-5 h-5" />
              <span>{t("ManageUsers")}</span>
            </NavLink>
          </>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
