import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.status === 200) {
        // Save token in localStorage (or cookies)
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        toast.success("Logged in successfully!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Wrong email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = getValues("email");

    if (!email) {
      return Swal.fire("Oops!", "Please enter your email first.", "warning");
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/forgot-password", {
        email,
      });

      Swal.fire(
        "Success!",
        "Password reset link sent to your email.",
        "success"
      );
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
    }
  };

  return (
    <div className="flex justify-center py-10 px-4">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="input w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input w-full"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              {/* Forgot password */}
              <div>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="link link-hover text-green-400"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn bg-green-400 mt-4 text-white w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* Register link */}
              <p className="text-center mt-4">
                Don’t have an account?{" "}
                <a href="/register" className="text-green-400 hover:underline">
                  Register here
                </a>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
