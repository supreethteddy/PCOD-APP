import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfileQuickSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    activityLevel: '',
    medications: [] as string[],
    lastPeriodDate: ''
  });

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise', icon: 'ri-sofa-line' },
    { id: 'light', label: 'Lightly Active', desc: '1-3 days/week', icon: 'ri-walk-line' },
    { id: 'moderate', label: 'Moderately Active', desc: '3-5 days/week', icon: 'ri-run-line' },
    { id: 'very', label: 'Very Active', desc: '6-7 days/week', icon: 'ri-fire-line' },
  ];

  const commonMedications = [
    'Metformin', 'Birth Control Pills', 'Spironolactone', 'Inositol', 
    'Vitamin D', 'Omega-3', 'None'
  ];

  const toggleMedication = (med: string) => {
    if (med === 'None') {
      setFormData(prev => ({ ...prev, medications: ['None'] }));
    } else {
      setFormData(prev => ({
        ...prev,
        medications: prev.medications.includes(med)
          ? prev.medications.filter(m => m !== med)
          : [...prev.medications.filter(m => m !== 'None'), med]
      }));
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/phenotype-intro');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4">
        <button onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
        <div className="flex-1">
          <div className="flex gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        </div>
        <span className="text-sm text-gray-500">{step}/3</span>
      </div>

      <div className="flex-1 px-6 pt-4 pb-6 overflow-auto">
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Basic Measurements</h1>
            <p className="text-gray-500 text-sm mb-8">Help us personalize your experience</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Height (cm)</label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={e => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  placeholder="165"
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Weight (kg)</label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={e => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  placeholder="60"
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Activity Level</h1>
            <p className="text-gray-500 text-sm mb-8">How active are you typically?</p>
            
            <div className="space-y-3">
              {activityLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setFormData(prev => ({ ...prev, activityLevel: level.id }))}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                    formData.activityLevel === level.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-100 bg-white'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    formData.activityLevel === level.id ? 'bg-purple-500' : 'bg-gray-100'
                  }`}>
                    <i className={`${level.icon} text-xl ${formData.activityLevel === level.id ? 'text-white' : 'text-gray-500'}`}></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-800">{level.label}</p>
                    <p className="text-xs text-gray-500">{level.desc}</p>
                  </div>
                  {formData.activityLevel === level.id && (
                    <i className="ri-checkbox-circle-fill text-purple-500 ml-auto text-xl"></i>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Health Details</h1>
            <p className="text-gray-500 text-sm mb-8">Current medications & cycle info</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Current Medications</label>
                <div className="flex flex-wrap gap-2">
                  {commonMedications.map(med => (
                    <button
                      key={med}
                      onClick={() => toggleMedication(med)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        formData.medications.includes(med)
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {med}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Last Period Start Date</label>
                <input
                  type="date"
                  value={formData.lastPeriodDate}
                  onChange={e => setFormData(prev => ({ ...prev, lastPeriodDate: e.target.value }))}
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleNext}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          {step === 3 ? 'Continue to Quiz' : 'Next'}
        </button>
      </div>
    </div>
  );
}
