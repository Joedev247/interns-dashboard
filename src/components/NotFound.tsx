import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, ArrowLeft, MoveLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-violet-600 opacity-10">
                <div className="absolute inset-0" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12">
                <div className="text-center">
                  {/* 404 Text */}
                  <h1 className="text-8xl md:text-9xl font-bold text-violet-600 animate-bounce">
                    404
                  </h1>
                  
                  {/* Message */}
                  <div className="mt-6 space-y-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                      Oops! Page Not Found
                    </h2>
                    <p className="text-gray-600">
                      The page you're looking for doesn't exist or has been moved.
                    </p>
                  </div>

                  {/* Countdown */}
                  <div className="mt-6 text-gray-600">
                    Redirecting to home in{' '}
                    <span className="text-violet-600 font-semibold">{countdown}</span> seconds
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="inline-flex items-center justify-center px-6 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200 space-x-2 group"
                    >
                      <Home className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Go Home</span>
                    </button>
                    
                    <button
                      onClick={() => navigate(-1)}
                      className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 space-x-2 group"
                    >
                      <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform duration-200" />
                      <span>Go Back</span>
                    </button>
                    
                    <button
                      onClick={() => navigate('/products')}
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 space-x-2 group"
                    >
                      <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>Continue Shopping</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fun Elements */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600">
              <MoveLeft className="w-5 h-5 animate-pulse" />
              <span>Lost in the digital aisle? Let's help you find your way!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
