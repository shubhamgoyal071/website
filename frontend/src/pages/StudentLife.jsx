import { Music, Palette, Trophy, Microscope, Book, Users } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { studentLifeImages } from '../mock';

const StudentLife = () => {
  const activities = [
    {
      icon: Trophy,
      title: 'Sports & Athletics',
      description: 'Cricket, Football, Basketball, Badminton, Athletics, and more',
      image: studentLifeImages[2]
    },
    {
      icon: Palette,
      title: 'Arts & Crafts',
      description: 'Drawing, Painting, Sculpture, and Creative Workshops',
      image: studentLifeImages[0]
    },
    {
      icon: Music,
      title: 'Music & Dance',
      description: 'Vocal Music, Instrumental Training, Classical & Contemporary Dance',
      image: studentLifeImages[1]
    },
    {
      icon: Microscope,
      title: 'Science Club',
      description: 'Experiments, Science Fairs, Innovation Projects',
      image: studentLifeImages[0]
    },
    {
      icon: Book,
      title: 'Literary Activities',
      description: 'Debate, Elocution, Story Writing, Reading Club',
      image: studentLifeImages[1]
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Social Awareness Programs, Environmental Initiatives',
      image: studentLifeImages[2]
    }
  ];

  const clubs = [
    'Science & Innovation Club',
    'Literary & Debate Society',
    'Art & Craft Club',
    'Music & Dance Ensemble',
    'Sports & Fitness Club',
    'Environmental Club',
    'Drama & Theatre Group',
    'Quiz & Knowledge Club'
  ];

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={studentLifeImages[0]}
          alt="Student Life"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 to-teal-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Student Life
            </h1>
            <p className="text-xl text-amber-200 animate-fadeInUp">
              Beyond academics - where talents flourish and friendships grow
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Life at <span className="text-teal-600">Reyansh School</span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              At Reyansh School, we believe that education extends far beyond the classroom. Our vibrant student life program offers diverse opportunities for students to explore their interests, develop new skills, and create lasting memories.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              From sports and arts to clubs and community service, every student finds their space to shine and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Co-Curricular Activities */}
      <section className="section-padding bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Co-Curricular Activities</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Diverse programs to nurture talents and build confidence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="card-hover border-none shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-lg">
                      <activity.icon size={28} />
                    </div>
                    <h3 className="text-xl font-bold">{activity.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{activity.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clubs & Societies */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Clubs & Societies</h2>
              <p className="text-gray-600 text-lg">
                Join a community of like-minded students and pursue your passions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clubs.map((club, index) => (
                <Card key={index} className="card-hover border-none shadow-md">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-3 h-3 bg-amber-500 rounded-full flex-shrink-0"></div>
                    <h3 className="text-lg font-semibold text-gray-800">{club}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Annual Events */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Annual Events & Celebrations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Memorable events that bring our school community together
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Annual Day',
                description: 'Grand celebration showcasing student talents through cultural performances and award ceremonies'
              },
              {
                title: 'Sports Day',
                description: 'Athletic competitions fostering sportsmanship, teamwork, and healthy competition'
              },
              {
                title: 'Science Exhibition',
                description: 'Platform for students to display innovative projects and scientific experiments'
              },
              {
                title: 'Cultural Festival',
                description: 'Celebration of diversity through music, dance, drama, and art from various cultures'
              },
              {
                title: 'Literary Fest',
                description: 'Debates, elocution, poetry, and storytelling competitions'
              },
              {
                title: 'Founder\'s Day',
                description: 'Commemorating our school\'s establishment with special programs and activities'
              }
            ].map((event, index) => (
              <Card key={index} className="card-hover border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-teal-700">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Support */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Student <span className="text-teal-600">Support & Well-being</span>
            </h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  We are committed to the overall well-being of our students. Our support system includes:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Counseling Services',
                      description: 'Professional guidance for academic and personal challenges'
                    },
                    {
                      title: 'Peer Mentoring',
                      description: 'Senior students guiding and supporting younger peers'
                    },
                    {
                      title: 'Health & Wellness',
                      description: 'Regular health checkups and wellness programs'
                    },
                    {
                      title: 'Parent Communication',
                      description: 'Regular updates and open channels for parent involvement'
                    }
                  ].map((support, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{support.title}</h3>
                      <p className="text-gray-600">{support.description}</p>
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

export default StudentLife;
