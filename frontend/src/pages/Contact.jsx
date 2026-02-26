import { useState } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { schoolInfo, infrastructureImages } from '../mock';
import { API_BASE_URL } from '../constants';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/contact/message`, formData);
      if (response.data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={infrastructureImages[1]}
          alt="Contact"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Get in Touch
            </h1>
            <p className="text-xl text-yellow-200 animate-fadeInUp">
              We'd love to hear from you
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Phone size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Phone</h3>
                  <a href={`tel:${schoolInfo.phone}`} className="text-gray-600 hover:text-blue-600 transition-colors">
                    {schoolInfo.phone}
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="bg-yellow-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Mail size={24} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Email</h3>
                  <a href={`mailto:${schoolInfo.email}`} className="text-gray-600 hover:text-blue-600 transition-colors break-all">
                    {schoolInfo.email}
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Address</h3>
                  <p className="text-gray-600">{schoolInfo.address}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg card-hover">
                <CardContent className="p-6">
                  <div className="bg-yellow-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Clock size={24} className="text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">Office Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 8:00 AM - 4:00 PM</p>
                    <p>Saturday: 8:00 AM - 12:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">Send Us a Message</h2>
                  <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you as soon as possible.</p>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="mt-2"
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="mt-2"
                          placeholder="What is this regarding?"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        rows={6}
                        placeholder="Write your message here..."
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white btn-hover text-lg py-6">
                      <Send className="mr-2" size={18} />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Visit Our <span className="text-blue-600">Campus</span>
            </h2>
            <Card className="border-none shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14438.892747282662!2d75.8417745!3d25.1536776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f849a59b03d1b%3A0xd01963c41c4f08ba!2sReyansh%20Public%20School-Kota%20Best%20International%20School%20for%20Kids!5e0!3m2!1sen!2sin!4v1707573000000!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Reyansh School Location"
              ></iframe>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
