import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Award, Heart, ChevronRight, Star, Trophy, Shield, Monitor, Calculator } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { schoolInfo, heroImages, testimonials, directorMessage, olympiadAchievements, keyFeatures, uniqueSellingPoints, infrastructureImages, studentLifeImages } from '../mock';

const Home = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const iconMap = {
    BookOpen,
    Monitor,
    Trophy,
    Shield,
    Award,
    Calculator,
    Users
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden mt-20 md:mt-24">
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src={image}
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              Welcome to <span className="text-yellow-300">{schoolInfo.name}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-2 text-yellow-200 font-medium">{schoolInfo.tagline}</p>
            <p className="text-lg md:text-xl mb-8 text-gray-100">
              Nurturing young minds from {schoolInfo.level} with excellence, values, and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/admissions">
                <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white btn-hover text-lg px-8">
                  Apply Now <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-blue-800 btn-hover text-lg px-8 backdrop-blur-sm">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Hero Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentHeroImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentHeroImage ? 'bg-yellow-500 w-8' : 'bg-white/50'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Unique Selling Points Banner */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
            {uniqueSellingPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <Award size={32} className="flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold">{point.title}</h3>
                  <p className="text-sm opacity-90">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Why Choose Reyansh School?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Exceptional education with world-class facilities and unique programs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, index) => {
              const Icon = iconMap[feature.icon] || BookOpen;
              return (
                <Card key={index} className="card-hover border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                      <Icon size={28} className="text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Olympiad Achievements */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-yellow-100 px-6 py-3 rounded-full mb-4">
              <Trophy size={32} className="text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-700">
                {olympiadAchievements.totalGoldMedals} Gold Medals
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Achieving Excellence in <span className="text-blue-600">Olympiads</span>
            </h2>
            <p className="text-gray-600 text-lg">Our students' outstanding performance over the last 3 years</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-blue-200">
                        <th className="text-left py-4 px-4 font-bold text-gray-800">Olympiad</th>
                        {olympiadAchievements.years.map((year, index) => (
                          <th key={index} className="text-center py-4 px-4 font-bold text-blue-700">{year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {olympiadAchievements.olympiads.map((olympiad, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                          <td className="py-4 px-4 font-semibold text-gray-700">{olympiad.name}</td>
                          {olympiad.medals.map((medal, mIndex) => (
                            <td key={mIndex} className="text-center py-4 px-4">
                              <span className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-700 font-bold rounded-full">
                                {medal}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center">{olympiadAchievements.note}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Message from the <span className="text-blue-600">Director</span>
              </h2>
            </div>
            <Card className="border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-yellow-500 rounded-full blur-lg opacity-30"></div>
                      <img
                        src={directorMessage.image}
                        alt={directorMessage.name}
                        className="relative w-64 h-64 rounded-full object-cover border-4 border-white shadow-xl"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-800">{directorMessage.name}</h3>
                      <p className="text-blue-600 font-semibold">{directorMessage.designation}</p>
                    </div>
                    <div className="relative">
                      <span className="absolute -top-4 -left-2 text-6xl text-blue-200 font-serif">"</span>
                      <p className="text-gray-700 text-lg leading-relaxed pl-6">
                        {directorMessage.message}
                      </p>
                      <span className="text-6xl text-blue-200 font-serif float-right -mb-8">"</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideInLeft">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Building <span className="text-blue-600">Strong Foundations</span> for Tomorrow
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At {schoolInfo.name}, we believe that education extends beyond textbooks. Our approach focuses on nurturing curious minds, building strong character, and developing well-rounded individuals who are prepared to face the challenges of tomorrow.
              </p>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                With a legacy of {new Date().getFullYear() - parseInt(schoolInfo.established)} years, we have consistently delivered quality education that emphasizes both academic excellence and personal growth.
              </p>
              <Link to="/about">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white btn-hover">
                  Discover Our Story <ChevronRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
            <div className="animate-slideInRight">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src={infrastructureImages[0]}
                    alt="Students learning"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                  <img
                    src={infrastructureImages[1]}
                    alt="Classroom"
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                </div>
                <div className="space-y-4 mt-8">
                  <img
                    src={studentLifeImages[0]}
                    alt="Student"
                    className="rounded-lg shadow-lg w-full h-64 object-cover"
                  />
                  <img
                    src={studentLifeImages[1]}
                    alt="Learning environment"
                    className="rounded-lg shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">What Parents Say</h2>
            <p className="text-gray-600 text-lg">Hear from our school community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="card-hover border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Our School Family?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Admissions are now open for the upcoming academic year. Give your child the gift of quality education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/admissions">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white btn-hover text-lg px-8">
                Apply for Admission
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-blue-700 btn-hover text-lg px-8 backdrop-blur-sm">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
