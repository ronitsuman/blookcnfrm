import React, { forwardRef } from "react";
import { Briefcase, Check, Shield, Award } from "lucide-react";
import { Button } from "../components/ui/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// Utility function to replace cn for class name concatenation
const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Card Component
const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={combineClasses(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

// CardContent Component
const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={combineClasses("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const BlookWorks = () => {
  return (
    <>
    <Navbar/>
    <section className="max-w-8xl text-black bg-gray-100 mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            BlookWorks – Trusted Vendor Support for Seamless Campaign Execution
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Managing a campaign shouldn't be stressful. With BlookWorks, finding
            the right printer, fabricator, or installer is now as easy as booking
            a cab!
          </p>
          <p className="text-lg text-gray-600">
            We bring you a curated network of verified vendors who ensure your
            branding is executed on time, every time — without hidden costs or
            hassle.
          </p>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="bg-blue-50 rounded-lg p-6 shadow-md">
            <div className="flex justify-center mb-4">
              <Briefcase size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Vendor Support Platform
            </h3>
            <p className="text-center text-gray-600">
              Connect with verified vendors for printing, fabrication, and
              campaign setup
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose BlookWorks */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why Choose BlookWorks?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="text-green-500 mr-2" />
              <span className="font-medium">Trusted Local Vendors</span>
            </div>
            <p className="text-gray-600">
              Access to trusted local vendors for printing, fabrication, and
              branding.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="text-green-500 mr-2" />
              <span className="font-medium">Easy Quote Comparison</span>
            </div>
            <p className="text-gray-600">
              Compare quotes easily and select the best fit for your campaign
              needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="text-green-500 mr-2" />
              <span className="font-medium">Execution Tracking</span>
            </div>
            <p className="text-gray-600">
              Track execution through photo proofs and live updates in real-time.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="text-green-500 mr-2" />
              <span className="font-medium">Escrow Protection</span>
            </div>
            <p className="text-gray-600">
              Escrow-protected payments — pay only after satisfactory work
              completion.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <Check className="text-green-500 mr-2" />
              <span className="font-medium">Quality Assurance</span>
            </div>
            <p className="text-gray-600">
              BlookWorks quality-checks ensure only verified vendors deliver your
              branding.
            </p>
          </div>
        </div>
      </div>

      {/* How BlookWorks Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          How BlookWorks Works
        </h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 z-0"></div>
          <div className="grid md:grid-cols-6 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium text-center mb-2">Job Request</h3>
              <p className="text-sm text-gray-600 text-center">
                Brand client submits a requirement via dashboard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-medium text-center mb-2">Vendor Quotes</h3>
              <p className="text-sm text-gray-600 text-center">
                Verified vendors nearby receive the request and submit quotes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-medium text-center mb-2">Brand Selection</h3>
              <p className="text-sm text-gray-600 text-center">
                Brand selects preferred vendors based on price or ratings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">4</span>
              </div>
              <h3 className="font-medium text-center mb-2">Escrow Payment</h3>
              <p className="text-sm text-gray-600 text-center">
                Brand makes payment into Blook escrow wallet, ensuring safety.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">5</span>
              </div>
              <h3 className="font-medium text-center mb-2">Work Execution</h3>
              <p className="text-sm text-gray-600 text-center">
                Vendor completes the job, uploads photo proofs via dashboard.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 z-10">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">6</span>
              </div>
              <h3 className="font-medium text-center mb-2">Payment Release</h3>
              <p className="text-sm text-gray-600 text-center">
                On brand approval, payment is released automatically to the
                vendor.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Example */}
      <div className="mb-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Real-World Example: Cafe Branding Deployment
        </h2>
        <div className="md:flex">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Use Case:</h3>
              <p className="text-gray-600 mb-4">
                A popular coffee chain wants to launch a new product and needs 200
                cafes across Mumbai to have table-top standees and entry flex
                branding.
              </p>
              <h3 className="font-semibold mb-3">Solution via BlookWorks:</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4">
                <li>Campaign manager uploads specs.</li>
                <li>Nearby vendors submit bulk quotes.</li>
                <li>Jobs divided city-wise.</li>
                <li>Blook escrow ensures vendors are paid only post-execution.</li>
                <li>Campaign live across all locations within 5 days!</li>
              </ul>
              <div className="font-semibold text-green-600 flex items-center">
                <Check className="mr-2" />
                <span>
                  Result: Brands save time, spaces get professional branding, and
                  vendors earn more efficiently.
                </span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-8 flex items-center justify-center">
            <div className="bg-gray-200 rounded-lg p-6 w-full h-auto flex items-center justify-center">
              <img
                src="/vendorinstal.png"
                alt="BlookWorks vendor installing cafe branding"
                className="object-full h-full rounded-lg w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Who Can Use BlookWorks */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Who Can Use BlookWorks?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-none">
            <CardContent className="pt-6 h-34 bg-white rounded-xl outline-3 outline-gray-200">
              <h3 className="text-xl font-semibold mb-3">Brands</h3>
              <p className="text-gray-600">
                Brands planning multi-city activations across various spaces.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none">
            <CardContent className="pt-6 h-34 bg-white rounded-xl outline-3 outline-gray-200">
              <h3 className="text-xl font-semibold mb-3">Agencies</h3>
              <p className="text-gray-600">
                Agencies managing offline visibility projects and campaigns.
              </p>
            </CardContent>
          </Card>
          <Card className="border-none">
            <CardContent className="pt-6 bg-white rounded-xl outline-3 outline-gray-200">
              <h3 className="text-xl font-semibold mb-3">Space Owners</h3>
              <p className="text-gray-600">
                Space Owners needing help setting up branding flex, posters, etc.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why BlookWorks Vendors Are Trusted */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Why BlookWorks Vendors Are Trusted
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Shield size={32} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-2">
              Pre-verified background checks
            </h3>
            <p className="text-sm text-gray-600 text-center">
              We thoroughly vet all vendors before they join our platform.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Award size={32} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-2">
              Proof-based work acceptance
            </h3>
            <p className="text-sm text-gray-600 text-center">
              All completed work requires photo evidence for verification.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Award size={32} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-2">
              Transparent quotation & pricing
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Clear pricing with no hidden costs or surprise charges.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-center mb-4">
              <Award size={32} className="text-blue-600" />
            </div>
            <h3 className="font-medium text-center mb-2">
              Express turn around available
            </h3>
            <p className="text-sm text-gray-600 text-center">
              Fast execution options for urgent campaign requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Image Alt Text Table */}
      {/* <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Image References</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 text-left">
                  Image Description
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Alt Text
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Vendor installing poster in cafe
                </td>
                <td className="border border-gray-300 p-2">
                  BlookWorks vendor installing cafe branding
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Vendor measuring gate flex at society
                </td>
                <td className="border border-gray-300 p-2">
                  Vendor preparing society gate for branding flex
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Branding standee printed at printer
                </td>
                <td className="border border-gray-300 p-2">
                  Custom printed standee for brand promotion
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">
                  Client dashboard screenshot
                </td>
                <td className="border border-gray-300 p-2">
                  BlookWorks client dashboard job execution tracking
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section> */}

      {/* CTA Section */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          className="bg-blue-600 shadow-lg hover:bg-blue-700 text-lg px-6 py-3 rounded-full"
        >
          Request Vendor Quotes Now
        </Button>
      </div>
      <Footer />
    </section>
    </>
  );
};

export default BlookWorks;