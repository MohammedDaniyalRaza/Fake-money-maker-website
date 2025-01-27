import React, { useState } from 'react';
import { DollarSign, Wallet2, AlertCircle, X, ArrowLeft, Trophy, TrendingUp, ChevronRight, Users, Shield, Clock, LogOut } from 'lucide-react';
import { SignIn, SignedIn, SignedOut, useUser, useClerk } from '@clerk/clerk-react';

function App() {
  const [clicks, setClicks] = useState(0);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const { user } = useUser();
  const { signOut } = useClerk();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    paymentMethod: 'easypaisa',
    paymentNumber: ''
  });

  const handleClick = () => {
    setClicks(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowMessage(true);
  };

  const handlePaymentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setFormData({ ...formData, paymentNumber: value });
    }
  };

  const earnedAmount = clicks * 0.25;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <SignedOut>
        {!showSignIn ? (
          <div className="container mx-auto px-4 py-12">
            <nav className="flex justify-between items-center mb-16">
              <div className="text-2xl font-bold text-indigo-600">EarnPK</div>
              <button
                onClick={() => setShowSignIn(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Sign In
              </button>
            </nav>

            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Turn Your Free Time Into
                <span className="text-indigo-600"> Real Money</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of Pakistanis who are earning money online every day
              </p>
              <button
                onClick={() => setShowSignIn(true)}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Start Earning Now
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-indigo-600 mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">10,000+ Users</h3>
                <p className="text-gray-600">Join our growing community of earners across Pakistan</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-indigo-600 mb-4">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-600">Instant withdrawals to EasyPaisa and JazzCash</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-indigo-600 mb-4">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Daily Payouts</h3>
                <p className="text-gray-600">Withdraw your earnings every day, no minimum limit</p>
              </div>
            </div>

            <div className="text-center text-gray-600">
              Already earning with us?{" "}
              <button
                onClick={() => setShowSignIn(true)}
                className="text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Sign in to continue
              </button>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8 max-w-md">
            <button
              onClick={() => setShowSignIn(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
            <SignIn />
          </div>
        )}
      </SignedOut>

      <SignedIn>
        {!showMessage ? (
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-end mb-4">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName || 'User'}!</h1>
              <p className="text-gray-600">Start earning by clicking below</p>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-indigo-600">
                  PKR {earnedAmount.toFixed(2)}
                </div>
                <div className="text-gray-500">Available Balance</div>
              </div>

              <div className="flex justify-center mb-8">
                <button
                  onClick={handleClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-8 transition-all active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <DollarSign size={48} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="text-center text-gray-600 mb-2">
                  Progress: {clicks}/1000 clicks
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(clicks / 1000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-center text-sm text-indigo-600">
                  {1000 - clicks} more clicks to earn PKR 250
                </div>
              </div>
            </div>

            {clicks >= 1000 && !showWithdraw && (
              <div className="text-center">
                <button
                  onClick={() => setShowWithdraw(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl inline-flex items-center gap-2 shadow-lg text-lg font-semibold"
                >
                  <Wallet2 size={24} />
                  Withdraw PKR 250 Now
                </button>
              </div>
            )}

            {showWithdraw && (
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 relative">
                <button
                  onClick={() => setShowWithdraw(false)}
                  className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
                >
                  <ArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-center mb-6">Withdraw Your Earnings</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Payment Method</label>
                    <select
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    >
                      <option value="easypaisa">EasyPaisa</option>
                      <option value="jazzcash">JazzCash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      {formData.paymentMethod === 'easypaisa' ? 'EasyPaisa' : 'JazzCash'} Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX XXXXXXX"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.paymentNumber}
                      onChange={handlePaymentNumberChange}
                      pattern="[0-9]{11}"
                      maxLength={11}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
                  >
                    Withdraw PKR 250
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center relative">
              <button
                onClick={() => {
                  setShowMessage(false);
                  setShowWithdraw(false);
                  setClicks(0);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              <div className="mb-6 text-indigo-600">
                <AlertCircle size={48} className="mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Your Real Money Journey!</h2>
              <p className="text-gray-600 mb-6">
                Instead of clicking for small rewards, invest in skills that can earn you thousands of rupees daily:
              </p>
              <ul className="text-left text-gray-600 mb-6 space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span> Earn $500+ monthly on Fiverr/Upwork
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span> Learn Web Development (PKR 100,000+ monthly)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span> Digital Marketing (PKR 50,000+ monthly)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span> Content Creation (PKR 30,000+ monthly)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-indigo-600">•</span> Virtual Assistance (PKR 40,000+ monthly)
                </li>
              </ul>
              <p className="text-indigo-600 font-semibold">
                Your future starts with learning real skills!
              </p>
            </div>
          </div>
        )}
      </SignedIn>
    </div>
  );
}

export default App;