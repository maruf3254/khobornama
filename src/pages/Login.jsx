// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useAuth } from '../context/AuthContext';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const user = await login(email, password);
//       toast.success('Login successful!');
      
//       if (user.role === 'admin') {
//         navigate('/admin');
//       } else {
//         navigate('/');
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-[70vh] flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <h1 className="text-3xl font-bold text-center mb-8">Login</h1>
        
//         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md">
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
          
//           <div className="mb-6">
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

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>

//           <p className="text-center mt-4 text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/register" className="text-primary-600 hover:underline">
//               Register
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const user = await login(email, password);

      toast.success('Login successful!');

      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'advertiser') {
        navigate('/advertiser');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] bg-[#E4E1DC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[460px]">

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
            Welcome Back
          </h1>

          <p className="text-[#66645F] mt-2 text-sm">
            Login to your Khobornama account.
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#F8F7F4] p-6 sm:p-9 rounded-2xl shadow-[0_8px_35px_rgba(32,32,32,0.08)] border border-[#D8D5CF]"
        >

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
          <div className="mb-6">
            <label className="block text-sm font-semibold text-[#202020] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-3 pr-12 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#77746E] hover:text-[#34483C] transition"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3l18 18M10.58 10.59a2 2 0 002.83 2.83M9.88 5.09A10.8 10.8 0 0112 4.9c5.5 0 9.5 7.1 9.5 7.1a17.3 17.3 0 01-3.1 3.7M6.2 6.2C3.8 7.9 2.5 12 2.5 12s4 7.1 9.5 7.1c1.2 0 2.3-.3 3.3-.7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.5 12s4-7.1 9.5-7.1 9.5 7.1 9.5 7.1-4 7.1-9.5 7.1S2.5 12 2.5 12z"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      strokeWidth="1.7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#34483C] text-white rounded-lg font-semibold hover:bg-[#293B31] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login to Account'}
          </button>

          {/* Register */}
          <p className="text-center mt-6 text-sm text-[#77746E]">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold text-[#34483C] hover:underline"
            >
              Create Account
            </Link>
          </p>

        </form>

        {/* Footer */}
        <p className="text-center text-xs text-[#77746E] mt-6">
          © {new Date().getFullYear()} খবরনামা. All rights reserved.
        </p>

      </div>
    </div>
  );
};

export default Login;
