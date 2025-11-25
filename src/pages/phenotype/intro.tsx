import { useNavigate } from 'react-router-dom';

export default function PhenotypeQuizIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <i className="ri-questionnaire-line text-5xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Discover Your PCOS Type
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Answer a few questions to help us understand your unique symptoms and create a personalized wellness plan.
          </p>

          <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <i className="ri-time-line text-purple-500"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">5-7 minutes</p>
                <p className="text-xs text-gray-500">Quick assessment</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                <i className="ri-shield-check-line text-pink-500"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">100% Private</p>
                <p className="text-xs text-gray-500">Your data is secure</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <i className="ri-sparkling-line text-blue-500"></i>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Personalized Results</p>
                <p className="text-xs text-gray-500">Tailored recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-10">
        <button 
          onClick={() => navigate('/phenotype-quiz')}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          Start Quiz
        </button>
        <button 
          onClick={() => navigate('/home')}
          className="w-full py-3 text-gray-500 text-sm mt-3"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
