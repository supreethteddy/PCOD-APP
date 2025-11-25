import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const healthScore = 78;
  const todayTasks = [
    { id: 1, title: 'Morning Yoga', time: '7:00 AM', completed: true, icon: 'ri-yoga-line', color: 'bg-purple-100 text-purple-500' },
    { id: 2, title: 'Breakfast - Oats Bowl', time: '8:30 AM', completed: true, icon: 'ri-bowl-line', color: 'bg-pink-100 text-pink-500' },
    { id: 3, title: 'Take Supplements', time: '9:00 AM', completed: false, icon: 'ri-capsule-line', color: 'bg-blue-100 text-blue-500' },
    { id: 4, title: 'Lunch - Quinoa Salad', time: '1:00 PM', completed: false, icon: 'ri-restaurant-line', color: 'bg-green-100 text-green-500' },
  ];

  const quickActions = [
    { icon: 'ri-calendar-event-line', label: 'Period', color: 'bg-pink-500', action: () => navigate('/track') },
    { icon: 'ri-heart-pulse-line', label: 'Symptoms', color: 'bg-purple-500', action: () => navigate('/track') },
    { icon: 'ri-emotion-line', label: 'Mood', color: 'bg-blue-500', action: () => navigate('/track') },
    { icon: 'ri-restaurant-2-line', label: 'Food', color: 'bg-green-500', action: () => navigate('/track') },
  ];

  const trackers = [
    { label: 'Water', value: '6/8', icon: 'ri-drop-line', color: 'text-blue-500', progress: 75 },
    { label: 'Steps', value: '7.2k', icon: 'ri-footprint-line', color: 'text-purple-500', progress: 72 },
    { label: 'Sleep', value: '7h 30m', icon: 'ri-moon-line', color: 'text-indigo-500', progress: 85 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 px-6 pt-12 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-pink-100 text-sm">Good Morning</p>
            <h1 className="text-white text-2xl font-bold">Sarah</h1>
          </div>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-notification-3-line text-white text-xl"></i>
          </button>
        </div>

        {/* Health Score */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/80 text-sm">Today's Health Score</p>
              <p className="text-white text-3xl font-bold">{healthScore}</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="transform -rotate-90 w-16 h-16">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                <circle 
                  cx="32" cy="32" r="28" 
                  stroke="white" 
                  strokeWidth="6" 
                  fill="none"
                  strokeDasharray={`${healthScore * 1.76} 176`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <i className="ri-heart-pulse-fill text-white text-xl"></i>
              </div>
            </div>
          </div>
          <p className="text-white/70 text-xs">Great progress! Keep it up 💪</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Quick Track</h3>
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, idx) => (
              <button key={idx} onClick={action.action} className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center`}>
                  <i className={`${action.icon} text-white text-xl`}></i>
                </div>
                <span className="text-xs text-gray-600">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Plan */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Today's Plan</h3>
          <button onClick={() => navigate('/daily-plan')} className="text-purple-500 text-sm font-medium">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {todayTasks.map(task => (
            <div key={task.id} className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
              <div className={`w-12 h-12 ${task.color} rounded-xl flex items-center justify-center`}>
                <i className={`${task.icon} text-xl`}></i>
              </div>
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                  {task.title}
                </p>
                <p className="text-xs text-gray-500">{task.time}</p>
              </div>
              <button className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
              }`}>
                {task.completed && <i className="ri-check-line text-white text-sm"></i>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trackers */}
      <div className="px-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Today's Progress</h3>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          {trackers.map((tracker, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <i className={`${tracker.icon} ${tracker.color} text-lg`}></i>
                  <span className="text-sm text-gray-700">{tracker.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">{tracker.value}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${tracker.color.replace('text-', 'bg-')} transition-all`}
                  style={{ width: `${tracker.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
              <i className="ri-lightbulb-flash-line text-white"></i>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">Today's Insight</h4>
              <p className="text-sm text-gray-600">
                Your cycle shows you're in the follicular phase. This is a great time for high-intensity workouts!
              </p>
            </div>
          </div>
          <button onClick={() => navigate('/insights')} className="text-purple-500 text-sm font-medium">
            Learn More →
          </button>
        </div>
      </div>

      {/* Consult & Community */}
      <div className="px-6 mb-6 grid grid-cols-2 gap-4">
        <button 
          onClick={() => navigate('/consult')}
          className="bg-white rounded-2xl p-5 shadow-sm text-left"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
            <i className="ri-stethoscope-line text-blue-500 text-xl"></i>
          </div>
          <p className="font-semibold text-gray-800 mb-1">Consult</p>
          <p className="text-xs text-gray-500">Talk to experts</p>
        </button>
        <button 
          onClick={() => navigate('/community')}
          className="bg-white rounded-2xl p-5 shadow-sm text-left"
        >
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-3">
            <i className="ri-team-line text-pink-500 text-xl"></i>
          </div>
          <p className="font-semibold text-gray-800 mb-1">Community</p>
          <p className="text-xs text-gray-500">Connect & share</p>
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'home', icon: 'ri-home-5-fill', label: 'Home', path: '/home' },
            { id: 'track', icon: 'ri-heart-pulse-line', label: 'Track', path: '/track' },
            { id: 'consult', icon: 'ri-stethoscope-line', label: 'Consult', path: '/consult' },
            { id: 'community', icon: 'ri-team-line', label: 'Community', path: '/community' },
            { id: 'profile', icon: 'ri-user-line', label: 'Profile', path: '/profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                navigate(tab.path);
              }}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                activeTab === tab.id ? 'bg-purple-50' : ''
              }`}
            >
              <i className={`${tab.icon} text-xl mb-1 ${
                activeTab === tab.id ? 'text-purple-500' : 'text-gray-400'
              }`}></i>
              <span className={`text-[0.625rem] ${
                activeTab === tab.id ? 'text-purple-500 font-medium' : 'text-gray-500'
              }`}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
