import React, { useState } from 'react'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/services/authService';
import useAuthStore from '../../context/useAuthStore';
import { showSuccess } from '../../utils/toast';

const Signup = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const signupData = {
            username,
            email,
            password,
        };
        try {
            if (isChecked) {

                const res = await registerUser(signupData);
                if (res.success) {
                    // set the token in the localStorage
                    login(res?.data?.accessToken);
                    showSuccess('Welcome to Dashboard');
                    navigate('/');
                }
            }
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='md:min-h-screen max-md:h-fit w-full max-md:flex-col md:flex items-center lg:p-10 relative overflow-visible'>
            {/* first container to show the image */}
            <div className='max-md:fixed max-md:top-0 max-md:z-0 h-fit overflow-hidden md:w-1/2 max-md:w-full'>
                <img src="../../public/logo.png" className='h-full w-full object-cover md:rounded-3xl' alt="logoImage" />
            </div>

            <div className='max-md:absolute max-md:top-24 max-md:z-10 max-md:min-h-full md:h-full md:w-1/2 max-md:w-full flex items-center justify-center max-md:bg-white max-md:rounded-tr-4xl max-md:rounded-tl-4xl sm:max-md:pt-14'>
                <div className='w-10/12 md:h-fit flex flex-col items-center max-sm:pt-8 p-2'>
                    {/* logo */}
                    <div className='mx-auto'>
                        <img src="../../public/logo.png" className='size-11 rounded-md shadow-xl' alt="logoImage" />
                    </div>

                    {/* heading */}
                    <h3 className='font-semibold max-sm:text-xl lg:text-2xl pt-3 text-[#121217]'>
                        Create your account
                    </h3>
                    <p className='text-[#6c6c89] max-sm:text-sm sm:text-base pt-2 font-medium'>
                        Get started! Please enter your details.
                    </p>

                    {/* form to get the user details and send to the backend */}
                    <form className='pt-6 max-[500px]:w-full [500px]:max-md:w-11/12 md:w-9/12 space-y-4' onSubmit={handleSubmit}>
                        {/* input username */}
                        <div className='flex flex-col items-start'>
                            <label htmlFor="username" className='pb-2 text-sm font-medium text-[#121217]'>Username</label>
                            <input
                                type="text"
                                id='username'
                                className='w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100'
                                placeholder='enter username'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </div>

                        {/* input email */}
                        <div className='flex flex-col items-start'>
                            <label htmlFor="email" className='pb-2 text-sm font-medium text-[#121217]'>Email</label>
                            <input
                                type="text"
                                id='email'
                                className='w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100'
                                placeholder='enter email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        {/* input password */}
                        <div className='flex flex-col items-start relative'>
                            <label htmlFor="password" className='pb-2 text-sm font-medium text-[#121217]'>
                                Password
                            </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id='password'
                                className='w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm pr-10 duration-100'
                                placeholder='enter password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />

                            {/* Toggle eye icon */}
                            <div
                                onClick={() => setShowPassword((prev) => !prev)}
                                className='absolute right-3 bottom-2 cursor-pointer text-[#6c6c89]'
                            >
                                {showPassword ? <EyeOff className='size-5' /> : <Eye className='size-5' />}
                            </div>
                        </div>

                        {/* terms and conditions */}
                        <div className="flex items-center w-full pt-3">
                            <div>
                                <input
                                    id="checkbox"
                                    type="checkbox"
                                    className="checkbox checkbox-neutral size-5"
                                    checked={isChecked}
                                    onChange={() => { setIsChecked(!isChecked) }}
                                />
                                <label className='text-[#121217] text-sm pl-3 relative font-medium' htmlFor='checkbox'>
                                    I agree to the Terms and Conditions
                                </label>
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={!isChecked || isLoading}
                            className={`h-[36px] w-full rounded-md text-sm font-medium flex items-center justify-center gap-2 ${isLoading ? 'bg-[#121217]/90' : 'bg-[#121217] hover:bg-[#121217]/85'
                                } duration-300 text-white mt-2`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-white"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Sign up'
                            )}
                        </button>

                        {/* divider */}
                        <div className="divider">OR</div>

                        {/* login */}
                        <Link className='flex items-center max-md:justify-between max-md:gap-4 md:gap-2 max-md:w-full md:w-10/12 md:mx-auto'
                            to={'/login'}
                        >
                            <span className='text-[#6c6c89] max-sm:text-xs sm:text-sm text-nowrap'>
                                Already have an account?
                            </span>
                            <span className='flex items-start justify-center gap-1 cursor-pointer pt-1'>
                                <span className='font-medium max-sm:text-sm sm:text-base text-[#121217] underline'>
                                    Sign in
                                </span>
                                <ArrowUpRight className='size-5' />
                            </span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup