import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (formData.phone.length < 10) newErrors.phone = 'Valid phone required';
    if (!formData.dob) newErrors.dob = 'Date of birth required';
    if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords must match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      navigate('/profile-setup');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Sign Up</h1>
      </div>

      <div className="flex-1 px-6 pt-4 pb-6 overflow-auto">
        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleChange('name', e.target.value)}
              placeholder="Enter your name"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.name ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400`}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="your@email.com"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.email ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.phone ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400`}
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              onChange={e => handleChange('dob', e.target.value)}
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.dob ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400`}
            />
            {errors.dob && <p className="text-red-400 text-xs mt-1">{errors.dob}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={e => handleChange('password', e.target.value)}
                placeholder="Min 6 characters"
                className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.password ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400 pr-12`}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-gray-400`}></i>
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Confirm Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={e => handleChange('confirmPassword', e.target.value)}
              placeholder="Re-enter password"
              className={`w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border ${errors.confirmPassword ? 'border-red-400' : 'border-transparent'} focus:outline-none focus:border-purple-400`}
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleSubmit}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          Create Account
        </button>
        <p className="text-xs text-gray-400 text-center mt-4">
          By signing up, you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
