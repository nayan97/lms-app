import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";



const Header = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout()
      .then(() => {
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Navlinks = (
  <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-bold my-2" : "my-2"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/community"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-bold my-2" : "my-2"
          }
        >
          Community
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-bold my-2" : "my-2"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-trips"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-bold my-2" : "my-2"
          }
        >
          Trips
        </NavLink>
      </li>
    </>
  );

  return (
  
      <div className="navbar bg-base-100 shadow-sm fixed top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {Navlinks}
            </ul>
          </div>
          <Link to="/">Home</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Navlinks}</ul>
        </div>
        <div className="navbar-end space-x-2">
          {user ? (
            <>
              {" "}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">{user.displayName}</a>
                  </li>
                  <li>
                    <a className="justify-between">{user.email}</a>
                  </li>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li>
                    {" "}
                    <a href="/login" className="" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-success text-white" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
   
  );
};

export default Header;
