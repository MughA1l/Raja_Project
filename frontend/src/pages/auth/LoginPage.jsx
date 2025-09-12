import React, { useState } from "react";
import { ArrowUpRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/services/authService.js";
import useAuthStore from "../../context/useAuthStore.js";
import { showSuccess } from "../../utils/toast.js";

const LoginPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loginData = {
      email,
      password,
    };
    try {
      if (isChecked) {
        const res = await loginUser(loginData);

        if (res.success) {
          // set the token in the localStorage
          login(res?.data?.accessToken);
          showSuccess("Welcome to Dashboard");
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen max-md:h-fit w-full max-md:flex-col md:flex items-center lg:p-10 relative overflow-visible">
      <div className="max-md:absolute max-md:top-24 max-md:z-10 max-md:min-h-full md:h-full md:w-6/12 mx-auto max-md:w-full flex items-center justify-center max-md:bg-white max-md:rounded-tr-4xl max-md:rounded-tl-4xl sm:max-md:pt-14">
        <div className="w-10/12 md:h-fit flex flex-col items-center max-sm:pt-8 p-2">
          {/* logo */}
          <div className="mx-auto">
            <img
              src="../../public/logo-dark.png"
              className="w-52"
              alt="logoImage"
            />
          </div>

          {/* heading */}
          <h3 className="font-semibold max-sm:text-xl lg:text-2xl pt-3 text-[#121217]">
            Sign in to your account
          </h3>
          <p className="text-[#6c6c89] max-sm:text-sm sm:text-base pt-2 font-medium">
            Welcome back! Please enter your details.
          </p>

          {/* form to get the user details and send to the backend for verification */}
          <form
            className="pt-6 max-[500px]:w-full [500px]:max-md:w-11/12 md:w-9/12 space-y-4"
            onSubmit={handleSubmit}
          >
            {/* input email */}
            <div className="flex flex-col items-start">
              <label
                htmlFor="email"
                className="pb-2 text-sm font-medium text-[#121217]"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                className="w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100"
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            {/* input password */}
            <div className="flex flex-col items-start relative">
              <label
                htmlFor="password"
                className="pb-2 text-sm font-medium text-[#121217]"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm pr-10 duration-100"
                placeholder="enter password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              {/* Toggle eye icon */}
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 bottom-2 cursor-pointer text-[#6c6c89]"
              >
                {showPassword ? (
                  <EyeOff className="size-5" />
                ) : (
                  <Eye className="size-5" />
                )}
              </div>
            </div>

            {/* remember and forgot password */}
            <div className="flex items-center w-full justify-between pt-3">
              <div className="max-md:w-1/2 max-md:text-start">
                <input
                  id="checkbox"
                  type="checkbox"
                  className="checkbox checkbox-neutral size-5"
                  checked={isChecked}
                  onChange={() => {
                    setIsChecked(!isChecked);
                  }}
                />
                <label
                  htmlFor="checkbox"
                  className="text-[#121217] text-sm pl-3 relative font-medium"
                >
                  Remember me for 30 days
                </label>
              </div>
              <Link
                to={"/forgot-password"}
                className="underline cursor-pointer font-medium text-sm relative -top-1"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isChecked || isLoading}
              className={`h-[36px] w-full rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-[#121217]/90"
                  : "bg-[#121217] hover:bg-[#121217]/85"
              } duration-300 text-white mt-2`}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-dots loading-md text-white"></span>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>

            {/* divider */}
            <div className="divider">OR</div>

            {/* signup link */}
            <Link
              className="flex items-center max-md:justify-between max-md:gap-4 md:gap-2 max-md:w-full md:w-10/12 md:mx-auto"
              to={"/signup"}
            >
              <span className="text-[#6c6c89] max-sm:text-xs sm:text-sm text-nowrap">
                Don't have any account?
              </span>
              <span className="flex items-start justify-center gap-1 cursor-pointer pt-1">
                <span className="font-medium max-sm:text-sm sm:text-base text-[#121217] underline">
                  Signup
                </span>
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
