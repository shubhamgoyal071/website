import { BookOpen, Users2, Target, Lightbulb, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { academics, aboutImages, infrastructureImages } from '../mock';
import prospectus from '../assets/documents/Reyansh_Prospectus.pdf';

const Academics = () => {
  const subjects = [
    {
      category: 'Core Subjects',
      items: ['English Language & Literature', 'Mathematics', 'Science (Physics, Chemistry, Biology)', 'Social Studies', 'Hindi']
    },
    {
      category: 'Languages',
      items: ['English', 'Hindi', 'Sanskrit (Optional)']
    },
    {
      category: 'Creative Arts',
      items: ['Art & Craft', 'Music', 'Dance', 'Drama']
    },
    {
      category: 'Physical Education',
      items: ['Sports', 'Yoga', 'Fitness Activities']
    },
    {
      category: 'Life Skills',
      items: ['Moral Science', 'Environmental Studies', 'Computer Science', 'General Knowledge']
    }
  ];

  const learningApproach = [
    {
      icon: BookOpen,
      title: 'Conceptual Learning',
      description: 'Focus on understanding concepts rather than rote memorization'
    },
    {
      icon: Users2,
      title: 'Collaborative Learning',
      description: 'Group activities and projects that encourage teamwork'
    },
    {
      icon: Target,
      title: 'Goal-Oriented',
      description: 'Setting clear learning objectives and tracking progress'
    },
    {
      icon: Lightbulb,
      title: 'Experiential Learning',
      description: 'Hands-on activities and real-world applications'
    }
  ];

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={infrastructureImages[0]}
          alt="Academics"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Academic Excellence
            </h1>
            <p className="text-xl text-yellow-200 animate-fadeInUp mb-6">
              Building strong foundations for lifelong success
            </p>
          </div>
        </div>
      </section>

      {/* Academic Programs */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Academic Programs</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Age-appropriate curriculum designed to nurture curiosity and foster a love for learning
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(academics).map((program, index) => {
              const badges = ['PG', 'N-J', '1-5', '6-8'];
              return (
                <Card key={index} className="card-hover border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-xl font-bold">
                      {badges[index]}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-blue-700">{program.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{program.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Key Focus Areas:</h4>
                      <ul className="space-y-2">
                        {program.focus.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Approach */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Learning Approach</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Innovative teaching methods that engage and inspire
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningApproach.map((approach, index) => (
              <Card key={index} className="card-hover border-none shadow-md text-center">
                <CardContent className="p-6">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <approach.icon size={32} className="text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{approach.title}</h3>
                  <p className="text-gray-600">{approach.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Offered */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Subjects Offered</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive curriculum covering all essential areas of development
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {subjects.map((subject, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6 shadow-sm">
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                    {subject.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 pt-2">
                      {subject.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700">
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Assessment */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Assessment & <span className="text-blue-600">Evaluation</span>
            </h2>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  We believe in continuous and comprehensive evaluation that goes beyond traditional exams. Our assessment system includes:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Formative Assessment',
                      items: ['Regular class work evaluation', 'Project-based assessments', 'Oral presentations', 'Practical demonstrations']
                    },
                    {
                      title: 'Summative Assessment',
                      items: ['Periodic tests', 'Term examinations', 'Annual evaluations', 'Portfolio assessments']
                    },
                    {
                      title: 'Holistic Evaluation',
                      items: ['Behavioral observations', 'Social skills development', 'Creative expression', 'Physical development']
                    },
                    {
                      title: 'Progress Reporting',
                      items: ['Regular report cards', 'Parent-teacher meetings', 'Individual progress updates', 'Skill development tracking']
                    }
                  ].map((section, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-lg text-blue-700 mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
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

export default Academics;
