import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = () => {
    if (loginMethod === 'phone') {
      setShowOtpModal(true);
    } else {
      navigate('/home');
    }
  };

  const verifyOtp = () => {
    setShowOtpModal(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Login</h1>
      </div>

      <div className="flex-1 px-6 pt-8">
        <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <i className="ri-heart-pulse-fill text-4xl text-white"></i>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-500 text-sm mb-8">Login to continue your wellness journey</p>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'email' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${loginMethod === 'phone' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
          >
            Phone
          </button>
        </div>

        <div className="space-y-5">
          {loginMethod === 'email' ? (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          )}

          {loginMethod === 'email' && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400 pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400`}></i>
                </button>
              </div>
              <button className="text-purple-500 text-sm mt-2">Forgot Password?</button>
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4">
        <button 
          onClick={handleLogin}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          {loginMethod === 'phone' ? 'Send OTP' : 'Login'}
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup-options')} className="text-purple-500 font-medium">
            Sign Up
          </button>
        </p>
      </div>

      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowOtpModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-center mb-2">Enter OTP</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              We've sent a 6-digit code to {phone}
            </p>
            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(idx, e.target.value)}
                  className="w-12 h-14 bg-gray-50 rounded-xl text-center text-xl font-bold border-2 border-transparent focus:border-purple-400 focus:outline-none"
                />
              ))}
            </div>
            <button className="text-purple-500 text-sm text-center w-full mb-6">Resend OTP</button>
            <button 
              onClick={verifyOtp}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl"
            >
              Verify & Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
