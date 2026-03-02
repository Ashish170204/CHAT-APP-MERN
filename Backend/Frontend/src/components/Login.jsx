import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo, { withCredentials: true })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          toast.success("Login Successful! ");
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
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white hover:bg-purple-500">
          Messenger
        </h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
      </div>

      <div className="relative z-10 mt-8 w-full max-w-md bg-[#0d081f] p-6 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Login with your Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">
              This field is required
            </span>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#131025] text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            {...register("password", { required: "This field is required" })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-white font-semibold rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
          <p className="text-center">
            <p className="text-white">Don't have an account?{" "}</p>
            <Link
              to="/signup"
              className="text-blue-500 font-bold underline cursor-pointer ml-1"
            >
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
