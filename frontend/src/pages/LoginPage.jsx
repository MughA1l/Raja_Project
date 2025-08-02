import React, { useState } from 'react'
import { ArrowUpRight, Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password,
        };
        try {
            if (isChecked) {
                // check then send the api call
                console.log('Sending to backend:', loginData);
            }
        } catch (error) {
            console.error('Login failed:', error.message);
        }
    };



    return (
        <div className='h-screen w-full flex items-center lg:p-10'>

            {/* first container to show the image */}
            <div className='h-full overflow-hidden w-1/2'>
                <img src="../../public/logo.png" className='h-full w-full object-cover rounded-3xl' alt="logoImage" />
            </div>

            <div className='h-full w-1/2 flex items-center justify-center'>

                <div className='w-10/12 h-10/12 flex flex-col items-center p-2'>
                    {/* logo */}
                    <div className='mx-auto'>
                        <img src="../../public/logo.png" className='size-11 rounded-md shadow-xl' alt="logoImage" />
                    </div>

                    {/* heading */}
                    <h3 className='font-semibold text-2xl pt-3 text-[#121217]'>
                        Sign in to your account
                    </h3>
                    <p className='text-[#6c6c89] pt-2 font-medium'>
                        Welcome back! Please enter your details.
                    </p>

                    {/* form to get the user details and send to the backend for verification */}
                    <form className='pt-6 w-9/12 space-y-4' onSubmit={handleSubmit}>

                        {/* input email */}
                        <div className='flex flex-col items-start'>
                            <label htmlFor="email" className='pb-2 text-sm font-medium text-[#121217]'>Email</label>
                            <input type="text" id='email' className='w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100' placeholder='enter email'
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


                        {/* remember and forgot password */}
                        <div className="flex items-center w-full justify-between pt-3">
                            <div>
                                <input type="checkbox" defaultChecked className="checkbox checkbox-neutral size-5"
                                    checked={isChecked}
                                    onChange={() => { setIsChecked(!isChecked) }}
                                />
                                <span className='text-[#121217] text-sm pl-3 relative font-medium'>
                                    Remember me for 30 days
                                </span>
                            </div>
                            <span className='underline font-medium text-sm relative -top-1'>
                                Forgot password?
                            </span>
                        </div>

                        <button className='h-[36px] w-full rounded-md text-sm font-medium bg-[#121217] hover:bg-[#121217]/85 duration-300 text-white mt-2'>
                            Sign in
                        </button>

                        {/* divider */}
                        <div className="divider">OR</div>

                        {/* login */}
                        <div className='flex items-center gap-2 w-8/12 mx-auto'>
                            <span className='text-[#6c6c89] text-sm '>
                                Don't have any account?
                            </span>
                            <span className='flex items-start justify-center gap-1 cursor-pointer pt-1'>
                                <span className='font-medium text-[#121217] underline'>
                                    Login
                                </span>
                                {/* icon here */}
                                <ArrowUpRight className='size-5' />
                            </span>
                        </div>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default LoginPage;