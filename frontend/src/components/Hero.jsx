import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-white to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              <span className="text-blue-600">Turn Your Space</span> Into a Revenue Magnet!
            </h1>
            <p className="text-xl mb-6 text-gray-700">
              Whether it's a café corner, store aisle, or society wall — monetize unused space effortlessly with BlookMySpace.ai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/registration" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 text-white bg-indigo-500 hover:bg-blue-600 rounded-lg transition">
                  📝 Get a Free Field Visit Now
                </button>
              </a>
              <a href="/how-it-works" className="w-full sm:w-auto">
                <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Learn How It Works
                </button>
              </a>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="bg-green-100 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  Join 1000+ businesses earning ₹5,000–₹50,000/month from underutilized space.
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="bg-green-100 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  No upfront fees. No hassle. Just direct payments and visibility.
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Video + QR Code */}
          <div className="relative">
            <div className="bg-blue-600 rounded-lg shadow-xl p-1 md:p-2">
              <div className="relative pt-[56.25%] bg-gray-200 rounded overflow-hidden">
                {/* Video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            {/* QR Code */}
            <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg hidden md:block">
              <div className="w-34 h-34 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                <img 
                  src="/qrform.png"  
                  alt="google lead generation form"
                  width={144}
                  height={34}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;