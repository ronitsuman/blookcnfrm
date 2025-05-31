import { Link } from 'react-router-dom';
import { Mail, Phone, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* navbar section starts here  */}
      <Navbar />
      <main className="flex-grow bg-gray-50 text-gray-800">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">About BlookMySpace.ai</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              At BlookMySpace.ai, we redefine the value of every square foot, turning idle spaces into revenue-generating assets.
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="bg-[#D9D9F3]/30 rounded-lg p-8 shadow-sm">
              <p className="text-lg text-gray-700 mb-6">
                From café corners to society billboards, from retail shelves to gym walls — your space can generate effortless income. As India's first smart marketplace for space monetization, we connect space owners with brands seeking hyperlocal visibility.
              </p>
              <p className="text-lg text-gray-700">
                Our platform transforms underutilized spaces into opportunities for passive income while offering brands targeted, real-world exposure in high-footfall locations.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Mission</h2>
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700 text-center">
                To empower space owners across India to monetize their underutilized areas intelligently, while providing brands with affordable, hyperlocal consumer engagement opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Who We Serve</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#D9D9F3]/30 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Diverse Spaces</h3>
                <ul className="space-y-3 text-lg text-gray-700">
                  {[
                    'Cafés, Restaurants, and Cloud Kitchens',
                    'Clinics, Pharmacies, and Diagnostic Centers',
                    'Residential Societies and RWAs',
                    'Gyms, Salons, and Fitness Studios',
                    'Retail Stores, Showrooms, and Grocery Outlets',
                    'Co-working Spaces and Corporate Parks',
                    'Educational Institutions and Transport Hubs',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Untapped Potential</h3>
                <p className="text-lg text-gray-700">
                  If your space attracts visitors, it has untapped earning potential. We help you unlock it by connecting you with brands looking for high-visibility locations.
                </p>
                <div className="mt-6">
                  <Button asChild className="bg-[#4261FF] text-white hover:bg-[#6D4EFF]">
                    <Link to="/registration">List Your Space</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Unique Offerings Section */}
        <section className="py-12 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Unique Offerings</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Space Monetization Marketplace',
                  description: 'List your available spaces and earn passive income by partnering with India’s top brands for branding opportunities.',
                },
                {
                  title: 'Dynamic QR Campaigns with BlookPerks',
                  description: 'Engage visitors with smart QR codes for promotions, sampling, surveys, and rewards, powered by our BlookPerks system.',
                },
                {
                  title: 'Footfall Heat Mapping',
                  description: 'Utilize existing CCTV cameras to create real-time heat maps, enhancing your space’s value and attracting premium brand campaigns.',
                },
                {
                  title: 'BlookWorks Vendor Support',
                  description: 'Access verified vendors for printing, fabrication, and branding installations at competitive rates through BlookWorks.',
                },
                {
                  title: 'BlookForce Partner Network',
                  description: 'Join our freelance network as a BlookForce agent, onboard new spaces, and earn commissions in your city.',
                },
              ].map((offering, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{offering.title}</h3>
                  <p className="text-lg text-gray-700">{offering.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-12 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Why Choose BlookMySpace?</h2>
            <div className="bg-[#D9D9F3]/30 rounded-lg p-8 shadow-sm">
              <ul className="grid md:grid-cols-2 gap-4 text-lg text-gray-700">
                {[
                  { title: 'Zero Setup Cost', description: 'Start monetizing your space with no upfront fees.' },
                  { title: 'Direct Payouts', description: 'Receive earnings directly to your account.' },
                  { title: 'Real-time Tracking', description: 'Monitor campaign performance instantly.' },
                  { title: 'Customer Rewards', description: 'Offer perks to walk-in visitors via BlookPerks.' },
                  { title: 'Trusted Network', description: 'Join over 1,000 spaces across 16 cities in India.' },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5" />
                    <div>
                      <strong>{item.title}:</strong> {item.description}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 text-center mt-6">
                We blend cutting-edge technology, transparency, and trust to build India’s smartest space monetization ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-16 bg-[#4261FF] text-white">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Get Started with BlookMySpace</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Space Owners</h3>
                <p className="text-lg mb-4">List your space and start earning today.</p>
                <Button asChild variant="secondary" className="bg-[#6D4EFF] text-white hover:bg-[#4261FF]">
                  <Link to="/registration">List Your Space</Link>
                </Button>
              </div>
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Brands</h3>
                <p className="text-lg mb-4">Book spaces to amplify your hyperlocal reach.</p>
                <Button asChild variant="secondary" className="bg-[#6D4EFF] text-white hover:bg-[#4261FF]">
                  <Link to="/browse-spaces">Book Spaces</Link>
                </Button>
              </div>
              <div className="bg-white text-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">BlookForce Agents</h3>
                <p className="text-lg mb-4">Join our partner network and earn commissions.</p>
                <Button asChild variant="secondary" className="bg-[#6D4EFF] text-white hover:bg-[#4261FF]">
                  <Link to="/blookforce">Register Here</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white text-gray-800 rounded-lg p-6 shadow-sm max-w-md mx-auto">
              <p className="font-semibold text-lg mb-4">Contact Us</p>
              <div className="flex items-center gap-2 mb-3">
                <Mail size={20} className="text-[#4261FF]" />
                <a href="mailto:hello@blookmyspace.ai" className="text-[#4261FF] hover:underline">
                  hello@blookmyspace.ai
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-[#4261FF]" />
                <a href="tel:+918828034100" className="text-[#4261FF] hover:underline">
                  +91 8828034100
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;