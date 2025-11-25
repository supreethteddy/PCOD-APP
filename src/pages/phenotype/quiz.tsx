import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    question: 'How would you describe your menstrual cycle?',
    options: [
      { id: 'regular', label: 'Regular (21-35 days)', icon: 'ri-calendar-check-line' },
      { id: 'irregular', label: 'Irregular (varies each month)', icon: 'ri-calendar-todo-line' },
      { id: 'absent', label: 'Absent or very rare', icon: 'ri-calendar-close-line' },
      { id: 'heavy', label: 'Heavy or prolonged', icon: 'ri-drop-fill' },
    ]
  },
  {
    id: 2,
    question: 'Do you experience acne or oily skin?',
    options: [
      { id: 'none', label: 'Rarely or never', icon: 'ri-emotion-happy-line' },
      { id: 'mild', label: 'Mild, occasional breakouts', icon: 'ri-emotion-normal-line' },
      { id: 'moderate', label: 'Moderate, frequent acne', icon: 'ri-emotion-unhappy-line' },
      { id: 'severe', label: 'Severe, persistent acne', icon: 'ri-emotion-sad-line' },
    ]
  },
  {
    id: 3,
    question: 'Have you noticed excess hair growth?',
    options: [
      { id: 'none', label: 'No excess hair', icon: 'ri-checkbox-circle-line' },
      { id: 'mild', label: 'Mild (upper lip, chin)', icon: 'ri-user-line' },
      { id: 'moderate', label: 'Moderate (face, chest)', icon: 'ri-user-3-line' },
      { id: 'severe', label: 'Significant growth', icon: 'ri-user-star-line' },
    ]
  },
  {
    id: 4,
    question: 'How would you describe your energy levels?',
    options: [
      { id: 'high', label: 'Generally energetic', icon: 'ri-flashlight-line' },
      { id: 'normal', label: 'Normal, occasional fatigue', icon: 'ri-battery-2-line' },
      { id: 'low', label: 'Often tired', icon: 'ri-battery-low-line' },
      { id: 'very-low', label: 'Constantly exhausted', icon: 'ri-battery-line' },
    ]
  },
  {
    id: 5,
    question: 'Do you experience mood swings or anxiety?',
    options: [
      { id: 'rarely', label: 'Rarely', icon: 'ri-emotion-happy-line' },
      { id: 'sometimes', label: 'Sometimes', icon: 'ri-emotion-normal-line' },
      { id: 'often', label: 'Often', icon: 'ri-emotion-unhappy-line' },
      { id: 'always', label: 'Almost always', icon: 'ri-mental-health-line' },
    ]
  },
  {
    id: 6,
    question: 'Do you experience bloating or digestive issues?',
    options: [
      { id: 'never', label: 'Never', icon: 'ri-checkbox-circle-line' },
      { id: 'occasionally', label: 'Occasionally', icon: 'ri-time-line' },
      { id: 'frequently', label: 'Frequently', icon: 'ri-repeat-line' },
      { id: 'daily', label: 'Daily', icon: 'ri-calendar-line' },
    ]
  },
  {
    id: 7,
    question: 'Do you have difficulty losing weight?',
    options: [
      { id: 'no', label: 'No, weight is stable', icon: 'ri-scales-line' },
      { id: 'mild', label: 'Slightly difficult', icon: 'ri-arrow-up-line' },
      { id: 'moderate', label: 'Quite difficult', icon: 'ri-arrow-up-double-line' },
      { id: 'severe', label: 'Very difficult despite efforts', icon: 'ri-lock-line' },
    ]
  },
  {
    id: 8,
    question: 'Do you experience sugar cravings?',
    options: [
      { id: 'rarely', label: 'Rarely', icon: 'ri-cake-line' },
      { id: 'sometimes', label: 'Sometimes', icon: 'ri-cake-2-line' },
      { id: 'often', label: 'Often', icon: 'ri-cake-3-line' },
      { id: 'intense', label: 'Intense, hard to control', icon: 'ri-fire-line' },
    ]
  },
];

export default function PhenotypeQuiz() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (optionId: string) => {
    setAnswers(prev => ({ ...prev, [questions[currentQuestion].id]: optionId }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate('/phenotype-result');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate(-1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const selectedAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4">
        <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
        <div className="flex-1">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-500">{currentQuestion + 1}/{questions.length}</span>
      </div>

      <div className="flex-1 px-6 pt-8 pb-6">
        <h1 className="text-xl font-bold text-gray-800 mb-8">{currentQ.question}</h1>
        
        <div className="space-y-3">
          {currentQ.options.map(option => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                selectedAnswer === option.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-100 bg-white'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedAnswer === option.id ? 'bg-purple-500' : 'bg-gray-100'
              }`}>
                <i className={`${option.icon} text-xl ${selectedAnswer === option.id ? 'text-white' : 'text-gray-500'}`}></i>
              </div>
              <span className={`font-medium ${selectedAnswer === option.id ? 'text-purple-700' : 'text-gray-700'}`}>
                {option.label}
              </span>
              {selectedAnswer === option.id && (
                <i className="ri-checkbox-circle-fill text-purple-500 ml-auto text-xl"></i>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={`w-full py-4 font-semibold rounded-2xl transition-all ${
            selectedAnswer 
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-200' 
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
        </button>
      </div>
    </div>
  );
}
