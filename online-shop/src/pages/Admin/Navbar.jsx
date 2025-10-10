import { Menu } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/Spinner"
 
const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosSecure.get("/profile");
        setProfile(response.data.user || response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axiosSecure]);

  // 👇 Show spinner while loading
  if (loading) {
    return <Spinner></Spinner>;
  }

  // 👇 Handle error
  if (error) {
    return <p className="text-red-500 text-center">Failed to load profile.</p>;
  }

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
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={profile?.avatar_url}
                    alt="User Profile"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
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
