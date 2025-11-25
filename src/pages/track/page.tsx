import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackMain() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'period' | 'symptoms' | 'mood' | 'sleep' | 'food' | 'water'>('period');

  const tabs = [
    { id: 'period', label: 'Period', icon: 'ri-calendar-event-line' },
    { id: 'symptoms', label: 'Symptoms', icon: 'ri-heart-pulse-line' },
    { id: 'mood', label: 'Mood', icon: 'ri-emotion-line' },
    { id: 'sleep', label: 'Sleep', icon: 'ri-moon-line' },
    { id: 'food', label: 'Food', icon: 'ri-restaurant-line' },
    { id: 'water', label: 'Water', icon: 'ri-drop-line' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Track</h1>
          <button onClick={() => navigate('/insights')} className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
            <i className="ri-bar-chart-line text-purple-500"></i>
          </button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              <i className={`${tab.icon} text-sm`}></i>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'period' && <PeriodTracker />}
        {activeTab === 'symptoms' && <SymptomTracker />}
        {activeTab === 'mood' && <MoodSleepTracker type="mood" />}
        {activeTab === 'sleep' && <MoodSleepTracker type="sleep" />}
        {activeTab === 'food' && <FoodTracker />}
        {activeTab === 'water' && <WaterTracker />}
      </div>

      <BottomNav active="track" />
    </div>
  );
}

function PeriodTracker() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const currentCycle = {
    dayOfCycle: 14,
    nextPeriod: 'Jan 28',
    fertileWindow: 'Jan 18-23',
    phase: 'Follicular Phase'
  };

  return (
    <div>
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-pink-100 text-sm mb-1">Current Cycle</p>
            <p className="text-3xl font-bold">Day {currentCycle.dayOfCycle}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-calendar-event-fill text-3xl"></i>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-pink-100 text-xs mb-1">Next Period</p>
            <p className="font-semibold">{currentCycle.nextPeriod}</p>
          </div>
          <div>
            <p className="text-pink-100 text-xs mb-1">Fertile Window</p>
            <p className="font-semibold">{currentCycle.fertileWindow}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">January 2025</h3>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="text-center text-xs text-gray-500 font-medium">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
            const isPeriod = day >= 1 && day <= 5;
            const isFertile = day >= 18 && day <= 23;
            const isToday = day === 14;
            return (
              <button
                key={day}
                onClick={() => {
                  setSelectedDate(new Date(2025, 0, day));
                  setShowAddModal(true);
                }}
                className={`aspect-square rounded-lg text-sm font-medium flex items-center justify-center ${
                  isPeriod ? 'bg-pink-500 text-white' :
                  isFertile ? 'bg-purple-100 text-purple-600' :
                  isToday ? 'bg-purple-500 text-white' :
                  'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Cycle Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
              <i className="ri-information-line text-pink-500"></i>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">Follicular Phase</p>
              <p className="text-xs text-gray-500">Energy levels are rising. Great time for new activities!</p>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold mb-6">Log Period Entry</h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Flow Intensity</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Light', 'Medium', 'Heavy', 'Spotting'].map(flow => (
                    <button key={flow} className="py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                      {flow}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Pain Level</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(level => (
                    <button key={level} className="flex-1 aspect-square bg-gray-50 rounded-xl text-sm font-bold text-gray-700 hover:bg-pink-500 hover:text-white">
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Symptoms</label>
                <div className="flex flex-wrap gap-2">
                  {['Cramps', 'Bloating', 'Headache', 'Fatigue', 'Mood Swings', 'Back Pain'].map(symptom => (
                    <button key={symptom} className="px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-700 hover:bg-purple-500 hover:text-white">
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Notes</label>
                <textarea 
                  placeholder="Add any additional notes..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                  rows={3}
                ></textarea>
              </div>
            </div>

            <button 
              onClick={() => setShowAddModal(false)}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl mt-6"
            >
              Save Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SymptomTracker() {
  const symptoms = [
    { id: 'acne', label: 'Acne', icon: 'ri-user-smile-line', color: 'bg-pink-100 text-pink-500' },
    { id: 'hair', label: 'Hair Fall', icon: 'ri-scissors-line', color: 'bg-purple-100 text-purple-500' },
    { id: 'bloating', label: 'Bloating', icon: 'ri-heart-pulse-line', color: 'bg-blue-100 text-blue-500' },
    { id: 'cramps', label: 'Cramps', icon: 'ri-pulse-line', color: 'bg-red-100 text-red-500' },
    { id: 'mood', label: 'Mood Swings', icon: 'ri-emotion-unhappy-line', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'fatigue', label: 'Fatigue', icon: 'ri-battery-low-line', color: 'bg-gray-100 text-gray-500' },
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({});

  return (
    <div>
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Today's Symptoms</h3>
        <div className="grid grid-cols-2 gap-3">
          {symptoms.map(symptom => (
            <button
              key={symptom.id}
              onClick={() => setSelectedSymptoms(prev => ({ ...prev, [symptom.id]: (prev[symptom.id] || 0) + 1 }))}
              className={`p-4 rounded-2xl border-2 transition-all ${
                selectedSymptoms[symptom.id] ? 'border-purple-500 bg-purple-50' : 'border-gray-100 bg-white'
              }`}
            >
              <div className={`w-12 h-12 ${symptom.color} rounded-xl flex items-center justify-center mb-3`}>
                <i className={`${symptom.icon} text-xl`}></i>
              </div>
              <p className="text-sm font-medium text-gray-800">{symptom.label}</p>
              {selectedSymptoms[symptom.id] && (
                <div className="flex gap-1 mt-2">
                  {Array.from({ length: Math.min(selectedSymptoms[symptom.id], 5) }, (_, i) => (
                    <div key={i} className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">This Week</h3>
        <div className="space-y-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, idx) => (
            <div key={day} className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-12">{day}</span>
              <div className="flex-1 flex gap-2">
                {idx < 3 && <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-smile-line text-pink-500 text-sm"></i>
                </div>}
                {idx < 4 && <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-heart-pulse-line text-blue-500 text-sm"></i>
                </div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoodSleepTracker({ type }: { type: 'mood' | 'sleep' }) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [stressLevel, setStressLevel] = useState(3);

  const moods = [
    { id: 'great', icon: 'ri-emotion-happy-fill', label: 'Great', color: 'text-green-500' },
    { id: 'good', icon: 'ri-emotion-line', label: 'Good', color: 'text-blue-500' },
    { id: 'okay', icon: 'ri-emotion-normal-line', label: 'Okay', color: 'text-yellow-500' },
    { id: 'bad', icon: 'ri-emotion-unhappy-line', label: 'Bad', color: 'text-orange-500' },
    { id: 'terrible', icon: 'ri-emotion-sad-line', label: 'Terrible', color: 'text-red-500' },
  ];

  if (type === 'mood') {
    return (
      <div>
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
          <div className="flex justify-between">
            {moods.map(mood => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`flex flex-col items-center gap-2 ${selectedMood === mood.id ? 'scale-110' : ''} transition-transform`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                  selectedMood === mood.id ? 'bg-purple-100' : 'bg-gray-50'
                }`}>
                  <i className={`${mood.icon} text-2xl ${mood.color}`}></i>
                </div>
                <span className="text-xs text-gray-600">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
          <h3 className="font-semibold text-gray-800 mb-4">Stress Level</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Low</span>
            <input
              type="range"
              min="1"
              max="5"
              value={stressLevel}
              onChange={e => setStressLevel(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-100 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(168 85 247) 0%, rgb(168 85 247) ${(stressLevel - 1) * 25}%, rgb(243 244 246) ${(stressLevel - 1) * 25}%, rgb(243 244 246) 100%)`
              }}
            />
            <span className="text-sm text-gray-500">High</span>
          </div>
          <p className="text-center text-2xl font-bold text-purple-500 mt-4">{stressLevel}/5</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">This Week's Mood</h3>
          <div className="flex items-end justify-between h-32">
            {[4, 3, 5, 4, 3].map((height, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-lg"
                  style={{ height: `${height * 20}%` }}
                ></div>
                <span className="text-xs text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-indigo-100 text-sm mb-1">Last Night</p>
            <p className="text-4xl font-bold">{sleepHours}h</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-moon-fill text-3xl"></i>
          </div>
        </div>
        <p className="text-indigo-100 text-sm">Good sleep quality! 😴</p>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Log Sleep</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Hours Slept</label>
            <input
              type="number"
              step="0.5"
              value={sleepHours}
              onChange={e => setSleepHours(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Sleep Quality</label>
            <div className="grid grid-cols-4 gap-2">
              {['Poor', 'Fair', 'Good', 'Excellent'].map(quality => (
                <button key={quality} className="py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-600">
                  {quality}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Sleep Pattern</h3>
        <div className="space-y-3">
          {[
            { day: 'Mon', hours: 7.5, quality: 'Good' },
            { day: 'Tue', hours: 6.5, quality: 'Fair' },
            { day: 'Wed', hours: 8, quality: 'Excellent' },
            { day: 'Thu', hours: 7, quality: 'Good' },
            { day: 'Fri', hours: 7.5, quality: 'Good' },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <span className="text-sm text-gray-500 w-12">{entry.day}</span>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${(entry.hours / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-800 w-16">{entry.hours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodTracker() {
  const [meals, setMeals] = useState([
    { id: 1, name: 'Oatmeal with Berries', time: '8:30 AM', calories: 320, type: 'Breakfast', image: 'https://readdy.ai/api/search-image?query=healthy%20oatmeal%20bowl%20with%20fresh%20berries%20and%20nuts%20on%20white%20background%20food%20photography%20top%20view%20natural%20lighting&width=80&height=80&seq=food1&orientation=squarish' },
    { id: 2, name: 'Grilled Chicken Salad', time: '1:00 PM', calories: 450, type: 'Lunch', image: 'https://readdy.ai/api/search-image?query=grilled%20chicken%20salad%20with%20vegetables%20on%20white%20background%20healthy%20food%20photography%20top%20view%20natural%20lighting&width=80&height=80&seq=food2&orientation=squarish' },
  ]);

  return (
    <div>
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Today's Nutrition</h3>
          <span className="text-sm text-purple-500 font-medium">1,450 / 1,800 cal</span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <i className="ri-fire-line text-pink-500"></i>
            </div>
            <p className="text-xs text-gray-500 mb-1">Carbs</p>
            <p className="text-sm font-bold text-gray-800">145g</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <i className="ri-leaf-line text-purple-500"></i>
            </div>
            <p className="text-xs text-gray-500 mb-1">Protein</p>
            <p className="text-sm font-bold text-gray-800">85g</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
              <i className="ri-drop-line text-blue-500"></i>
            </div>
            <p className="text-xs text-gray-500 mb-1">Fats</p>
            <p className="text-sm font-bold text-gray-800">45g</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Meals Logged</h3>
          <button className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <i className="ri-add-line text-white"></i>
          </button>
        </div>
        <div className="space-y-3">
          {meals.map(meal => (
            <div key={meal.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <img src={meal.image} alt={meal.name} className="w-14 h-14 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{meal.name}</p>
                <p className="text-xs text-gray-500">{meal.time} • {meal.type}</p>
              </div>
              <span className="text-sm font-semibold text-purple-500">{meal.calories} cal</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl">
        Quick Log Meal
      </button>
    </div>
  );
}

function WaterTracker() {
  const [glasses, setGlasses] = useState(6);
  const target = 8;

  return (
    <div>
      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-100 text-sm mb-1">Today's Intake</p>
            <p className="text-4xl font-bold">{glasses}/{target}</p>
            <p className="text-blue-100 text-sm mt-1">glasses</p>
          </div>
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-drop-fill text-4xl"></i>
          </div>
        </div>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all"
            style={{ width: `${(glasses / target) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm mb-4">
        <h3 className="font-semibold text-gray-800 mb-4">Log Water</h3>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {Array.from({ length: target }, (_, i) => (
            <button
              key={i}
              onClick={() => setGlasses(i + 1)}
              className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${
                i < glasses ? 'bg-blue-500' : 'bg-gray-100'
              }`}
            >
              <i className={`ri-drop-fill text-2xl ${i < glasses ? 'text-white' : 'text-gray-300'}`}></i>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setGlasses(Math.max(0, glasses - 1))}
            className="flex-1 py-3 bg-gray-100 rounded-xl font-medium text-gray-700"
          >
            <i className="ri-subtract-line mr-2"></i>Remove
          </button>
          <button 
            onClick={() => setGlasses(Math.min(target, glasses + 1))}
            className="flex-1 py-3 bg-blue-500 text-white rounded-xl font-medium"
          >
            <i className="ri-add-line mr-2"></i>Add Glass
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">This Week</h3>
        <div className="flex items-end justify-between h-32">
          {[7, 6, 8, 7, 6].map((count, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div 
                className="w-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg"
                style={{ height: `${(count / target) * 100}%` }}
              ></div>
              <span className="text-xs text-gray-500">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][idx]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: string }) {
  const navigate = useNavigate();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
      <div className="grid grid-cols-5 gap-1">
        {[
          { id: 'home', icon: 'ri-home-5-line', label: 'Home', path: '/home' },
          { id: 'track', icon: 'ri-heart-pulse-fill', label: 'Track', path: '/track' },
          { id: 'consult', icon: 'ri-stethoscope-line', label: 'Consult', path: '/consult' },
          { id: 'community', icon: 'ri-team-line', label: 'Community', path: '/community' },
          { id: 'profile', icon: 'ri-user-line', label: 'Profile', path: '/profile' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
              active === tab.id ? 'bg-purple-50' : ''
            }`}
          >
            <i className={`${tab.icon} text-xl mb-1 ${
              active === tab.id ? 'text-purple-500' : 'text-gray-400'
            }`}></i>
            <span className={`text-[0.625rem] ${
              active === tab.id ? 'text-purple-500 font-medium' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
