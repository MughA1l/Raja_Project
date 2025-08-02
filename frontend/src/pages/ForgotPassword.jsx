import { ArrowUpRight } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Email submitted:', email)
        try {
            // send to the backend to verify that either an account exists with this email or not?
            navigate('/verify-code', { state: { email } })
        }
        catch (e) {
            console.log(e.message);
        }
    }

    return (
        <div className='min-h-screen w-full flex max-md:flex-col md:justify-center md:items-center lg:p-10 relative bg-white md:bg-transparent'>

            {/* Form container - takes full height */}
            <div className='
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
            '>
                <div className='max-[470px]:w-full max-[640px]:w-8/12 sm:w-7/12 md:w-full h-full flex flex-col justify-center items-center max-sm:pt-8 p-2 pb-10'>
                    {/* logo */}
                    <div className='mx-auto'>
                        <img src="../../public/logo.png" className='size-11 rounded-md shadow-xl' alt="logoImage" />
                    </div>

                    {/* heading */}
                    <h3 className='font-semibold max-sm:text-xl lg:text-2xl pt-3 text-[#121217]'>
                        Enter email to reset password
                    </h3>
                    <p className='text-[#6c6c89] max-sm:text-sm sm:text-base pt-2 font-medium text-center'>
                        Please enter the email of your account you are registered with, an email with verification code will be sent to the account email.
                    </p>

                    {/* form */}
                    <form
                        className='pt-6 w-full max-md:px-4 md:w-9/12 space-y-4 flex-1'
                        onSubmit={handleSubmit}
                    >
                        {/* email input */}
                        <div className='flex flex-col items-start'>
                            <label htmlFor="email" className='pb-2 text-sm font-medium text-[#121217]'>Email</label>
                            <input
                                type="email"
                                id='email'
                                className='w-full border-[1px] border-[#d9d9e2] h-9 rounded-md px-2 shadow-sm focus-within:outline-2 focus-within:outline-black/20 placeholder:text-sm duration-100'
                                placeholder='enter your registered email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type='submit'
                            className='h-[36px] w-full rounded-md text-sm font-medium bg-[#121217] hover:bg-[#121217]/85 duration-300 text-white mt-2'
                        >
                            Get Code
                        </button>

                        {/* divider */}
                        <div className="divider">OR</div>

                        {/* back to login link */}
                        <Link
                            className='flex items-center max-md:justify-between max-md:gap-4 md:gap-2 max-md:w-full md:w-10/12 md:mx-auto'
                            to={'/login'}
                        >
                            <span className='text-[#6c6c89] max-sm:text-xs sm:text-sm text-nowrap'>
                                Remember your password?
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

export default ForgotPassword;