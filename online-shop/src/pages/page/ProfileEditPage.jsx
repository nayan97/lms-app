import React, { useEffect, useState } from "react";
import Footer_Nav from "../Shared/Footer_Nav";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { t } from "i18next";
import { CiCamera } from "react-icons/ci";
import Spinner from "../../components/Spinner"

const ProfileEditPage = () => {
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(""); // image preview

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosSecure.get("/profile");
        const user = res.data?.user || res.data;
        setProfile(user);

        // Populate form fields safely
        setName(user?.name || "");
        setPhone(user?.phone || "");
        setEmail(user?.email || "");
        setCountry(user?.country || "");
        setGender(user?.gender || "");
        setAddress(user?.address || "");
        setPreview(user?.avatar || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [axiosSecure]);

  // Handle image select + instant preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // Handle form submit
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const fd = new FormData();

      // Laravel PATCH/PUT fix
      fd.append("_method", "PUT"); // 👈 Important!

      // Append all fields
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("phone", phone.trim());
      fd.append("country", country.trim());
      fd.append("gender", gender.trim());
      fd.append("address", address.trim());

      // Append image if selected
      if (image) fd.append("avatar", image);

      const res = await axiosSecure.post("/profile", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedUser = res.data?.data || res.data;
      setProfile(updatedUser);
      if (updatedUser?.avatar) setPreview(updatedUser.avatar);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: res.data?.message || "Your profile has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Update failed:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          err.response?.data?.message ||
          "Please check all required fields and try again.",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <Spinner></Spinner>;
  if (error) return <p className="text-red-500">Failed to load profile.</p>;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <div className="bg-[#ff9100] h-20 flex items-center gap-4 px-4">
        <Link
          to="/profilepage"
          className="text-white bg-[#ff9100] p-3 rounded-full shadow-sm text-xl"
        >
          ←
        </Link>
        <h1 className="text-white font-bold">{t("Profile")}</h1>
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 z-20">
        {/* Profile Avatar */}
        <div className="w-full bg-[#ff9100] text-center p-6">
          <div className="avatar relative mx-auto">
            <div className="w-28 h-28 rounded-full ring-4 ring-white ring-offset-2 ring-offset-yellow-500 overflow-hidden shadow-xl">
              <img
                src={preview || "https://placehold.co/100x100/aaaaaa/ffffff?text=User"}
                alt="Profile"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/100x100/aaaaaa/ffffff?text=User";
                }}
              />
            </div>

            {/* Camera upload icon */}
            <div className="absolute right-0 bottom-0 bg-white rounded-full p-1 cursor-pointer shadow">
              <label>
                <CiCamera size={24} className="text-gray-800" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <h2 className="text-xl font-extrabold text-gray-800 mt-3">
            {profile?.name || "User"}
          </h2>
        </div>

        {/* Form */}
        <div className="w-full max-w-lg mx-auto mt-6 bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            {t("PersonalInformation")}
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block font-medium mb-1">{t("FullName")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-medium mb-1">{t("MobileNumber")}</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-1">{t("Email")}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="block font-medium mb-1">{t("Country")}</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium mb-1">{t("Gender")}</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="block font-medium mb-1">{t("Address")}</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </main>

      <Footer_Nav />
    </div>
  );
};

export default ProfileEditPage;
