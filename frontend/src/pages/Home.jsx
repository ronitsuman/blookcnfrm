import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import InfoCard from "../components/InfoCard";
import { Button } from "../components/ui/Button";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Benefits Section */}
        <Benefits />

        {/* How It Works Section */}
        <section className="py-16 bg-white text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <InfoCard
                icon={
                  <div className="w-16 h-16 bg-[#D9D9F3] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                }
                title="Register & Upload Details"
                description="List your space with clear photos, footfall details & promotional zone sizes."
              />
              <InfoCard
                icon={
                  <div className="w-16 h-16 bg-[#D9D9F3] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                }
                title="Get Verified & Shortlisted"
                description="We ensure your space meets client expectations before showing it."
              />
              <InfoCard
                icon={
                  <div className="w-16 h-16 bg-[#D9D9F3] rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                }
                title="Earn from Brand Collaborations"
                description="Once matched, get paid directly from brands. We retain 25% as platform fees."
              />
            </div>
            <div className="text-center mt-10">
              <Button className='bg-[#6D4EFF] text-white' size="lg" asChild>
                <Link to="/how-it-works">Learn More About The Process</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-16 bg-gray-50 text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md hover:scale-105">
                  <div className="text-[#6D4EFF] mb-4">{industry.icon}</div>
                  <h3 className="font-semibold">{industry.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{industry.spaces}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button size="lg" className="bg-[#6D4EFF] text-white" variant="outline" asChild>
                <Link to="/industries">View All Industries</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Heat Mapping Section */}
        <section className="py-16 bg-gradient-to-r from-[#6D4EFF] to-[#4261FF] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Upcoming Feature: Heat Mapping</h2>
                <p className="text-lg mb-4">
                  See what the eye misses. Coming in September.
                </p>
                <p className="mb-6">
                  Using your existing CCTV cameras, we'll show which parts of your venue get the most 
                  attention, helping you place branding for maximum visibility.
                </p>
                <Button variant="secondary" className='bg-blue-950' size="lg" asChild>
                  <Link to="/heat-mapping">Get Free 1-Month Trial</Link>
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <div className="aspect-video bg-gray-800 rounded relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-900/30">
                      <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full bg-red-500 blur-xl opacity-70"></div>
                      <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-orange-500 blur-xl opacity-60"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 rounded-full bg-yellow-500 blur-xl opacity-50"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white text-black">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Monetize Your Space?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join 1000+ businesses already earning ₹5,000–₹50,000/month from their underutilized spaces.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#6D4EFF] hover:bg-[#4261FF] text-white" asChild>
                <Link to="/registration">List Your Space Now</Link>
              </Button>
              <Button size="lg" className="bg-[#6D4EFF] text-white" variant="outline" asChild>
                <Link to="/browse-spaces">Browse Available Spaces</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const industries = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    name: "Retail/Showrooms",
    spaces: "Entry standees, inside branding"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
    name: "Restaurants/Cafes",
    spaces: "Menu cards, wall spaces"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    name: "Malls",
    spaces: "Atrium setups, restroom zones"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    name: "Corporate Parks",
    spaces: "Reception TVs, standees"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    name: "Societies/RWAs",
    spaces: "Main gate flex, lift panels"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    name: "Clinics/Hospitals",
    spaces: "Waiting rooms, floor stickers"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>,
    name: "Tuition Classes",
    spaces: "Desks, walls, entry doors"
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>,
    name: "Gyms/Salons",
    spaces: "Mirrors, lockers, changing zones"
  }
];

export default Home;