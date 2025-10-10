import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useUserAxios from "../../hooks/useUserAxios";

const Register = () => {
  const { t } = useTranslation(); // <-- added
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const axios=useUserAxios()
  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
          password_confirmation: data.confirmPassword,
          role: "user",
          referred_code: data.referred_code,
        }
      );

      if (response.data.status === 200) {
        toast.success(t("Account_created_successfully")); // <-- translated
        reset();
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        const errorMessages = Object.values(err.response.data.errors).flat();
        errorMessages.forEach((msg) => toast.error(t(msg))); // <-- translated
      } else {
        toast.error(t("Registration_failed_Try_again")); // <-- translated
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-center py-10 px-4">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-4">
              {t("Register")}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="space-y-2">
                {/* Name */}
                <label className="label">
                  {t("Name")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: t("Name_is_required") })}
                  className="input input-bordered w-full"
                  placeholder={t("Your_Name")}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}

                {/* Email */}
                <label className="label">
                  {t("Email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: t("Email_is_required"),
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: t("Invalid_email_address"),
                    },
                  })}
                  className="input input-bordered w-full"
                  placeholder={t("Email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}

                {/* Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("Password")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: t("Password_is_required"),
                        minLength: {
                          value: 6,
                          message: t("Minimum_6_characters_required"),
                        },
                      })}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={t("Password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {t("Confirm_Password")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative mt-1">
                    <input
                      type={showConfirm ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: t("Confirm_Password_is_required"),
                        validate: (value) =>
                          value === password || t("Passwords_do_not_match"),
                      })}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder={t("Confirm_Password")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirm ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Referral Code */}
                <label className="label">
                  {t("Referral_Code")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("referred_code", {
                    required: t("Referral_code_is_required"),
                  })}
                  className="input input-bordered w-full"
                  placeholder={t("Referral_Code")}
                />
                {errors.referred_code && (
                  <p className="text-red-500">{errors.referred_code.message}</p>
                )}

                {/* Hidden Role */}
                <input type="hidden" {...register("role")} value="user" />

                {/* Submit */}
                <button
                  type="submit"
                  className="btn bg-green-400 w-full mt-4 text-white"
                  disabled={loading}
                >
                  {loading ? t("Registering...") : t("Register")}
                </button>

                <p className="text-center mt-4 text-sm">
                  {t("Already_have_an_account")}{" "}
                  <a href="/login" className="text-green-500 hover:underline">
                    {t("Login_here")}
                  </a>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
