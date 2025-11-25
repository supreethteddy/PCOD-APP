import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+91 98765 43210',
    joinedDate: 'January 2025',
    avatar: 'https://readdy.ai/api/search-image?query=young%20woman%20smiling%20portrait%20professional%20clean%20white%20background%20realistic%20photography&width=100&height=100&seq=profile1&orientation=squarish'
  };

  const stats = [
    { label: 'Streak', value: '12 days', icon: 'ri-fire-fill', color: 'text-orange-500' },
    { label: 'Health Score', value: '78', icon: 'ri-heart-pulse-fill', color: 'text-pink-500' },
    { label: 'Consultations', value: '3', icon: 'ri-stethoscope-fill', color: 'text-blue-500' },
  ];

  const menuSections = [
    {
      title: 'Health Profile',
      items: [
        { icon: 'ri-user-line', label: 'Personal Information', path: '/edit-profile', color: 'bg-purple-100 text-purple-500' },
        { icon: 'ri-heart-pulse-line', label: 'Medical History', path: '/medical-history', color: 'bg-pink-100 text-pink-500' },
        { icon: 'ri-file-list-line', label: 'Test Reports', path: '/reports', color: 'bg-blue-100 text-blue-500' },
      ]
    },
    {
      title: 'Subscription & Payments',
      items: [
        { icon: 'ri-vip-crown-line', label: 'Subscription Plan', path: '/subscription-manage', color: 'bg-yellow-100 text-yellow-600' },
        { icon: 'ri-wallet-line', label: 'Payment History', path: '/payments', color: 'bg-green-100 text-green-500' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'ri-question-line', label: 'Help & FAQ', path: '/help', color: 'bg-indigo-100 text-indigo-500' },
        { icon: 'ri-customer-service-line', label: 'Contact Support', path: '/support', color: 'bg-cyan-100 text-cyan-500' },
        { icon: 'ri-feedback-line', label: 'Send Feedback', path: '/feedback', color: 'bg-teal-100 text-teal-500' },
      ]
    },
    {
      title: 'Settings',
      items: [
        { icon: 'ri-notification-line', label: 'Notifications', path: '/notifications-settings', color: 'bg-orange-100 text-orange-500' },
        { icon: 'ri-lock-line', label: 'Privacy & Security', path: '/privacy', color: 'bg-red-100 text-red-500' },
        { icon: 'ri-global-line', label: 'Language', path: '/language', color: 'bg-blue-100 text-blue-500' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-pink-500 to-purple-600 px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i className="ri-settings-3-line text-white text-xl"></i>
          </button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover border-4 border-white/30" />
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
            <p className="text-pink-100 text-sm">{user.email}</p>
            <p className="text-pink-100 text-xs mt-1">Member since {user.joinedDate}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
              <i className={`${stat.icon} text-2xl text-white mb-1`}></i>
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-pink-100 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-6 pb-6">
        {menuSections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 px-2">{section.title}</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, itemIdx) => (
                <button
                  key={itemIdx}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-4 p-4 ${
                    itemIdx !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center`}>
                    <i className={`${item.icon} text-lg`}></i>
                  </div>
                  <span className="flex-1 text-left font-medium text-gray-800">{item.label}</span>
                  <i className="ri-arrow-right-s-line text-gray-400 text-xl"></i>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full py-4 bg-white rounded-2xl shadow-sm text-red-500 font-semibold flex items-center justify-center gap-2">
          <i className="ri-logout-box-line text-xl"></i>
          Logout
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'home', icon: 'ri-home-5-line', label: 'Home', path: '/home' },
            { id: 'track', icon: 'ri-heart-pulse-line', label: 'Track', path: '/track' },
            { id: 'consult', icon: 'ri-stethoscope-line', label: 'Consult', path: '/consult' },
            { id: 'community', icon: 'ri-team-line', label: 'Community', path: '/community' },
            { id: 'profile', icon: 'ri-user-fill', label: 'Profile', path: '/profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                tab.id === 'profile' ? 'bg-purple-50' : ''
              }`}
            >
              <i className={`${tab.icon} text-xl mb-1 ${
                tab.id === 'profile' ? 'text-purple-500' : 'text-gray-400'
              }`}></i>
              <span className={`text-[0.625rem] ${
                tab.id === 'profile' ? 'text-purple-500 font-medium' : 'text-gray-500'
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
