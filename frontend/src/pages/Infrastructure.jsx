import { Building2, BookOpen, FlaskConical, Monitor, Activity, Palette } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { infrastructureImages, facilities } from '../mock';

const Infrastructure = () => {
  const facilitiesDetailed = [
    {
      icon: Building2,
      title: 'Modern Classrooms',
      description: 'Spacious, well-ventilated classrooms equipped with smart boards, proper lighting, and comfortable furniture designed for active learning.',
      image: infrastructureImages[0]
    },
    {
      icon: BookOpen,
      title: 'Well-Stocked Library',
      description: 'A comprehensive collection of books, magazines, and digital resources covering diverse subjects to foster reading habits and research skills.',
      image: infrastructureImages[1]
    },
    {
      icon: FlaskConical,
      title: 'Science Laboratories',
      description: 'Fully equipped labs for Physics, Chemistry, and Biology with modern apparatus for hands-on learning and experimentation.',
      image: infrastructureImages[0]
    },
    {
      icon: Monitor,
      title: 'Computer Lab',
      description: 'State-of-the-art computer lab with latest hardware and software to enhance digital literacy and technology skills.',
      image: infrastructureImages[3]
    },
    {
      icon: Activity,
      title: 'Sports Facilities',
      description: 'Spacious playground, indoor sports area, and equipment for cricket, football, basketball, badminton, and other sports.',
      image: infrastructureImages[2]
    },
    {
      icon: Palette,
      title: 'Art & Music Rooms',
      description: 'Dedicated spaces equipped with instruments and materials to nurture artistic talents and musical abilities.',
      image: infrastructureImages[4]
    }
  ];

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={infrastructureImages[0]}
          alt="Infrastructure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Infrastructure & Facilities
            </h1>
            <p className="text-xl text-amber-200 animate-fadeInUp">
              World-class facilities for holistic development
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              State-of-the-Art <span className="text-teal-600">Learning Environment</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our campus is designed to provide students with a safe, comfortable, and stimulating environment that supports learning, creativity, and growth. Every facility has been carefully planned to meet the diverse needs of our students and enhance their educational experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main Facilities */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {facilitiesDetailed.map((facility, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="animate-slideInLeft">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-teal-100 p-4 rounded-lg">
                          <facility.icon size={32} className="text-teal-600" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{facility.title}</h3>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{facility.description}</p>
                    </div>
                    <div className="animate-slideInRight">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="rounded-lg shadow-xl w-full h-[350px] object-cover"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="animate-slideInRight order-2 md:order-1">
                      <img
                        src={facility.image}
                        alt={facility.title}
                        className="rounded-lg shadow-xl w-full h-[350px] object-cover"
                      />
                    </div>
                    <div className="animate-slideInLeft order-1 md:order-2">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-amber-100 p-4 rounded-lg">
                          <facility.icon size={32} className="text-amber-600" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{facility.title}</h3>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{facility.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Facilities */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Additional Amenities</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              More features that make our campus special
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Cafeteria',
                description: 'Hygienic and nutritious meals prepared with care'
              },
              {
                title: 'Medical Room',
                description: 'First-aid facility with trained staff for emergencies'
              },
              {
                title: 'CCTV Surveillance',
                description: 'Complete campus security with 24/7 monitoring'
              },
              {
                title: 'Transportation',
                description: 'Safe and reliable school bus service with GPS tracking'
              },
              {
                title: 'Drinking Water',
                description: 'RO purified water available throughout the campus'
              },
              {
                title: 'Green Spaces',
                description: 'Gardens and open areas for relaxation and outdoor activities'
              }
            ].map((amenity, index) => (
              <Card key={index} className="card-hover border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-teal-700">{amenity.title}</h3>
                  <p className="text-gray-600">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Security */}
      <section className="section-padding bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Safety & <span className="text-teal-600">Security</span>
            </h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  The safety and security of our students is our top priority. Our comprehensive safety measures include:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Campus Security',
                      items: ['24/7 CCTV surveillance', 'Trained security personnel', 'Controlled entry and exit points', 'Visitor management system']
                    },
                    {
                      title: 'Student Safety',
                      items: ['Regular safety drills', 'Fire safety equipment', 'First-aid trained staff', 'Emergency response protocols']
                    },
                    {
                      title: 'Health & Hygiene',
                      items: ['Clean and sanitized premises', 'Regular health checkups', 'Medical room with first aid', 'Safe drinking water']
                    },
                    {
                      title: 'Transport Safety',
                      items: ['GPS-enabled buses', 'Trained drivers and attendants', 'Regular vehicle maintenance', 'Parent tracking system']
                    }
                  ].map((section, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg text-gray-800 mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Infrastructure;
