import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useAuth from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Handle Login
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const user = await login(data.email, data.password);

      toast.success(t("login_success"));

      if (user.role === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || t("login_failed_wrong_credentials")
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot Password
  const handleForgotPassword = async () => {
    navigate("/forget-password");
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center py-10 px-4">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            {t("login_title")}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                {t("email_label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                {...register("email", { required: t("email_required") })}
                className="w-full rounded-md border py-2 px-3 shadow-sm focus:border-green-400 focus:ring-green-400 sm:text-sm"
                placeholder={t("email_placeholder")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium">
                {t("password_label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: t("password_required"),
                  })}
                  className="w-full rounded-md border py-2 pl-3 pr-10 shadow-sm focus:border-green-400 focus:ring-green-400 sm:text-sm"
                  placeholder={t("password_placeholder")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-green-400 hover:underline text-sm"
              >
                {t("forgot_password")}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-400 text-white py-2 rounded-md hover:bg-green-500"
            >
              {loading ? t("logging_in") : t("login_button")}
            </button>

            {/* Register Link */}
            <p className="mt-4 text-center text-sm">
              {t("no_account")}{" "}
              <Link to="/register" className="text-green-400 hover:underline">
                {t("register_here")}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
