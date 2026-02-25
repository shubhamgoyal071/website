import { useState } from 'react';
import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { upcomingEvents } from '../mock';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'admission', label: 'Admission' }
  ];

  const categoryColors = {
    academic: 'bg-blue-100 text-blue-700',
    cultural: 'bg-purple-100 text-purple-700',
    sports: 'bg-green-100 text-green-700',
    admission: 'bg-yellow-100 text-yellow-700'
  };

  const filteredEvents = selectedCategory === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.category === selectedCategory);

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754"
          alt="Events"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Events & Activities
            </h1>
            <p className="text-xl text-yellow-200 animate-fadeInUp">
              Stay updated with our school calendar
            </p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Category Tabs */}
            <div className="mb-8">
              <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedCategory}>
                <TabsList className="grid grid-cols-5 w-full max-w-3xl mx-auto">
                  {categories.map((category) => (
                    <TabsTrigger key={category.value} value={category.value}>
                      {category.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <Card key={event.id} className="card-hover border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge className={categoryColors[event.category]}>
                          <Tag size={14} className="mr-1" />
                          {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                        </Badge>
                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                          <p className="text-xs font-semibold text-blue-700">
                            {
                              new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            }
                          </p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{event.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                      <div className="space-y-2 border-t pt-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} className="text-blue-600" />
                          {
                            new Date(event.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          }
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={16} className="text-blue-600" />
                          {event.time}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No events found in this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Recent <span className="text-blue-600">Highlights</span>
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Independence Day Celebration 2024',
                  date: '2024-08-15',
                  description: 'A patriotic celebration with flag hoisting, cultural performances, and speeches by students honoring our nation.'
                },
                {
                  title: 'Inter-School Sports Meet',
                  date: '2024-10-20',
                  description: 'Our students showcased exceptional sportsmanship and won multiple medals across various athletic events.'
                },
                {
                  title: 'Diwali Celebration',
                  date: '2024-11-12',
                  description: 'A joyful celebration with traditional decorations, rangoli competition, and cultural programs.'
                }
              ].map((event, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{event.title}</h3>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          {
                            new Date(event.date).toLocaleDateString('en-US', { 
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calendar CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss an Event!</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Subscribe to our calendar to stay updated with all school activities and important dates.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Events;
