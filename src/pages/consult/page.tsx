import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ConsultMain() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'gynecologist' | 'endocrinologist' | 'nutritionist'>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'price'>('rating');

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Gynecologist',
      rating: 4.9,
      reviews: 234,
      experience: '15 years',
      price: 800,
      languages: ['English', 'Hindi'],
      nextAvailable: 'Today, 3:00 PM',
      image: 'https://readdy.ai/api/search-image?query=professional%20female%20doctor%20portrait%20smiling%20medical%20coat%20stethoscope%20clean%20white%20background%20realistic%20photography&width=80&height=80&seq=doc1&orientation=squarish'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Endocrinologist',
      rating: 4.8,
      reviews: 189,
      experience: '12 years',
      price: 1000,
      languages: ['English', 'Hindi', 'Marathi'],
      nextAvailable: 'Tomorrow, 10:00 AM',
      image: 'https://readdy.ai/api/search-image?query=professional%20indian%20female%20doctor%20portrait%20smiling%20medical%20coat%20clean%20white%20background%20realistic%20photography&width=80&height=80&seq=doc2&orientation=squarish'
    },
    {
      id: 3,
      name: 'Dr. Anjali Mehta',
      specialty: 'Nutritionist',
      rating: 4.7,
      reviews: 156,
      experience: '10 years',
      price: 600,
      languages: ['English', 'Hindi'],
      nextAvailable: 'Today, 5:00 PM',
      image: 'https://readdy.ai/api/search-image?query=professional%20nutritionist%20female%20doctor%20portrait%20smiling%20clean%20white%20background%20realistic%20photography&width=80&height=80&seq=doc3&orientation=squarish'
    },
    {
      id: 4,
      name: 'Dr. Kavita Reddy',
      specialty: 'Gynecologist',
      rating: 4.9,
      reviews: 298,
      experience: '18 years',
      price: 900,
      languages: ['English', 'Hindi', 'Telugu'],
      nextAvailable: 'Tomorrow, 2:00 PM',
      image: 'https://readdy.ai/api/search-image?query=professional%20senior%20female%20doctor%20portrait%20smiling%20medical%20coat%20clean%20white%20background%20realistic%20photography&width=80&height=80&seq=doc4&orientation=squarish'
    },
  ];

  const filteredDoctors = doctors
    .filter(doc => selectedFilter === 'all' || doc.specialty.toLowerCase() === selectedFilter)
    .sort((a, b) => sortBy === 'rating' ? b.rating - a.rating : a.price - b.price);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 px-6 pt-12 pb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Consult Experts</h1>
        <p className="text-blue-100 text-sm mb-6">Connect with PCOS specialists</p>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <i className="ri-search-line text-gray-400 text-xl"></i>
            <input
              type="text"
              placeholder="Search doctors..."
              className="flex-1 text-sm border-none focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pt-6">
        <div className="flex gap-2 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {[
            { id: 'all', label: 'All Specialists', icon: 'ri-stethoscope-line' },
            { id: 'gynecologist', label: 'Gynecologist', icon: 'ri-user-heart-line' },
            { id: 'endocrinologist', label: 'Endocrinologist', icon: 'ri-heart-pulse-line' },
            { id: 'nutritionist', label: 'Nutritionist', icon: 'ri-restaurant-line' },
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedFilter === filter.id 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              <i className={`${filter.icon} text-sm`}></i>
              <span className="text-sm font-medium">{filter.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">{filteredDoctors.length} doctors available</p>
          <button 
            onClick={() => setSortBy(sortBy === 'rating' ? 'price' : 'rating')}
            className="flex items-center gap-2 text-sm text-purple-500 font-medium"
          >
            <i className="ri-sort-desc"></i>
            Sort by {sortBy === 'rating' ? 'Price' : 'Rating'}
          </button>
        </div>

        <div className="space-y-4 pb-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex gap-4 mb-4">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-20 h-20 rounded-2xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-sm text-purple-500 mb-2">{doctor.specialty}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <i className="ri-star-fill text-yellow-400"></i>
                      {doctor.rating} ({doctor.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <i className="ri-briefcase-line"></i>
                      {doctor.experience}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{doctor.price}</p>
                  <p className="text-xs text-gray-500">per session</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
                <i className="ri-translate-2 text-gray-400 text-sm"></i>
                <p className="text-xs text-gray-600">{doctor.languages.join(', ')}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="ri-calendar-check-line text-green-500 text-sm"></i>
                  <span className="text-xs text-gray-600">{doctor.nextAvailable}</span>
                </div>
                <button 
                  onClick={() => navigate(`/doctor/${doctor.id}`)}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold rounded-xl"
                >
                  Book Now
                </button>
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
            { id: 'consult', icon: 'ri-stethoscope-fill', label: 'Consult', path: '/consult' },
            { id: 'community', icon: 'ri-team-line', label: 'Community', path: '/community' },
            { id: 'profile', icon: 'ri-user-line', label: 'Profile', path: '/profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                tab.id === 'consult' ? 'bg-purple-50' : ''
              }`}
            >
              <i className={`${tab.icon} text-xl mb-1 ${
                tab.id === 'consult' ? 'text-purple-500' : 'text-gray-400'
              }`}></i>
              <span className={`text-[0.625rem] ${
                tab.id === 'consult' ? 'text-purple-500 font-medium' : 'text-gray-500'
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
