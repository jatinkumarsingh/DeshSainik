import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import axios from 'axios'; // to call backend api

if (import.meta.env.PROD) {
  axios.defaults.baseURL = 'https://deshsainik.onrender.com';
}

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.mode === 'signup') {
      setIsSignIn(false);
    } else if (location.state?.mode === 'signin') {
      setIsSignIn(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isSignIn) {
      if (!formData.name) newErrors.name = 'Name is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const endpoint = isSignIn ? '/api/auth/login' : '/api/auth/signup';
        const payload = isSignIn
          ? { email: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password, name: formData.name };

        const response = await axios.post(endpoint, payload);

        if (response.status === 200 || response.status === 201) {
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        const errorMessage = error.response?.data?.message || 'An error occurred during authentication';
        setErrors({ general: errorMessage });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center px-4">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/mg.mp4"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4B5320]/60 via-[#556B2F]/60 to-[#6B8E23]/60" />
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-white/80">
            {isSignIn ? 'Welcome back!' : 'Join DeshSainik today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isSignIn && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          {!isSignIn && (
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-blue-900 font-semibold py-3 px-4 rounded-lg transition duration-200"
            disabled={false} // You can add loading state if needed
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {errors.general && <p className="text-red-400 text-sm mt-4 text-center">{errors.general}</p>}

        <div className="text-center mt-6">
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-white/80 hover:text-white text-sm"
          >
            {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-300 text-sm underline"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default Auth;
