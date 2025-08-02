import React, { useState } from 'react'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom';

const Signup = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signupData = {
            username,
            email,
            password,
        };
        try {
            if (isChecked) {
                // check then send the api call
                console.log('Sending to backend:', signupData);
            }
        } catch (error) {
            console.error('Signup failed:', error.message);
        }
    };

    return (
        <div className='min-h-screen w-full flex items-center lg:p-10'>
            {/* first container to show the image */}
            <div className='h-full overflow-hidden w-1/2'>
                <img src="../../public/logo.png" className='h-full w-full object-cover rounded-3xl' alt="logoImage" />
            </div>

            <div className='h-full w-1/2 flex items-center justify-center'>
                <div className='w-10/12 h-fit flex flex-col items-center p-2'>
                    {/* logo */}
                    <div className='mx-auto'>
                        <img src="../../public/logo.png" className='size-11 rounded-md shadow-xl' alt="logoImage" />
                    </div>

                    {/* heading */}
                    <h3 className='font-semibold text-2xl pt-3 text-[#121217]'>
                        Create your account
                    </h3>
                    <p className='text-[#6c6c89] pt-2 font-medium'>
                        Get started! Please enter your details.
                    </p>

                    {/* form to get the user details and send to the backend */}
                    <form className='pt-6 w-9/12 space-y-4' onSubmit={handleSubmit}>
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
                                    type="checkbox"
                                    className="checkbox checkbox-neutral size-5"
                                    checked={isChecked}
                                    onChange={() => { setIsChecked(!isChecked) }}
                                />
                                <span className='text-[#121217] text-sm pl-3 relative font-medium'>
                                    I agree to the Terms and Conditions
                                </span>
                            </div>
                        </div>

                        <button className='h-[36px] w-full rounded-md text-sm font-medium bg-[#121217] hover:bg-[#121217]/85 duration-300 text-white mt-2'>
                            Sign up
                        </button>

                        {/* divider */}
                        <div className="divider">OR</div>

                        {/* login */}
                        <Link className='flex items-center gap-2 w-10/12 mx-auto'
                        to={'/login'}
                        >
                            <span className='text-[#6c6c89] text-sm '>
                                Already have an account?
                            </span>
                            <span className='flex items-start justify-center gap-1 cursor-pointer pt-1'>
                                <span className='font-medium text-[#121217] underline'>
                                    Sign in
                                </span>
                                {/* icon here */}
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