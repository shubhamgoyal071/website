import { Target, Eye, Heart, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { schoolInfo, aboutImages, studentLifeImages, facultyImages, infrastructureImages } from '../mock';

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do'
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'Building character through honesty, respect, and responsibility'
    },
    {
      icon: Eye,
      title: 'Innovation',
      description: 'Encouraging creativity and forward-thinking approaches'
    },
    {
      icon: Award,
      title: 'Inclusivity',
      description: 'Creating a welcoming environment for every child'
    }
  ];

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={aboutImages[0]}
          alt="About us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              About {schoolInfo.name}
            </h1>
            <p className="text-xl text-yellow-200 animate-fadeInUp">
              {schoolInfo.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Our <span className="text-blue-600">Story</span>
              </h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Established in {schoolInfo.established}, {schoolInfo.name} has been a cornerstone of quality education in our community. Our journey began with a simple yet powerful vision: to create an educational institution that nurtures not just academic excellence, but also character, creativity, and compassion.
              </p>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Over the years, we have grown from strength to strength, touching the lives of hundreds of students and their families. Our commitment to providing a holistic education that prepares students for both academic success and life beyond the classroom remains unwavering.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Today, we stand proud as a beacon of excellence, continuing to innovate and adapt while staying true to our core values and mission.
              </p>
            </div>
            <div>
              <img
                src={aboutImages[1]}
                alt="School history"
                className="rounded-lg shadow-xl w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg card-hover">
              <CardContent className="p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Eye size={32} className="text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-700">Our Vision</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To be a leading educational institution that empowers students to become lifelong learners, critical thinkers, and compassionate global citizens who contribute positively to society.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg card-hover">
              <CardContent className="p-8">
                <div className="bg-yellow-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Target size={32} className="text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-700">Our Mission</h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To provide a nurturing and stimulating environment that fosters academic excellence, character development, and holistic growth while instilling strong values and preparing students for the challenges of tomorrow.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="card-hover border-none shadow-lg text-center">
                <CardContent className="p-6">
                  <div className="bg-gradient-to-br from-blue-100 to-yellow-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon size={36} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={infrastructureImages[0]}
                alt="Classroom"
                className="rounded-lg shadow-xl w-full h-[450px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                Why Choose <span className="text-blue-600">{schoolInfo.name}</span>?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: 'Experienced Faculty',
                    description: 'Our teachers bring years of experience and genuine passion for education'
                  },
                  {
                    title: 'Individual Attention',
                    description: 'Small class sizes ensure every child receives personalized care and support'
                  },
                  {
                    title: 'Holistic Approach',
                    description: 'We focus on developing the whole child - mind, body, and character'
                  },
                  {
                    title: 'Safe Environment',
                    description: 'A secure campus where children feel protected, valued, and encouraged to explore'
                  },
                  {
                    title: 'Strong Community',
                    description: 'Active parent involvement and a supportive school community'
                  },
                  {
                    title: 'Modern Facilities',
                    description: 'Well-equipped classrooms, labs, library, and recreational spaces'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: `${new Date().getFullYear() - parseInt(schoolInfo.established)}+`, label: 'Years of Excellence' },
              { number: '500+', label: 'Happy Students' },
              { number: '40+', label: 'Dedicated Teachers' },
              { number: '98%', label: 'Parent Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="animate-fadeInUp">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 text-yellow-300">{stat.number}</h3>
                <p className="text-lg text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
