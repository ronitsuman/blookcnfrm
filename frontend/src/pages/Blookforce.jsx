import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/Button";

const BlookForce = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen text-black placeholder:text-black flex flex-col">
      
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-[#6D4EFF] to-[#4261FF] text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Join BlookForce – Become a Partner Field Agent</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Earn money helping local businesses monetize their space! Join our network of field partners.
            </p>
          </div>
        </section>
        
        {/* How it Works */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How BlookForce Works</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Connecting line */}
                <div className="absolute left-16 top-0 bottom-0 w-1 bg-gray-200 hidden md:block"></div>
                
                <div className="space-y-12">
                  {/* Step 1 */}
                  <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    <div className="md:w-32 flex-shrink-0 flex md:justify-center z-10">
                      <div className="w-16 h-16 bg-[#4261FF] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        1
                      </div>
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-xl font-semibold mb-2">Sign Up & Get Trained</h3>
                      <p className="text-gray-700 mb-4">
                        Register as a BlookForce agent and receive your unique identification code.
                        Get access to our training materials and onboarding kit.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>You'll receive:</strong> Digital training deck, personalized referral code,
                          visiting cards, and access to our agent app.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    <div className="md:w-32 flex-shrink-0 flex md:justify-center z-10">
                      <div className="w-16 h-16 bg-[#4261FF] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        2
                      </div>
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-xl font-semibold mb-2">Visit & Onboard Businesses</h3>
                      <p className="text-gray-700 mb-4">
                        Identify potential spaces in your area that can be monetized. Visit these businesses,
                        explain the concept, and help them register on BlookMySpace.ai.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Target Businesses</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Local cafés and restaurants</li>
                            <li>• Retail shops and showrooms</li>
                            <li>• Residential societies</li>
                            <li>• Clinics and hospitals</li>
                            <li>• Gyms and salons</li>
                          </ul>
                        </div>
                        <div className="flex-1 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Your Responsibilities</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Take quality photos</li>
                            <li>• Collect accurate details</li>
                            <li>• Help with registration</li>
                            <li>• Explain the platform benefits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 3 */}
                  <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    <div className="md:w-32 flex-shrink-0 flex md:justify-center z-10">
                      <div className="w-16 h-16 bg-[#4261FF] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        3
                      </div>
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-xl font-semibold mb-2">Earn Commission</h3>
                      <p className="text-gray-700 mb-4">
                        Each space you onboard is tagged to your unique agent code. You earn commissions on
                        verified listings and successful brand collaborations.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Commission Structure:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-[#4261FF]">₹500 per verified listing</p>
                            <p className="text-gray-600">Paid when space is approved and goes live</p>
                          </div>
                          <div>
                            <p className="font-medium text-[#4261FF]">5% ongoing revenue share</p>
                            <p className="text-gray-600">From all brand collaborations for 6 months</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 4 */}
                  <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    <div className="md:w-32 flex-shrink-0 flex md:justify-center z-10">
                      <div className="w-16 h-16 bg-[#4261FF] rounded-full flex items-center justify-center text-white text-xl font-bold">
                        4
                      </div>
                    </div>
                    <div className="flex-grow pt-2">
                      <h3 className="text-xl font-semibold mb-2">Track & Grow</h3>
                      <p className="text-gray-700 mb-4">
                        Monitor your onboarded spaces and earnings through the agent dashboard. 
                        The more spaces you onboard, the more you earn.
                      </p>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Average earnings:</strong> Field agents typically earn ₹15,000-₹25,000 monthly by onboarding 
                          25-30 spaces and maintaining their portfolio.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Join BlookForce?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Flexible Earnings</h3>
                <p className="text-gray-700">
                  Work on your own schedule and earn based on your effort. The more spaces you onboard, the more you earn.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No Experience Needed</h3>
                <p className="text-gray-700">
                  We provide all the training and materials you need. Great opportunity for students, freelancers, or anyone looking for side income.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-[#D9D9F3] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#4261FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                <p className="text-gray-700">
                  Top-performing agents get opportunities to become team leads and area managers with additional incentives and bonuses.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Registration Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Ready to Join BlookForce?</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-8">
                <form className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none" 
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none" 
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none" 
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none" 
                        placeholder="Your city"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Occupation</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
                      <option value="">Select your occupation</option>
                      <option value="student">Student</option>
                      <option value="employed">Employed</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="business">Business Owner</option>
                      <option value="unemployed">Looking for Opportunities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Why do you want to join BlookForce?</label>
                    <textarea 
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none" 
                      rows={3}
                      placeholder="Tell us a bit about your interest in this role"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">How many hours per week can you dedicate?</label>
                    <select className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#4261FF] focus:outline-none">
                      <option value="">Select hours per week</option>
                      <option value="10-">Less than 10 hours</option>
                      <option value="10-20">10-20 hours</option>
                      <option value="20-30">20-30 hours</option>
                      <option value="30+">30+ hours (full time)</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 text-[#4261FF] border-gray-300 rounded focus:ring-[#4261FF]"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the Terms & Conditions and understand the commission structure
                    </label>
                  </div>
                  
                  <Button className="w-full bg-[#6D4EFF] hover:bg-[#4261FF]" size="lg">
                    Submit Application
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Agents Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Rahul Singh</h3>
                    <p className="text-sm text-gray-500">BlookForce Agent, Delhi</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I joined BlookForce while in my final year of college. In just 3 months, I've onboarded 40+ spaces
                  and earn a consistent ₹20,000 monthly income working part-time."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Priya Sharma</h3>
                    <p className="text-sm text-gray-500">BlookForce Team Lead, Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I started as a part-time agent and now lead a team of 5. The recurring commission model is great
                  as I still earn from spaces I onboarded months ago."
                </p>
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
                <h3 className="text-xl font-semibold mb-2">How soon will I start earning?</h3>
                <p className="text-gray-700">
                  You can start earning as soon as your first space gets verified, typically within 48-72 hours after submission.
                  Commission payouts are processed between the 1st and 5th of every month.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Do I need my own transportation?</h3>
                <p className="text-gray-700">
                  Yes, you should have your own means of transportation to visit spaces in your assigned area.
                  We do provide transportation allowance for agents who onboard more than 15 spaces per month.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">What support will I receive?</h3>
                <p className="text-gray-700">
                  You'll receive comprehensive training, marketing materials, a personalized agent code, and access to our agent app.
                  We also have a dedicated support team and weekly check-in calls to help you succeed.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Is this a full-time job?</h3>
                <p className="text-gray-700">
                  It can be either part-time or full-time depending on your availability. Many of our agents start part-time
                  and transition to full-time as they see the earning potential.
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

export default BlookForce;
