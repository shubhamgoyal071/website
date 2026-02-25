import { Mail, GraduationCap, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { facultyMembers, facultyImages } from '../mock';

const Faculty = () => {
  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={facultyImages[0]}
          alt="Faculty"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Our Faculty
            </h1>
            <p className="text-xl text-amber-200 animate-fadeInUp">
              Meet our dedicated team of educators
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Introduction */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Experienced & <span className="text-teal-600">Passionate Educators</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our faculty comprises highly qualified and experienced teachers who are passionate about education and committed to nurturing every child's potential. With diverse expertise and a student-centric approach, our team creates an inspiring learning environment where students thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Faculty Members */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facultyMembers.map((member) => (
              <Card key={member.id} className="card-hover border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                      <p className="text-sm text-teal-600 font-medium">{member.designation}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap size={16} className="text-amber-600" />
                      <span className="text-sm">{member.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award size={16} className="text-amber-600" />
                      <span className="text-sm">{member.experience} in Education</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Specialization:</p>
                    <p className="text-sm text-gray-600">{member.specialization}</p>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 text-teal-600 hover:text-teal-700 text-sm font-medium py-2 hover:bg-teal-50 rounded-lg transition-colors">
                    <Mail size={16} />
                    Contact
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Qualifications */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              What Makes Our Faculty <span className="text-teal-600">Exceptional</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Highly Qualified',
                  description: 'All our teachers hold relevant degrees and teaching certifications from recognized institutions'
                },
                {
                  title: 'Experienced Professionals',
                  description: 'Years of teaching experience across different age groups and learning styles'
                },
                {
                  title: 'Continuous Learning',
                  description: 'Regular training and professional development to stay updated with latest educational practices'
                },
                {
                  title: 'Student-Centric Approach',
                  description: 'Focus on individual student needs and personalized attention'
                },
                {
                  title: 'Innovative Teaching',
                  description: 'Use of modern teaching methods and technology to make learning engaging'
                },
                {
                  title: 'Caring Mentors',
                  description: 'Beyond academics, our teachers serve as mentors and role models'
                }
              ].map((item, index) => (
                <Card key={index} className="card-hover border-none shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2 text-teal-700">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="section-padding bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Professional Development
            </h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  We invest in our faculty's growth through continuous professional development programs:
                </p>
                <div className="space-y-4">
                  {[
                    'Regular workshops on modern teaching methodologies',
                    'Training sessions on child psychology and behavior management',
                    'Technology integration in classroom teaching',
                    'Subject-specific skill enhancement programs',
                    'Collaborative learning and peer observation',
                    'Participation in educational conferences and seminars'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-600 text-lg">{item}</p>
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

export default Faculty;
