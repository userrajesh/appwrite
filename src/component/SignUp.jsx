import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin, login } from "../store/authSlice";
import { CommonInput, CommonButton } from ".";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const create = async (data) => {
    setError("");

    try {
      const session = await authservice.createuser(data);

      if (session) {
        const userData = await authservice.getCurrentUser();
        dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <h2>Create a new Account </h2>
          <p className="mt-2 text-center text-base text-black">
            Already have an account? &nbsp;
            <Link
              to={"/login"}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Login
            </Link>
          </p>
          {error && (
            <p className="text-red-600 mt-8 text-center">{{ error }}</p>
          )}
          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <CommonInput
                label="Full Name: "
                placeholder="Enter your uFll Name"
                type="text"
                {...register("name", {
                  required: true,
                })}
              />

              <CommonInput
                label="Email: "
                placeholder="Enter your Email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Email address must be a valid address",
                  },
                })}
              />

              <CommonInput
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <CommonButton type="submit" className="w-full">
                Sign Up
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
