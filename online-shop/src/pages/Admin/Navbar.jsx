import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import EditProfileModal from "../../components/EditProfileModal";
import { Link } from "react-router";

const Navbar = ({ toggleSidebar }) => {
  const { user, logoutUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log(user);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("logout successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-black border-b justify-between px-4 text-white">
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
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt="User Avatar" />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <span className="justify-between hover:bg-blue-950">
                    {user.displayName}
                  </span>
                </li>
                <li>
                  <span className="justify-between hover:bg-blue-950">
                    {user.email}
                  </span>
                </li>
                <li>
                  <button className="justify-between hover:bg-blue-950" >
                   <Link to="/">Home</Link> 
                  </button>
                </li>
                <li>
                  <a
                    className="justify-between hover:bg-blue-950"
                    href="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>

            {isModalOpen && (
              <EditProfileModal
                user={user}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;