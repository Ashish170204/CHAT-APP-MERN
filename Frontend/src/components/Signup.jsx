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
    .post("http://localhost:5022/user/signup", userInfo,
        { withCredentials: true }
    )
    .then((response) => {
          console.log(response.data);
          if(response.data){
            toast.success("Signup Successful! ");
          }
          localStorage.setItem("messenger", JSON.stringify(response.data));
          setAuthUser(response.data);
        })
        .catch((error) => {
          if(error.response){
            toast.error("Error: " + error.response.data.message);
          }
        });
    };
   

    return (
        <div className="flex h-screen items-center justify-center bg-slate-700">
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-md rounded-lg p-6 w-96 space-y-4 border"
            >
                <h1 className="text-3xl font-bold text-center text-blue-600">Messenger</h1>
                <h2 className="text-xl text-center text-blue-600">Create a new Account</h2>

                {/* Full Name */}
                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("email", { 
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
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
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    {...register("password", { 
                        required: true,
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
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
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
                
                {/* Fixed text */}
                <p className="text-center">
                    Have an Account?{" "}
                    {/* Uncomment when you have a router set up */}
                    <Link to="/login" className='text-blue-500 underline cursor-pointer'>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;





