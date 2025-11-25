import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingIntro() {
  const navigate = useNavigate();
  const [showGuestModal, setShowGuestModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12">
        <div className="w-full max-w-sm">
          <img 
            src="https://readdy.ai/api/search-image?query=Soft%20pastel%20illustration%20of%20a%20woman%20doing%20yoga%20meditation%20in%20peaceful%20garden%20setting%20with%20flowers%20and%20butterflies%20around%20her%20wellness%20health%20feminine%20energy%20soft%20pink%20purple%20gradient%20background%20minimalist%20style&width=300&height=280&seq=1&orientation=portrait" 
            alt="Wellness" 
            className="w-full h-56 object-contain mb-8"
          />
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
            Take Control of Your PCOS Journey
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">
            Personalized plans, symptom tracking, and expert guidance tailored just for you.
          </p>
        </div>
      </div>

      <div className="px-6 pb-10 space-y-3">
        <button 
          onClick={() => navigate('/signup-options')}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          Sign Up
        </button>
        <button 
          onClick={() => navigate('/login')}
          className="w-full py-4 bg-white text-gray-700 font-semibold rounded-2xl border border-gray-200"
        >
          Login
        </button>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowGuestModal(true)}
            className="flex-1 py-3 text-gray-500 text-sm"
          >
            Continue as Guest
          </button>
          <button 
            onClick={() => navigate('/learn-more')}
            className="flex-1 py-3 text-purple-500 text-sm font-medium"
          >
            Learn More
          </button>
        </div>
      </div>

      {showGuestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowGuestModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-10" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-3xl text-purple-500"></i>
            </div>
            <h3 className="text-lg font-bold text-center mb-2">Guest Mode Limitations</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              As a guest, you can explore the app but won't be able to save your data, access personalized plans, or book consultations.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-close-circle-fill text-red-400"></i>
                No data sync across devices
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-close-circle-fill text-red-400"></i>
                Limited tracking features
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-600">
                <i className="ri-close-circle-fill text-red-400"></i>
                No teleconsultation access
              </li>
            </ul>
            <button 
              onClick={() => {
                setShowGuestModal(false);
                navigate('/home');
              }}
              className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl mb-3"
            >
              Continue as Guest
            </button>
            <button 
              onClick={() => {
                setShowGuestModal(false);
                navigate('/signup-options');
              }}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
