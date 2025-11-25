import { useNavigate } from 'react-router-dom';

export default function SignUpOptions() {
  const navigate = useNavigate();

  const options = [
    { icon: 'ri-mail-line', label: 'Continue with Email', color: 'bg-pink-500', action: () => navigate('/signup') },
    { icon: 'ri-phone-line', label: 'Continue with Phone', color: 'bg-purple-500', action: () => navigate('/signup?method=phone') },
    { icon: 'ri-google-fill', label: 'Continue with Google', color: 'bg-red-500', action: () => {} },
    { icon: 'ri-apple-fill', label: 'Continue with Apple', color: 'bg-gray-800', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
      </div>

      <div className="flex-1 px-6 pt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h1>
        <p className="text-gray-500 text-sm mb-10">Choose your preferred sign up method</p>

        <div className="space-y-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={opt.action}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className={`w-12 h-12 ${opt.color} rounded-xl flex items-center justify-center`}>
                <i className={`${opt.icon} text-xl text-white`}></i>
              </div>
              <span className="font-medium text-gray-700">{opt.label}</span>
              <i className="ri-arrow-right-s-line text-gray-400 ml-auto"></i>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10">
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-purple-500 font-medium">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
