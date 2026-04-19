import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { CommonInput, CommonButton } from ".";
import { useDispatch } from "react-redux";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error?.message || "some thing went wrong during login");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div
          className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
          <h2>Sign in to your account </h2>
          <p className="mt-2 text-center text-base text-black">
            Don&aops; t have an account? &nbsp;
            <Link
              to={"/signup"}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              SignUp
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
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
                Sign In
              </CommonButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
