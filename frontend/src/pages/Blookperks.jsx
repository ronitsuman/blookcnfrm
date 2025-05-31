import { QrCode, Award, BarChart, Check } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Utility function for class name concatenation
const combineClasses = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Button Component
const Button = ({ className, children, ...props }) => (
  <button
    className={combineClasses( 
      "text-white font-semibold rounded transition-colors",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

// Card Component
const Card = ({ className, ...props }) => (
  <div
    className={combineClasses(
      "rounded-lg bg-white text-gray-900 shadow-sm",
      className
    )}
    {...props}
  />
);

// CardContent Component
const CardContent = ({ className, ...props }) => (
  <div
    className={combineClasses("p-6", className)}
    {...props}
  />
);

const BlookPerks = () => {
  return (
    <>
    <Navbar/>
    <section className="max-w-8xl text-black bg-gray-100 mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center md:text-left md:flex md:items-center md:justify-between">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">BlookPerks – Turn Every Visitor Into Value</h1>
          <p className="text-lg text-gray-600 mb-6">
            In today's competitive world, every visitor matters. BlookPerks helps brands and spaces engage visitors instantly using simple, colorful QR codes linked to dynamic rewards, surveys, or promotions.
          </p>
          <p className="text-lg text-gray-600">
            Whether it's a free gift, a cashback, a discount, or just valuable feedback — BlookPerks makes real-world engagement measurable and rewarding.
          </p>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="bg-blue-50 rounded-lg p-6 shadow-md">
            <div className="flex justify-center mb-4">
              <QrCode size={48} className="text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">QR Rewards Platform</h3>
            <p className="text-center text-gray-600">Drive customer engagement with dynamic QR campaigns</p>
          </div>
        </div>
      </div>

      {/* Why Choose BlookPerks */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose BlookPerks?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <Check className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">Launch QR Campaigns</h3>
              <p className="text-gray-600">Run contactless consumer engagement via dynamic QR codes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Award className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">Instant Rewards</h3>
              <p className="text-gray-600">Offer immediate gratification through rewards and vouchers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <BarChart className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">Track Analytics</h3>
              <p className="text-gray-600">Monitor engagement with detailed scan analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How BlookPerks Works */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How BlookPerks Works</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { step: 1, title: "Campaign Setup", desc: "Create reward or survey campaign" },
            { step: 2, title: "QR Deployment", desc: "Auto-generate unique QRs per space" },
            { step: 3, title: "Visitor Engagement", desc: "Customers scan QR at location" },
            { step: 4, title: "Reward Delivery", desc: "Instant rewards via mobile/WhatsApp" },
            { step: 5, title: "Real-Time Reports", desc: "Track performance metrics live" }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 font-bold">{item.step}</span>
              </div>
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Use Case Example */}
      <div className="mb-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Real-World Example: Ice Cream Sampling</h2>
        <div className="md:flex items-start gap-8">
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Use Case:</h3>
              <p className="text-gray-600 mb-4">
                An ice cream brand wants to offer a free sample voucher for customers visiting 500 retail stores across India.
              </p>
              <h3 className="font-semibold mb-3">Solution:</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Brand sets up QR campaign for free scoop vouchers</li>
                <li>QR posters placed at checkout counters</li>
                <li>Customers scan QR and receive instant WhatsApp vouchers</li>
                <li>Brand tracks redemptions in real-time</li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4">Campaign Results:</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2" />
                  <span>Massive trial generation</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2" />
                  <span>Real data insights</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-500 mr-2" />
                  <span>Low setup cost vs traditional sampling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button className="bg-blue-600 shadow-lg hover:bg-blue-700 text-lg px-6 py-3 rounded-full">
          Launch QR Campaign Today
        </Button>
      </div>

      <Footer />
    </section>
    </>
  );
};

export default BlookPerks;