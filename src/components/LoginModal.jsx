import { useState } from "react";
import { X, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

export default function LoginModal({ isOpen, setIsOpen }) {
  const { login, signup, signInWithGoogle, isAuthenticated } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignup) {
        if (!formData.name || !formData.phone) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }
        await signup(formData.email, formData.password, formData.name, formData.phone);
      } else {
        if (!formData.email || !formData.password) {
          toast.error("Please fill in all fields");
          setLoading(false);
          return;
        }
        await login(formData.email, formData.password);
      }
      
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ email: "", password: "", name: "", phone: "" });
        setLoading(false);
      }, 1000);
    } catch (error) {
      // Error already handled by AuthContext toast
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      setTimeout(() => {
        setIsOpen(false);
        setGoogleLoading(false);
      }, 1000);
    } catch (error) {
      // Error already handled by AuthContext toast
      setGoogleLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative bg-gradient-to-b from-amber-900 to-amber-950 border border-amber-700/30 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in slide-in-from-bottom duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1 hover:bg-amber-800/50 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-amber-50" />
        </button>

        <h2 className="text-2xl font-bold text-amber-50 mb-6 text-center" style={{
          fontFamily: "'Fredoka', system-ui, sans-serif",
          fontWeight: 800,
        }}>
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full mb-4 py-3 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold rounded-xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300"
        >
          {googleLoading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-amber-700/30" />
          <span className="text-amber-400/50 text-sm">or</span>
          <div className="flex-1 h-px bg-amber-700/30" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="w-full pl-10 pr-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              className="w-full pl-10 pr-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password *"
              className="w-full pl-10 pr-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 transition-all"
            />
          </div>

          {isSignup && (
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone Number *"
                className="w-full pl-10 pr-4 py-3 bg-amber-900/50 border border-amber-700/50 rounded-lg text-amber-50 placeholder-amber-400/50 focus:outline-none focus:border-amber-500 transition-all"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : (isSignup ? "Create Account" : "Login")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-amber-50/70 text-sm mb-3">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </p>
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setFormData({ email: "", password: "", name: "", phone: "" });
            }}
            className="text-amber-300 hover:text-amber-200 font-semibold transition-colors"
          >
            {isSignup ? "Login Here" : "Sign Up Here"}
          </button>
        </div>

        {isAuthenticated && (
          <div className="mt-4 p-3 bg-green-900/30 border border-green-600/30 rounded-lg">
            <p className="text-green-300 text-sm text-center">✓ Successfully logged in!</p>
          </div>
        )}
      </div>
    </div>
  );
}