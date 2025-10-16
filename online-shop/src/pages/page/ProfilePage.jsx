import React, { useEffect, useState } from "react";
import Footer_Nav from "../Shared/Footer_Nav";
import HeaderProfile from "../Shared/HeaderProfile";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { t } from "i18next";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  console.log(profile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const { t } = useTranslation();

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
   // Make sure to import useTranslation from 'react-i18next'
  const { value: password } = await Swal.fire({
    title: t("confirm_deletion"),
    input: "password",
    inputLabel: t("enter_your_current_password_to_confirm"),
    inputPlaceholder: t("enter_your_password"),
    inputAttributes: {
      autocapitalize: "off",
      autocorrect: "off",
    },
    showCancelButton: true,
    confirmButtonText: t("delete_account"),
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    preConfirm: (password) => {
      if (!password) {
        Swal.showValidationMessage(t("password_is_required"));
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
      title: t("account_deleted"),
      text: response.data?.message || t("your_account_has_been_deleted_successfully"),
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
      title: t("delete_failed"),
      text:
        err.response?.data?.message ||
        t("incorrect_password_or_something_went_wrong_while_deleting_your_account"),
    });
  } finally {
    setDeleting(false);
  }
};


  if (loading) return <Spinner></Spinner>;
  if (error) return <p>Error loading profile</p>;
  if (!profile) return <p>No profile data available</p>;

  return (
    <div className="min-h-screen bg-[#ff9100] font-sans antialiased flex flex-col">
      {/* Top Header */}
      <HeaderProfile />
      {/* Profile Section */}
      <main className="flex-1 z-20">
        {/* Profile Image and Name */}
        <div className="w-full bg-[#ff9100] text-center py-6">
          <div className="avatar mx-auto">
            <div className="w-28 h-28 rounded-full ring-2 ring-white ring-offset-1 ring-offset-yellow-500 overflow-hidden shadow-xl">
              <img
                src={profile?.avatar_url}
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
        <div className="rounded-t-[50px] ">
          {/* Profile Details Card */}
          <div className="max-w-lg lg:max-w-7xl mx-auto min-h-[615px] bg-gray-100 shadow-md rounded-t-[50px] p-6 mt-6">
            <div className="space-y-3 bg-white">
              <div className="flex justify-between bg-white border-b border-b-gray-200 p-6">
                <span className="font-medium text-gray-600">{t("Email")}:</span>
                <span className="text-gray-800">{profile?.email || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b border-b-gray-200 bg-white p-6 ">
                <span className="font-medium text-gray-600">
                  {t("Mobile")}:
                </span>
                <span className="text-gray-800">{profile?.phone || "N/A"}</span>
              </div>

              <div className="flex justify-between border-b border-b-gray-300 p-6 ">
                <span className="font-medium text-gray-600">
                  {t("Gender")}:
                </span>
                <span className="text-gray-800">
                  {profile?.gender || "N/A"}
                </span>
              </div>

              <div className="flex justify-between border-b border-b-gray-200 bg-white p-6 ">
                <span className="font-medium text-gray-600">
                  {t("Country")}:
                </span>
                <span className="text-gray-800">
                  {profile?.country || "N/A"}
                </span>
              </div>

              <div className="flex justify-between border-b border-b-gray-300 p-6 ">
                <span className="font-medium text-gray-600">
                  {t("Address")}:
                </span>
                <span className="text-gray-800 text-right">
                  {profile?.address || "N/A"}
                </span>
              </div>
            </div>
            {/* Delete Account Button */}
          <div className="w-full max-w-lg mb-20 mt-30 mx-auto text-center ">
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className={`${
                deleting
                  ? "bg-gray-300 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              } font-bold text-lg transition-colors duration-200`}
            >
              {deleting ? "Deleting..." : t("Delete_Account")}
            </button>
          </div>
          </div>

          
        </div>
      </main>

      {/* Footer */}
      <Footer_Nav />
    </div>
  );
};

export default ProfilePage;
