import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { Button } from '../components/ui/Button';
import Navbar from '../components/Navbar';

// Industry data
const industries = [
  {
    name: "Retail/Showrooms",
    spaceName: "Store",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    description: "Retail spaces have multiple high-visibility areas that can generate additional revenue without affecting the customer experience.",
    brandingAreas: [
      "Entry standees and display windows",
      "Checkout counters and billing areas",
      "In-store wall spaces and shelving",
      "Digital displays and screens",
      "Shopping bags and packaging"
    ]
  },
  {
    name: "Restaurants/Cafes",
    spaceName: "Restaurant",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    description: "Food establishments have captive audiences with longer dwell times, making them perfect for brand partnerships.",
    brandingAreas: [
      "Menu card advertising",
      "Table tent cards and coasters",
      "Wall spaces and digital menus",
      "Billing receipts and packaging",
      "Waiting area displays"
    ]
  },
  {
    name: "Societies/RWAs",
    spaceName: "Society",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    description: "Residential societies can generate additional income for maintenance and improvements by monetizing common areas.",
    brandingAreas: [
      "Main gate entrance banners",
      "Lift back panels and interiors",
      "Notice boards and community areas",
      "Parking zones and entrance lobbies",
      "Digital displays in common areas"
    ]
  },
  {
    name: "Clinics/Hospitals",
    spaceName: "Clinic",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    description: "Healthcare facilities have targeted audiences looking for relevant information, making them valuable for health-related brands.",
    brandingAreas: [
      "Waiting room posters and displays",
      "Reception areas and counters",
      "Prescription pads and medical reports",
      "Floor stickers and directional signage",
      "Digital displays in waiting areas"
    ]
  },
  {
    name: "Gyms/Salons",
    spaceName: "Facility",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    description: "Fitness and wellness facilities attract brand collaborations with companies looking to reach health-conscious consumers.",
    brandingAreas: [
      "Mirror advertising and wall spaces",
      "Equipment branding and mats",
      "Locker areas and changing rooms",
      "Digital screens and class schedules",
      "Membership cards and promotional materials"
    ]
  }

];

const Industries = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow text-gray-600">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-white to-[#D9D9F3] py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Industries We Serve</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Every business has space that can be monetized. Find out how businesses in your industry are already earning extra income with BlookMySpace.ai.
            </p>
          </div>
        </section>

        {/* Industry Sections */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {industries.map((industry, index) => (
                <div key={index} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center`}>
                  <div className="lg:w-1/2">
                    <div className="bg-gray-100 rounded-lg p-1">
                      <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                        {industry.icon}
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">{industry.name}</h2>
                    <p className="text-lg text-gray-700 mb-6">{industry.description}</p>
                    <h3 className="text-xl font-semibold mb-3">Branding Opportunities:</h3>
                    <ul className="space-y-3 mb-8">
                      {industry.brandingAreas.map((area, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-[#4261FF] mr-2 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-[#6D4EFF] text-white hover:bg-[#4261FF]" asChild>
                        <Link to="/registration">List Your {industry.spaceName}</Link>
                      </Button>
                      <Button className="text-white" variant="outline" asChild>
                        <Link to="/browse-spaces">Browse {industry.name}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Space Owners Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Rohit Sharma</h3>
                    <p className="text-sm text-gray-500">Café Owner, Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "I was surprised how much extra revenue we generated just by allowing menu card branding. It's passive income that doesn't affect our operations at all."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Anita Desai</h3>
                    <p className="text-sm text-gray-500">RWA President, Delhi</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Our society now earns ₹30,000 monthly from lift branding. The additional income helps us maintain better facilities without raising maintenance fees."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-semibold">Vikram Singh</h3>
                    <p className="text-sm text-gray-500">Gym Owner, Bangalore</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The brands that advertise in our gym are relevant to our members, so it creates a win-win. We earn extra income while providing valuable information."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#4261FF] text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Don't See Your Industry?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              We work with all types of businesses! If you don't see your industry listed, contact us and we'll help you monetize your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/registration">List Your Space</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default Industries;