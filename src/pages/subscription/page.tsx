import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionPrompt() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'monthly' | 'yearly'>('yearly');
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '₹0',
      period: 'forever',
      features: ['Basic symptom tracking', 'Period calendar', 'Community access', 'Limited insights'],
      notIncluded: ['Personalized meal plans', 'Workout routines', 'Expert consultations', 'AI recommendations']
    },
    {
      id: 'monthly',
      name: 'Premium Monthly',
      price: '₹299',
      period: '/month',
      features: ['Everything in Free', 'Personalized meal plans', 'Custom workout routines', 'AI-powered insights', 'Priority support'],
      popular: false
    },
    {
      id: 'yearly',
      name: 'Premium Yearly',
      price: '₹1,999',
      period: '/year',
      originalPrice: '₹3,588',
      savings: 'Save 44%',
      features: ['Everything in Monthly', '2 Free consultations', 'Exclusive content', 'Early access to features'],
      popular: true
    }
  ];

  const handleSubscribe = () => {
    if (selectedPlan === 'free') {
      navigate('/home');
    } else {
      setShowPaymentSheet(true);
    }
  };

  const handlePayment = () => {
    setShowPaymentSheet(false);
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center">
          <i className="ri-arrow-left-line text-xl text-gray-700"></i>
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Choose Your Plan</h1>
      </div>

      <div className="flex-1 px-6 pt-4 pb-6 overflow-auto">
        <p className="text-gray-500 text-sm mb-6">Start your 7-day free trial. Cancel anytime.</p>

        <div className="space-y-4">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id as 'free' | 'monthly' | 'yearly')}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative ${
                selectedPlan === plan.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-100 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-4 px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full">
                  <span className="text-xs text-white font-medium">Most Popular</span>
                </div>
              )}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400 line-through">{plan.originalPrice}</span>
                      <span className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">{plan.savings}</span>
                    </div>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                }`}>
                  {selectedPlan === plan.id && <i className="ri-check-line text-white text-sm"></i>}
                </div>
              </div>
              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <i className="ri-check-line text-green-500 text-sm"></i>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
                {plan.notIncluded?.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <i className="ri-close-line text-gray-300 text-sm"></i>
                    <span className="text-sm text-gray-400">{feature}</span>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 bg-white border-t border-gray-100">
        <button 
          onClick={handleSubscribe}
          className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200"
        >
          {selectedPlan === 'free' ? 'Continue with Free' : 'Start Free Trial'}
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          By subscribing, you agree to our Terms of Service
        </p>
      </div>

      {showPaymentSheet && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50" onClick={() => setShowPaymentSheet(false)}>
          <div className="bg-white w-full rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold mb-6">Payment Method</h3>

            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${paymentMethod === 'card' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
              >
                <i className="ri-bank-card-line mr-2"></i>Card
              </button>
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${paymentMethod === 'upi' ? 'bg-white shadow text-gray-800' : 'text-gray-500'}`}
              >
                <i className="ri-smartphone-line mr-2"></i>UPI
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">UPI ID</label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  className="w-full px-4 py-3.5 bg-gray-50 rounded-xl text-sm border-none focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Plan</span>
                <span className="font-medium">{selectedPlan === 'yearly' ? 'Premium Yearly' : 'Premium Monthly'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-lg">{selectedPlan === 'yearly' ? '₹1,999' : '₹299'}</span>
              </div>
            </div>

            <button 
              onClick={handlePayment}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-2xl mt-6"
            >
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
