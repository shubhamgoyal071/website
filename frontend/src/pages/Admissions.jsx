import { useState } from 'react';
import axios from 'axios';
import { FileText, CheckCircle2, Calendar, FileCheck, Award, Download } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import { admissionProcess, schoolInfo, studentLifeImages } from '../mock';
import { API_BASE_URL } from '../constants';
import prospectus from '../assets/documents/Reyansh_Prospectus.pdf';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    email: '',
    phone: '',
    grade: '',
    previousSchool: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        student_name: formData.studentName,
        parent_name: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        grade: formData.grade,
        previous_school: formData.previousSchool,
        message: formData.message
      };

      const response = await axios.post(`${API_BASE_URL}/api/admission-enquiry`, payload);
      if (response.data.success || response.data.id) {
        toast.success('Enquiry submitted successfully! We will contact you soon.');
        setFormData({
          studentName: '',
          parentName: '',
          email: '',
          phone: '',
          grade: '',
          previousSchool: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit enquiry. Please try again later.');
    }
  };

  const processIcons = [FileText, Calendar, FileCheck, CheckCircle2, Award];

  return (
    <div className="min-h-screen mt-20 md:mt-24">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={studentLifeImages[2]}
          alt="Admissions"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/70"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeInUp">
              Admissions Open
            </h1>
            <p className="text-xl text-yellow-200 animate-fadeInUp">
              Join the {schoolInfo.name} family - Where excellence meets opportunity
            </p>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Admission Process</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              A simple and transparent process to ensure the best fit for your child
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {admissionProcess.map((process, index) => {
                const Icon = processIcons[index];
                return (
                  <div key={process.step} className="relative">
                    <Card className="card-hover border-none shadow-lg h-full">
                      <CardContent className="p-6 text-center">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                          {process.step}
                        </div>
                        <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Icon size={24} className="text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">{process.title}</h3>
                        <p className="text-sm text-gray-600">{process.description}</p>
                      </CardContent>
                    </Card>
                    {index < admissionProcess.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-1/2 z-10">
                        <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500 transform rotate-45"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Requirements */}
      <section className="section-padding bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
              Eligibility & <span className="text-blue-600">Requirements</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Age Criteria</h3>
                  <div className="space-y-3">
                    {[
                      { grade: 'Nursery', age: '3+ years' },
                      { grade: 'LKG', age: '4+ years' },
                      { grade: 'UKG', age: '5+ years' },
                      { grade: 'Class 1-8', age: 'As per guidelines' }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">{item.grade}:</span>
                        <span className="text-gray-600">{item.age}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-700">Required Documents</h3>
                  <ul className="space-y-2">
                    {[
                      'Birth Certificate',
                      'Transfer Certificate (if applicable)',
                      'Previous academic records',
                      'Passport-size photographs',
                      'Address proof',
                      'Parent ID proof'
                    ].map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Fee Structure</h2>
            <p className="text-gray-600 text-lg mb-8">
              Affordable and transparent fee structure with no hidden charges
            </p>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <p className="text-gray-700 text-lg">
                  For detailed information about our fee structure, please contact our admissions office.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Admission Enquiry Form</h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and our admissions team will get in touch with you
              </p>
            </div>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="studentName">Student Name *</Label>
                      <Input
                        id="studentName"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                      <Input
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
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
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="grade">Seeking Admission For *</Label>
                      <Select name="grade" value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })} required>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="lkg">LKG</SelectItem>
                          <SelectItem value="ukg">UKG</SelectItem>
                          <SelectItem value="class1">Class 1</SelectItem>
                          <SelectItem value="class2">Class 2</SelectItem>
                          <SelectItem value="class3">Class 3</SelectItem>
                          <SelectItem value="class4">Class 4</SelectItem>
                          <SelectItem value="class5">Class 5</SelectItem>
                          <SelectItem value="class6">Class 6</SelectItem>
                          <SelectItem value="class7">Class 7</SelectItem>
                          <SelectItem value="class8">Class 8</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="previousSchool">Previous School (if any)</Label>
                      <Input
                        id="previousSchool"
                        name="previousSchool"
                        value={formData.previousSchool}
                        onChange={handleChange}
                        className="mt-2"
                        placeholder="Previous school name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2"
                      rows={4}
                      placeholder="Any questions or special requirements..."
                    />
                  </div>
                  <Button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white btn-hover text-lg py-6">
                    Submit Enquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have Questions?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Our admissions team is here to help. Contact us for any queries or to schedule a campus visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${schoolInfo.phone}`}>
              <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 btn-hover text-lg px-8">
                Call Us Now
              </Button>
            </a>
            <a href={`mailto:${schoolInfo.email}`}>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-blue-700 btn-hover text-lg px-8 backdrop-blur-sm">
                Email Us
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
