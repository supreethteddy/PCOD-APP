import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CommunityMain() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'challenges'>('feed');

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Community</h1>
          <button 
            onClick={() => navigate('/post-composer')}
            className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center"
          >
            <i className="ri-add-line text-white text-xl"></i>
          </button>
        </div>

        <div className="flex gap-2">
          {[
            { id: 'feed', label: 'Feed', icon: 'ri-article-line' },
            { id: 'groups', label: 'Groups', icon: 'ri-team-line' },
            { id: 'challenges', label: 'Challenges', icon: 'ri-trophy-line' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
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
        {activeTab === 'feed' && <FeedTab />}
        {activeTab === 'groups' && <GroupsTab />}
        {activeTab === 'challenges' && <ChallengesTab />}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2">
        <div className="grid grid-cols-5 gap-1">
          {[
            { id: 'home', icon: 'ri-home-5-line', label: 'Home', path: '/home' },
            { id: 'track', icon: 'ri-heart-pulse-line', label: 'Track', path: '/track' },
            { id: 'consult', icon: 'ri-stethoscope-line', label: 'Consult', path: '/consult' },
            { id: 'community', icon: 'ri-team-fill', label: 'Community', path: '/community' },
            { id: 'profile', icon: 'ri-user-line', label: 'Profile', path: '/profile' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all ${
                tab.id === 'community' ? 'bg-purple-50' : ''
              }`}
            >
              <i className={`${tab.icon} text-xl mb-1 ${
                tab.id === 'community' ? 'text-purple-500' : 'text-gray-400'
              }`}></i>
              <span className={`text-[0.625rem] ${
                tab.id === 'community' ? 'text-purple-500 font-medium' : 'text-gray-500'
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

function FeedTab() {
  const posts = [
    {
      id: 1,
      author: 'Priya M.',
      avatar: 'https://readdy.ai/api/search-image?query=young%20indian%20woman%20smiling%20portrait%20clean%20white%20background%20realistic%20photography&width=50&height=50&seq=user1&orientation=squarish',
      time: '2 hours ago',
      content: 'Just completed my first month of following the low-GI diet plan! Lost 3kg and feeling so much more energetic. The sugar cravings have reduced significantly. Thank you to this amazing community for the support! 💪',
      likes: 124,
      comments: 18,
      image: 'https://readdy.ai/api/search-image?query=healthy%20low%20glycemic%20meal%20prep%20bowls%20colorful%20vegetables%20quinoa%20clean%20background%20food%20photography&width=350&height=200&seq=post1&orientation=landscape'
    },
    {
      id: 2,
      author: 'Anjali K.',
      avatar: 'https://readdy.ai/api/search-image?query=indian%20woman%20smiling%20portrait%20clean%20white%20background%20realistic%20photography&width=50&height=50&seq=user2&orientation=squarish',
      time: '5 hours ago',
      content: 'Does anyone else struggle with irregular cycles even after lifestyle changes? I\'ve been exercising regularly and eating clean for 3 months now. Would love to hear your experiences.',
      likes: 89,
      comments: 34,
    },
    {
      id: 3,
      author: 'Sneha R.',
      avatar: 'https://readdy.ai/api/search-image?query=young%20woman%20smiling%20portrait%20clean%20white%20background%20realistic%20photography&width=50&height=50&seq=user3&orientation=squarish',
      time: '1 day ago',
      content: 'Morning yoga has been a game changer for me! Started with just 10 minutes and now doing 30 minutes daily. My stress levels are so much better and sleep quality improved too 🧘‍♀️',
      likes: 156,
      comments: 23,
      image: 'https://readdy.ai/api/search-image?query=woman%20doing%20yoga%20meditation%20peaceful%20morning%20light%20soft%20pastel%20background%20wellness%20photography&width=350&height=200&seq=post2&orientation=landscape'
    },
  ];

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post.id} className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{post.author}</p>
              <p className="text-xs text-gray-500">{post.time}</p>
            </div>
            <button className="w-8 h-8 flex items-center justify-center">
              <i className="ri-more-2-fill text-gray-400"></i>
            </button>
          </div>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{post.content}</p>

          {post.image && (
            <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-xl mb-4" />
          )}

          <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
              <i className="ri-heart-line text-lg"></i>
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-purple-500 transition-colors">
              <i className="ri-chat-3-line text-lg"></i>
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors ml-auto">
              <i className="ri-share-line text-lg"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function GroupsTab() {
  const groups = [
    {
      id: 1,
      name: 'PCOS Warriors India',
      members: 12453,
      posts: 234,
      image: 'https://readdy.ai/api/search-image?query=group%20of%20diverse%20women%20supporting%20each%20other%20wellness%20community%20soft%20pastel%20background%20illustration&width=80&height=80&seq=group1&orientation=squarish',
      description: 'A supportive community for Indian women managing PCOS',
      joined: true
    },
    {
      id: 2,
      name: 'Low-GI Recipe Exchange',
      members: 8921,
      posts: 567,
      image: 'https://readdy.ai/api/search-image?query=healthy%20food%20cooking%20recipe%20book%20colorful%20vegetables%20illustration%20soft%20background&width=80&height=80&seq=group2&orientation=squarish',
      description: 'Share and discover PCOS-friendly recipes',
      joined: false
    },
    {
      id: 3,
      name: 'Fitness for PCOS',
      members: 15678,
      posts: 892,
      image: 'https://readdy.ai/api/search-image?query=women%20exercising%20yoga%20fitness%20wellness%20illustration%20soft%20pastel%20background&width=80&height=80&seq=group3&orientation=squarish',
      description: 'Workout tips and motivation for PCOS management',
      joined: true
    },
  ];

  return (
    <div className="space-y-4">
      {groups.map(group => (
        <div key={group.id} className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex gap-4 mb-4">
            <img src={group.image} alt={group.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 mb-1">{group.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{group.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <i className="ri-group-line"></i>
                  {group.members.toLocaleString()} members
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-article-line"></i>
                  {group.posts} posts
                </span>
              </div>
            </div>
          </div>
          <button className={`w-full py-3 rounded-xl font-semibold text-sm ${
            group.joined 
              ? 'bg-gray-100 text-gray-700' 
              : 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
          }`}>
            {group.joined ? 'Joined' : 'Join Group'}
          </button>
        </div>
      ))}
    </div>
  );
}

function ChallengesTab() {
  const challenges = [
    {
      id: 1,
      title: '30-Day Water Challenge',
      description: 'Drink 8 glasses of water daily for 30 days',
      participants: 2341,
      daysLeft: 12,
      progress: 60,
      icon: 'ri-drop-fill',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: 2,
      title: 'Sugar-Free February',
      description: 'Eliminate added sugars for the entire month',
      participants: 1876,
      daysLeft: 18,
      progress: 40,
      icon: 'ri-cake-3-line',
      color: 'from-pink-400 to-rose-500'
    },
    {
      id: 3,
      title: 'Daily Movement Challenge',
      description: '30 minutes of exercise every day',
      participants: 3124,
      daysLeft: 8,
      progress: 73,
      icon: 'ri-run-line',
      color: 'from-purple-400 to-indigo-500'
    },
  ];

  return (
    <div className="space-y-4">
      {challenges.map(challenge => (
        <div key={challenge.id} className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-14 bg-gradient-to-br ${challenge.color} rounded-2xl flex items-center justify-center`}>
              <i className={`${challenge.icon} text-2xl text-white`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 mb-1">{challenge.title}</h3>
              <p className="text-xs text-gray-500 mb-2">{challenge.description}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <i className="ri-group-line"></i>
                  {challenge.participants.toLocaleString()} joined
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i>
                  {challenge.daysLeft} days left
                </span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">Your Progress</span>
              <span className="text-xs font-semibold text-purple-500">{challenge.progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${challenge.color} transition-all`}
                style={{ width: `${challenge.progress}%` }}
              ></div>
            </div>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-semibold text-sm">
            View Challenge
          </button>
        </div>
      ))}
    </div>
  );
}
