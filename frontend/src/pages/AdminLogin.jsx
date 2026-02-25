import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { schoolInfo } from '../mock';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple authentication - In production, use proper backend authentication
    // Default credentials: username: admin, password: reyansh@123
    if (credentials.username === 'admin' && credentials.password === 'reyansh@123') {
      // Store auth token
      localStorage.setItem('adminAuth', 'authenticated');
      localStorage.setItem('adminLoginTime', new Date().getTime().toString());
      toast.success('Login successful!');
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 500);
    } else {
      toast.error('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img 
              src={schoolInfo.logo} 
              alt={schoolInfo.name}
              className="h-20 w-20 bg-white rounded-full p-2 shadow-xl"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{schoolInfo.name}</h1>
          <p className="text-blue-100">Admin Portal Login</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-full">
                <Lock size={32} className="text-blue-600" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="mt-2"
                  placeholder="Enter your username"
                  autoComplete="username"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white btn-hover py-6 text-lg"
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 font-medium">Default Login Credentials:</p>
              <p className="text-xs text-yellow-700 mt-1">Username: <span className="font-mono font-bold">admin</span></p>
              <p className="text-xs text-yellow-700">Password: <span className="font-mono font-bold">reyansh@123</span></p>
              <p className="text-xs text-yellow-600 mt-2 italic">Please change these credentials after first login</p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Website */}
        <div className="text-center mt-6">
          <a href="/" className="text-white hover:text-blue-200 transition-colors">
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
