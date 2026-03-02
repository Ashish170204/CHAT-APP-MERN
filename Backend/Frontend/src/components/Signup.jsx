import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Use lowercase for variable names
  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.ConfirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Signup Successful! ");
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.message);
        }
      });
  };

  return (
    <div className="relative flex flex-col h-screen items-center justify-center py-24 px-[12vw] md:px-[7vw] lg:px-[20vw] bg-[#050414]">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] "></div>

      <div className="relative z-10 mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Create a new Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col space-y-4"
        >
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.email.type === "required"
                ? "This field is required"
                : errors.email.message}
            </span>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Create Password"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("password", {
              required: true,
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.password.message || "This field is required"}
            </span>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("ConfirmPassword", {
              required: "This field is required",
              validate: validatePasswordMatch,
            })}
          />
          {errors.ConfirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.ConfirmPassword.message}
            </span>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Sign Up
          </button>

          {/* Fixed text */}
          <p className="text-center">
            <p className="text-white"> Have an Account? </p>
            <Link
              to="/login"
              className="text-blue-500 font-bold underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
