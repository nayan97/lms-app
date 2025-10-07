import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ForgetPasswordPage = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = send OTP, 2 = verify, 3 = reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
      title: "Sending OTP...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axiosSecure.post("/auth/forgot-password", { email });
      Swal.fire("✅ Success", res.data.message, "success");
      setStep(2);
    } catch (err) {
      Swal.fire("❌ Error", err.response?.data?.message || "Failed to send OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
      title: "Verifying OTP...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axiosSecure.post("/auth/verify-otp", { email, otp });
      Swal.fire("✅ Verified", res.data.message, "success");
      setStep(3);
    } catch (err) {
      Swal.fire("❌ Error", err.response?.data?.message || "Invalid OTP", "error");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    Swal.fire({
      title: "Resetting Password...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await axiosSecure.post("/auth/reset-password", {
        email,
        otp,
        password,
        password_confirmation: passwordConfirm,
      });

      Swal.fire("✅ Success", res.data.message, "success");

      // Reset form and navigate to login
      setStep(1);
      setEmail("");
      setOtp("");
      setPassword("");
      setPasswordConfirm("");

      // ⏳ Small delay for nice transition
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      Swal.fire("❌ Error", err.response?.data?.message || "Failed to reset password", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <label className="block mb-2 font-medium">OTP</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              disabled={loading}
            />
            <button
              type="submit"
              className={`w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <p
              onClick={() => setStep(1)}
              className="text-blue-600 text-sm mt-3 cursor-pointer text-center"
            >
              Resend OTP
            </p>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />

            <label className="block mb-2 font-medium">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-2 mb-4"
              placeholder="Confirm new password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              disabled={loading}
            />

            <button
              type="submit"
              className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white p-2 rounded-lg ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
