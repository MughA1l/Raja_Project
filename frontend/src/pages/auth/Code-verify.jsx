import { ArrowUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verfiyCode } from '../../api/services/authService';
import { showSuccess } from '../../utils/toast';

const CodeVerify = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const [userEmail, setUserEmail] = useState('');
    const [code, setCode] = useState(['', '', '', '']);
    const [isCodeComplete, setIsCodeComplete] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!email) navigate('/forgot-password');
        setUserEmail(email);
    }, [email, navigate])

    useEffect(() => {
        // Check if all code digits are filled
        setIsCodeComplete(code.every(digit => digit !== ''));
    }, [code])

    const handleCodeChange = (e, index) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            // Auto focus to next input
            if (value && index < 3) {
                document.getElementById(`code-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            document.getElementById(`code-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const verificationCode = code.join('');
        const dataToSend = {
            code: verificationCode,
            email: userEmail,
        }
        try {
            let res = await verfiyCode(dataToSend);
            if (res.success) {
                showSuccess('Code Verified! Enter new password.')
                navigate('/reset-password', { state: { email: userEmail } });
            }
        } catch (error) {
            console.log(error.message);
        }
        finally {
            setIsLoading(false);
        }
    };

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
                        Enter verification code
                    </h3>
                    <p className='text-[#6c6c89] max-sm:text-sm sm:text-base pt-2 font-medium text-center'>
                        We've sent a 4-digit code to <span className='font-semibold text-[#121217]'>{userEmail}</span>. Please enter it below.
                    </p>

                    {/* form */}
                    <form
                        className='pt-6 w-full max-md:px-4 md:w-9/12 space-y-4 flex-1'
                        onSubmit={handleSubmit}
                    >
                        {/* code input */}
                        <div className='flex flex-col items-center'>
                            <label htmlFor="code" className='pb-2 text-sm font-medium text-[#121217]'>Verification Code</label>
                            <div className='flex gap-3 justify-center'>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`code-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        maxLength={1}
                                        className='w-12 h-12 border-[1px] border-[#d9d9e2] rounded-md text-center text-xl shadow-sm focus-within:outline-2 focus-within:outline-black/20 duration-100'
                                        value={digit}
                                        onChange={(e) => handleCodeChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        autoFocus={index === 0}
                                        required
                                    />
                                ))}
                            </div>
                        </div>


                        <button
                            type='submit'
                            disabled={!isCodeComplete || isLoading}
                            className={`h-[36px] w-full rounded-md text-sm font-medium flex items-center justify-center gap-2 ${isCodeComplete
                                ? isLoading
                                    ? 'bg-[#121217]/90'
                                    : 'bg-[#121217] hover:bg-[#121217]/85'
                                : 'bg-gray-400 cursor-not-allowed'
                                } duration-300 text-white mt-2`}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-dots loading-md text-white"></span>
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
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

export default CodeVerify