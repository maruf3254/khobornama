// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuth } from '../context/AuthContext';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     setLoading(true);

//     try {
//       await register(name, email, password);
//       toast.success('Registration successful!');
//       navigate('/');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-medium mb-2">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
//           >
//             {loading ? 'Creating account...' : 'Register'}
//           </button>

//           <p className="text-center mt-4 text-gray-600">
//             Already have an account?{' '}
//             <Link to="/login" className="text-primary-600 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password, role);

      toast.success(
        role === 'advertiser'
          ? 'Advertiser account created successfully!'
          : 'Account created successfully!'
      );

      navigate('/');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#E4E1DC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[480px]">

        {/* Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <img
              src="https://i.imgur.com/Xkp2QhW.png"
              alt="খবরনামা"
              className="h-14 w-auto mx-auto object-contain"
            />
          </Link>

          <h1 className="text-3xl font-bold text-[#202020] mt-5">
            Create Your Account
          </h1>

          <p className="text-[#66645F] mt-2 text-sm">
            Join Khobornama and stay connected with the news.
          </p>
        </div>

        {/* Register Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#F8F7F4] p-6 sm:p-9 rounded-2xl shadow-[0_8px_35px_rgba(32,32,32,0.08)] border border-[#D8D5CF]"
        >

          {/* Account Type */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#202020] mb-3">
              Choose Account Type
            </label>

            <div className="grid grid-cols-2 gap-3">

              {/* Reader */}
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  role === 'user'
                    ? 'border-[#34483C] bg-[#34483C]/[0.07] ring-1 ring-[#34483C]'
                    : 'border-[#D8D5CF] hover:border-[#34483C]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <svg
                    className="w-6 h-6 text-[#34483C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11a4 4 0 100-8 4 4 0 000 8zM4 21v-2a8 8 0 0116 0v2H4z"
                    />
                  </svg>

                  {role === 'user' && (
                    <span className="w-5 h-5 rounded-full bg-[#34483C] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-[#202020] text-sm">
                  Reader
                </h3>

                <p className="text-xs text-[#77746E] mt-1 leading-relaxed">
                  Read news and join discussions.
                </p>
              </button>

              {/* Advertiser */}
              <button
                type="button"
                onClick={() => setRole('advertiser')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  role === 'advertiser'
                    ? 'border-[#34483C] bg-[#34483C]/[0.07] ring-1 ring-[#34483C]'
                    : 'border-[#D8D5CF] hover:border-[#34483C]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <svg
                    className="w-6 h-6 text-[#34483C]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 11v2a1 1 0 001 1h2l3 6h2l-2-6h3l7 4V6l-7 4H4a1 1 0 00-1 1z"
                    />
                  </svg>

                  {role === 'advertiser' && (
                    <span className="w-5 h-5 rounded-full bg-[#34483C] text-white flex items-center justify-center text-xs">
                      ✓
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-[#202020] text-sm">
                  Advertiser
                </h3>

                <p className="text-xs text-[#77746E] mt-1 leading-relaxed">
                  Promote your brand and products.
                </p>
              </button>

            </div>
          </div>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#202020] mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              className="w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#202020] mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              autoComplete="email"
              className="w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-[#202020] mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#202020] mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              className="w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition"
              required
            />
          </div>

          {/* Account Type Information */}
          {role === 'advertiser' && (
            <div className="mb-5 p-3 rounded-lg bg-[#34483C]/[0.07] border border-[#34483C]/20">
              <p className="text-xs text-[#34483C] leading-relaxed">
                <strong>Advertiser Account:</strong> After registration,
                you can access your advertiser dashboard and submit
                advertisements for admin approval.
              </p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#34483C] text-white rounded-lg font-semibold hover:bg-[#293B31] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Creating account...'
              : role === 'advertiser'
                ? 'Create Advertiser Account'
                : 'Create Account'}
          </button>

          {/* Login */}
          <p className="text-center mt-6 text-sm text-[#77746E]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#34483C] hover:underline"
            >
              Login
            </Link>
          </p>

        </form>

        <p className="text-center text-xs text-[#77746E] mt-6">
          © {new Date().getFullYear()} খবরনামা. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Register;
