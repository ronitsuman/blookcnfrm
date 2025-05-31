import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';

const HeatMapping = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen text-black placeholder:text-black flex flex-col">
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-[#6D4EFF] to-[#4261FF] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-bold mb-4">See What The Eye Misses</h1>
                <p className="text-xl mb-6">
                  Coming September 2023 – Turn your existing CCTV cameras into powerful analytics tools.
                </p>
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <p className="text-base">
                    <span className="font-semibold">🔐 Privacy First:</span> We never store your CCTV footage. All processing happens on the edge, protecting your customer's privacy.
                  </p>
                </div>
                <Button variant="secondary" size="lg">
                  Get Early Access
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="aspect-video bg-gray-900 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/30">
                      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-red-500 blur-xl opacity-70"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-orange-500 blur-xl opacity-60"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-yellow-500 blur-xl opacity-50"></div>
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-white/80 bg-black/50 px-2 py-1 rounded">
                      Sample Heat Map Visualization
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is Heat Mapping */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What is Heat Mapping?</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                Using your existing CCTV cameras, we'll show which parts of your venue get the most attention.
                Our technology analyzes movement patterns and dwell times to create visual heat maps that
                highlight the most valuable areas of your space.
              </p>
              <div className="bg-gray-100 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                <ol className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6D4EFF] text-white flex items-center justify-center font-bold mr-4">1</div>
                    <div>
                      <h4 className="font-semibold">Connect Your Camera</h4>
                      <p className="text-gray-700">We connect to your existing CCTV system – no new hardware required.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6D4EFF] text-white flex items-center justify-center font-bold mr-4">2</div>
                    <div>
                      <h4 className="font-semibold">Anonymous Analysis</h4>
                      <p className="text-gray-700">Our system tracks movement patterns without storing faces or identifying information.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6D4EFF] text-white flex items-center justify-center font-bold mr-4">3</div>
                    <div>
                      <h4 className="font-semibold">Generate Insights</h4>
                      <p className="text-gray-700">We create visual heat maps and detailed analytics of your space's most valuable areas.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-[#6D4EFF] text-white flex items-center justify-center font-bold mr-4">4</div>
                    <div>
                      <h4 className="font-semibold">Optimize Spaces</h4>
                      <p className="text-gray-700">Use the data to place branding in high-visibility areas and charge premium rates.</p>
                    </div>
                  </li>
                </ol>
              </div>
              <div className="bg-[#D9D9F3] rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Benefits of Heat Mapping</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Know where to place branding for maximum visibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Get detailed footfall patterns (entry, dwell, exit)</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Improve pricing by showing real engagement</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Identify prime customer interaction zones</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Use data to optimize your space layout</span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Validate advertising value with real data</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Free Trial Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get a Free 1-Month Trial</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              We're offering a free one-month trial of our heat mapping technology to verified space owners.
              No risk. No data stored. All analysis done on the edge.
            </p>
            <div className="bg-white rounded-lg shadow-md max-w-2xl mx-auto p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                      placeholder="Your Business"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type of Space</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                  >
                    <option value="">Select your space type</option>
                    <option value="retail">Retail Store</option>
                    <option value="restaurant">Restaurant/Café</option>
                    <option value="society">Residential Society</option>
                    <option value="office">Office Space</option>
                    <option value="clinic">Clinic/Hospital</option>
                    <option value="gym">Gym/Salon</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How many CCTV cameras do you have?</label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none"
                    placeholder="Enter number"
                    min="1"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      type="checkbox"
                      className="h-4 w-4 text-[#4261FF] border-gray-300 rounded focus:ring-[#4261FF]"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="text-gray-700">
                      I understand that no video footage is stored and data is processed for analytics purposes only
                    </label>
                  </div>
                </div>
                <Button className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]" size="lg">
                  Sign Up for Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Do you store my CCTV data?</h3>
                <p className="text-gray-700">
                  No. We process footage temporarily for visual analytics only. No video is stored on our servers, and all processing happens at the edge to ensure privacy and data security.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">What kind of cameras do I need?</h3>
                <p className="text-gray-700">
                  Most standard CCTV cameras work with our system. During setup, our team will check compatibility with your existing equipment.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">What happens after the free trial?</h3>
                <p className="text-gray-700">
                  After your 1-month trial, you can choose to continue with our heat mapping service for a small monthly fee, or simply discontinue. No obligation and no automatic renewal.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Is this compliant with privacy laws?</h3>
                <p className="text-gray-700">
                  Yes. Our system uses anonymized movement data and doesn't identify individuals. It complies with privacy regulations as no personal data is collected or stored.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default HeatMapping;