import { useNavigate } from 'react-router-dom';

export default function PhenotypeResult() {
  const navigate = useNavigate();

  const phenotype = {
    type: 'Insulin-Resistant PCOS',
    description: 'This is the most common type of PCOS, affecting about 70% of women with the condition. It\'s characterized by higher insulin levels which can lead to weight gain, sugar cravings, and difficulty losing weight.',
    symptoms: ['Weight gain around midsection', 'Sugar cravings', 'Fatigue after meals', 'Skin tags', 'Dark patches on skin'],
    recommendations: [
      { icon: 'ri-restaurant-line', title: 'Low GI Diet', desc: 'Focus on whole foods, lean proteins' },
      { icon: 'ri-run-line', title: 'Regular Exercise', desc: 'Strength training + cardio' },
      { icon: 'ri-capsule-line', title: 'Supplements', desc: 'Inositol, Berberine, Chromium' },
      { icon: 'ri-moon-line', title: 'Sleep Hygiene', desc: '7-9 hours quality sleep' },
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <i className="ri-award-fill text-4xl text-white"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Your PCOS Type</h1>
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full">
            <span className="text-purple-600 font-semibold">{phenotype.type}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <p className="text-gray-600 text-sm leading-relaxed">{phenotype.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Common Symptoms</h3>
          <div className="space-y-2">
            {phenotype.symptoms.map((symptom, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <i className="ri-checkbox-circle-fill text-pink-500 text-sm"></i>
                </div>
                <span className="text-sm text-gray-600">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-800 mb-4">Your Personalized Plan</h3>
          <div className="grid grid-cols-2 gap-3">
            {phenotype.recommendations.map((rec, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-3">
                  <i className={`${rec.icon} text-purple-500`}></i>
                </div>
                <p className="font-medium text-gray-800 text-sm mb-1">{rec.title}</p>
                <p className="text-xs text-gray-500">{rec.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-5 text-white">
          <div className="flex items-center gap-3 mb-3">
            <i className="ri-vip-crown-fill text-2xl"></i>
            <h3 className="font-semibold">Unlock Premium Features</h3>
          </div>
          <p className="text-sm text-white/80 mb-4">
            Get personalized meal plans, workout routines, and 1-on-1 consultations with experts.
          </p>
          <button 
            onClick={() => navigate('/subscription')}
            className="w-full py-3 bg-white text-purple-600 font-semibold rounded-xl"
          >
            View Plans
          </button>
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button 
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
