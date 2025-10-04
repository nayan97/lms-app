import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();

  // console.log(user);

  const handleLogout = async (e) => {
    e.preventDefault(); // stop reload
    try {
      const msg = await logout();
      console.log(msg);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar bg-[#ff9100] border-b justify-between px-4 text-white">
      <button onClick={toggleSidebar} className="btn btn-ghost">
        <Menu />
      </button>

      <div className="navbar-end space-x-2">
        {user && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full"></div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="justify-between hover:bg-blue-950"></span>
                </li>
                <li>
                  <span className="justify-between hover:bg-blue-950">
                    {user.email}
                  </span>
                </li>
                <li>
                  <button className="justify-between hover:bg-blue-950">
                    <Link to="/">Home</Link>
                  </button>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* {isModalOpen && (
              <EditProfileModal
                user={user}
                onClose={() => setIsModalOpen(false)}
              />
            )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
