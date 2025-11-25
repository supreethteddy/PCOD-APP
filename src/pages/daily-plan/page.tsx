import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyPlan() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');

  const sections = [
    { id: 'morning', label: 'Morning', icon: 'ri-sun-line', time: '6 AM - 12 PM' },
    { id: 'afternoon', label: 'Afternoon', icon: 'ri-sun-fill', time: '12 PM - 5 PM' },
    { id: 'evening', label: 'Evening', icon: 'ri-sunset-line', time: '5 PM - 9 PM' },
    { id: 'night', label: 'Night', icon: 'ri-moon-line', time: '9 PM - 12 AM' },
  ];

  const plans = {
    morning: [
      { id: 1, type: 'workout', title: 'Morning Yoga Flow', duration: '20 min', time: '7:00 AM', completed: true, icon: 'ri-yoga-line', color: 'bg-purple-100 text-purple-500' },
      { id: 2, type: 'meal', title: 'Protein-Rich Breakfast', calories: '420 cal', time: '8:30 AM', completed: true, icon: 'ri-bowl-line', color: 'bg-pink-100 text-pink-500' },
      { id: 3, type: 'reminder', title: 'Take Morning Supplements', time: '9:00 AM', completed: false, icon: 'ri-capsule-line', color: 'bg-blue-100 text-blue-500' },
      { id: 4, type: 'reminder', title: 'Drink Water (2 glasses)', time: '10:00 AM', completed: false, icon: 'ri-drop-line', color: 'bg-cyan-100 text-cyan-500' },
    ],
    afternoon: [
      { id: 5, type: 'meal', title: 'Balanced Lunch Bowl', calories: '550 cal', time: '1:00 PM', completed: false, icon: 'ri-restaurant-line', color: 'bg-green-100 text-green-500' },
      { id: 6, type: 'workout', title: 'Brisk Walk', duration: '30 min', time: '3:00 PM', completed: false, icon: 'ri-walk-line', color: 'bg-orange-100 text-orange-500' },
      { id: 7, type: 'reminder', title: 'Healthy Snack Time', time: '4:00 PM', completed: false, icon: 'ri-cake-3-line', color: 'bg-yellow-100 text-yellow-600' },
    ],
    evening: [
      { id: 8, type: 'meal', title: 'Light Dinner', calories: '480 cal', time: '7:00 PM', completed: false, icon: 'ri-restaurant-2-line', color: 'bg-pink-100 text-pink-500' },
      { id: 9, type: 'workout', title: 'Stretching Routine', duration: '15 min', time: '8:00 PM', completed: false, icon: 'ri-body-scan-line', color: 'bg-purple-100 text-purple-500' },
    ],
    night: [
      { id: 10, type: 'reminder', title: 'Evening Supplements', time: '9:30 PM', completed: false, icon: 'ri-capsule-line', color: 'bg-blue-100 text-blue-500' },
      { id: 11, type: 'reminder', title: 'Meditation & Relaxation', time: '10:00 PM', completed: false, icon: 'ri-mental-health-line', color: 'bg-indigo-100 text-indigo-500' },
      { id: 12, type: 'reminder', title: 'Sleep Time', time: '11:00 PM', completed: false, icon: 'ri-moon-fill', color: 'bg-gray-100 text-gray-500' },
    ],
  };

  const currentPlan = plans[activeSection];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 px-6 pt-12 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-arrow-left-line text-white text-xl"></i>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Daily Plan</h1>
            <p className="text-pink-100 text-sm">Friday, January 17</p>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all ${
                activeSection === section.id 
                  ? 'bg-white text-purple-600' 
                  : 'bg-white/20 text-white'
              }`}
            >
              <i className={`${section.icon} text-sm`}></i>
              <span className="text-sm font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 pb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">{sections.find(s => s.id === activeSection)?.time}</p>
          <p className="text-sm font-medium text-purple-500">
            {currentPlan.filter(p => p.completed).length}/{currentPlan.length} completed
          </p>
        </div>

        <div className="space-y-3">
          {currentPlan.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {item.title}
                    </h3>
                    <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    }`}>
                      {item.completed && <i className="ri-check-line text-white text-sm"></i>}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-time-line"></i>
                      {item.time}
                    </span>
                    {item.type === 'workout' && item.duration && (
                      <span className="flex items-center gap-1">
                        <i className="ri-timer-line"></i>
                        {item.duration}
                      </span>
                    )}
                    {item.type === 'meal' && (item as any).calories && (
                      <span className="flex items-center gap-1">
                        <i className="ri-fire-line"></i>
                        {(item as any).calories}
                      </span>
                    )}
                  </div>
                  {!item.completed && (
                    <button 
                      onClick={() => {
                        if (item.type === 'meal') navigate('/meal-detail');
                        else if (item.type === 'workout') navigate('/workout-detail');
                      }}
                      className="mt-3 text-purple-500 text-sm font-medium"
                    >
                      View Details →
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'home', icon: 'ri-home-5-line', label: 'Home', path: '/home' },
            { id: 'track', icon: 'ri-heart-pulse-line', label: 'Track', path: '/track' },
            { id: 'consult', icon: 'ri-stethoscope-line', label: 'Consult', path: '/consult' },
            { id: 'community', icon: 'ri-team-line', label: 'Community', path: '/community' },
            { id: 'profile', icon: 'ri-user-line', label: 'Profile', path: '/profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl"
            >
              <i className={`${tab.icon} text-xl mb-1 text-gray-400`}></i>
              <span className="text-[0.625rem] text-gray-500">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
