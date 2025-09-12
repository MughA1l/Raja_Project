import { ArrowUpRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/services/authService";
import { showSuccess } from "../../utils/toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { email } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setIsLoading(true);
    const dataToSend = {
      email,
      newPassword: password,
    };
    try {
      const res = await resetPassword(dataToSend);
      if (res.success) {
        showSuccess("Updated password Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex max-md:flex-col md:justify-center md:items-center lg:p-10 relative bg-white md:bg-transparent">
      {/* Form container - takes full height */}
      <div
        className="
                max-md:relative 
                max-md:z-10 
                max-md:min-h-screen
                max-md:pt-20
                md:h-full 
                md:w-6/12 
                flex
                items-center 
                justify-center 
                bg-white 
                max-md:rounded-none 
                md:rounded-tr-4xl 
                md:rounded-tl-4xl
            "
      >
        <div className="max-[470px]:w-full max-[640px]:w-8/12 sm:w-7/12 md:w-full h-full flex flex-col justify-center items-center max-sm:pt-8 p-2 pb-10">
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
            Reset Your Password
          </h3>
          <p className="text-[#6c6c89] max-sm:text-sm sm:text-base pt-2 font-medium text-center">
            Enter a new password for your account{" "}
            {email && (
              <span className="font-semibold text-[#121217]">
                {email}
              </span>
            )}
          </p>

          {/* form */}
          <form
            className="pt-6 w-full max-md:px-4 md:w-9/12 space-y-4 flex-1"
            onSubmit={handleSubmit}
          >
            {/* password input */}
            <div className="flex flex-col items-start">
              <label
                htmlFor="password"
                className="pb-2 text-sm font-medium text-[#121217]"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100"
                placeholder="enter your new password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordsMatch(true);
                }}
                required
                minLength={3}
              />
            </div>

            {/* confirm password input */}
            <div className="flex flex-col items-start">
              <label
                htmlFor="confirmPassword"
                className="pb-2 text-sm font-medium text-[#121217]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`w-full border-[1px] ${passwordsMatch ? "border-[#d9d9e2]" : "border-red-500"} h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100`}
                placeholder="confirm your new password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordsMatch(true);
                }}
                required
                minLength={3}
              />
              {!passwordsMatch && (
                <p className="text-red-500 text-xs pt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`h-[36px] w-full rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-[#121217]/90"
                  : "bg-[#121217] hover:bg-[#121217]/85"
              } duration-300 text-white mt-2`}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-dots loading-md text-white"></span>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>

            {/* divider */}
            <div className="divider">OR</div>

            {/* back to login link */}
            <Link
              className="flex items-center max-md:justify-between max-md:gap-4 md:gap-2 max-md:w-full md:w-10/12 md:mx-auto"
              to={"/login"}
            >
              <span className="text-[#6c6c89] max-sm:text-xs sm:text-sm text-nowrap">
                Remember your password?
              </span>
              <span className="flex items-start justify-center gap-1 cursor-pointer pt-1">
                <span className="font-medium max-sm:text-sm sm:text-base text-[#121217] underline">
                  Sign in
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

export default ResetPassword;
