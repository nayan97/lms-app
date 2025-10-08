import React, { useEffect, useState } from "react";
import Footer_Nav from "../Shared/Footer_Nav";
import HeaderProfile from "../Shared/HeaderProfile";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { t } from "i18next";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  console.log(profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosSecure.get("/profile");
        // assuming API returns something like: { user: {...}, image: "..." }
        setProfile(response.data.user || response.data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDeleteAccount = async () => {
    const { value: password } = await Swal.fire({
      title: "Confirm Deletion",
      input: "password",
      inputLabel: "Enter your current password to confirm",
      inputPlaceholder: "Enter your password",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Delete Account",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage("Password is required");
        }
        return password;
      },
    });

    if (!password) return;

    setDeleting(true);
    try {
      const response = await axiosSecure.post(
        "/profile/delete",
        { password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Account Deleted",
        text:
          response.data?.message ||
          "Your account has been deleted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      // Clear localStorage and redirect
      setTimeout(() => {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          err.response?.data?.message ||
          "Incorrect password or something went wrong while deleting your account.",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile</p>;
  if (!profile) return <p>No profile data available</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased flex flex-col">
      {/* Top Header */}
      <HeaderProfile />

      {/* Profile Section */}
      <main className="flex-1 pb-20 z-20">
        {/* Profile Image and Name */}
        <div className="w-full bg-[#ff9100] text-center py-6">
          <div className="avatar mx-auto">
            <div className="w-28 h-28 rounded-full ring-2 ring-white ring-offset-1 ring-offset-yellow-500 overflow-hidden shadow-xl">
              <img
                src={profile}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/aaaaaa/ffffff?text=User";
                }}
              />
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-white mt-3">
            {profile?.name}
          </h2>
        </div>
        <div className="rounded-t-[50px]">
          {/* Profile Details Card */}
          <div className="max-w-lg mx-auto bg-gray-100 shadow-md rounded-2xl p-6 mt-6">
            <div className="space-y-3">
              <div className="flex justify-between bg-white p-2 rounded-2xl">
                <span className="font-medium text-gray-600">{t("Email")}:</span>
                <span className="text-gray-800">{profile?.email || "N/A"}</span>
              </div>

              <div className="flex justify-between bg-white p-2 rounded-2xl">
                <span className="font-medium text-gray-600">
                  {t("Mobile")}:
                </span>
                <span className="text-gray-800">{profile?.phone || "N/A"}</span>
              </div>

              <div className="flex justify-between bg-white p-2 rounded-2xl">
                <span className="font-medium text-gray-600">
                  {t("Gender")}:
                </span>
                <span className="text-gray-800">
                  {profile?.gender || "N/A"}
                </span>
              </div>

              <div className="flex justify-between bg-white p-2 rounded-2xl">
                <span className="font-medium text-gray-600">
                  {t("Country")}:
                </span>
                <span className="text-gray-800">
                  {profile?.country || "N/A"}
                </span>
              </div>

              <div className="flex justify-between bg-white p-2 rounded-2xl">
                <span className="font-medium text-gray-600">
                  {t("Address")}:
                </span>
                <span className="text-gray-800 text-right">
                  {profile?.address || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Delete Account Button */}
          <div className="w-full max-w-lg mb-10 mx-auto text-center mt-8">
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className={`${
                deleting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              } font-bold text-lg transition-colors duration-200`}
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer_Nav />
    </div>
  );
};

export default ProfilePage;
