import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Image as ImageIcon, Users, Mail, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import axios from 'axios';
import { schoolInfo } from '../mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [photos, setPhotos] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'gallery',
    imageType: 'gallery',
    file: null,
    preview: null
  });

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    // Check if logged in and session is valid (24 hours)
    if (!isAuth || !loginTime) {
      navigate('/admin');
      return;
    }
    
    const currentTime = new Date().getTime();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (currentTime - parseInt(loginTime) > sessionDuration) {
      handleLogout();
      return;
    }
    
    fetchDashboardData();
  }, [navigate]);

  const imageCategories = {
    gallery: [
      { value: 'classroom', label: 'Classrooms' },
      { value: 'events', label: 'Events' },
      { value: 'facilities', label: 'Facilities' },
      { value: 'sports', label: 'Sports' },
      { value: 'activities', label: 'Activities' },
      { value: 'campus', label: 'Campus' }
    ],
    website: [
      { value: 'hero', label: 'Hero Section (Homepage Banner)' },
      { value: 'about', label: 'About Section' },
      { value: 'director', label: 'Director Photo' },
      { value: 'academics', label: 'Academics Section' },
      { value: 'facilities-showcase', label: 'Facilities Showcase' }
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminLoginTime');
    toast.success('Logged out successfully');
    navigate('/admin');
  };

  const fetchDashboardData = async () => {
    try {
      const [photosRes, enquiriesRes, messagesRes] = await Promise.all([
        axios.get(`${API}/photos`),
        axios.get(`${API}/admissions/enquiries`),
        axios.get(`${API}/contact/messages`)
      ]);
      setPhotos(photosRes.data.photos || []);
      setEnquiries(enquiriesRes.data.enquiries || []);
      setMessages(messagesRes.data.messages || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size exceeds 5MB limit');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadData({
          ...uploadData,
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadData.file) {
      toast.error('Please select a photo to upload');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', uploadData.file);
      formData.append('title', uploadData.title);
      formData.append('description', uploadData.description);
      formData.append('category', uploadData.category);

      await axios.post(`${API}/photos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Photo uploaded successfully!');
      setUploadData({
        title: '',
        description: '',
        category: 'gallery',
        imageType: 'gallery',
        file: null,
        preview: null
      });
      
      const fileInput = document.getElementById('file');
      if (fileInput) fileInput.value = '';
      
      fetchDashboardData();
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error(error.response?.data?.detail || 'Failed to upload photo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePhoto = async (photoId) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) {
      return;
    }

    try {
      await axios.delete(`${API}/photos/${photoId}`);
      toast.success('Photo deleted successfully');
      fetchDashboardData();
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error('Failed to delete photo');
    }
  };

  // Group photos by category
  const groupedPhotos = photos.reduce((acc, photo) => {
    if (!acc[photo.category]) {
      acc[photo.category] = [];
    }
    acc[photo.category].push(photo);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={schoolInfo.logo} 
                alt={schoolInfo.name}
                className="h-12 w-12 bg-white rounded-lg p-1"
              />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-blue-200">{schoolInfo.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-700">
                  View Website
                </Button>
              </a>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="text-white border-white hover:bg-red-600 hover:border-red-600"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <ImageIcon size={18} />
              Images
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center gap-2">
              <Users size={18} />
              Enquiries
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail size={18} />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Total Photos</p>
                      <h3 className="text-3xl font-bold mt-2">{photos.length}</h3>
                    </div>
                    <ImageIcon size={40} className="opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Enquiries</p>
                      <h3 className="text-3xl font-bold mt-2">{enquiries.length}</h3>
                    </div>
                    <Users size={40} className="opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">Messages</p>
                      <h3 className="text-3xl font-bold mt-2">{messages.length}</h3>
                    </div>
                    <Mail size={40} className="opacity-50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">New Today</p>
                      <h3 className="text-3xl font-bold mt-2">{enquiries.filter(e => new Date(e.created_at).toDateString() === new Date().toDateString()).length}</h3>
                    </div>
                    <Users size={40} className="opacity-50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button onClick={() => setActiveTab('images')} className="bg-blue-600 hover:bg-blue-700">
                    Manage Website Images
                  </Button>
                  <Button onClick={() => setActiveTab('enquiries')} variant="outline" className="border-blue-600 text-blue-600">
                    View Enquiries
                  </Button>
                  <Button onClick={() => setActiveTab('messages')} variant="outline" className="border-blue-600 text-blue-600">
                    View Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-2">📸 Complete Image Management</h2>
                <p className="text-blue-100">Upload and manage all website images including hero banners, about section, director photo, and gallery images</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Upload New Photo</h2>
                <form onSubmit={handleUpload} className="space-y-6">
                  <div>
                    <Label>Image Type *</Label>
                    <Select
                      value={uploadData.imageType}
                      onValueChange={(value) => setUploadData({ ...uploadData, imageType: value, category: value === 'gallery' ? 'classroom' : 'hero' })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gallery">Gallery Images</SelectItem>
                        <SelectItem value="website">Website Section Images</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="file">Select Photo *</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        id="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                      >
                        {uploadData.preview ? (
                          <img
                            src={uploadData.preview}
                            alt="Preview"
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className="flex flex-col items-center">
                            <Upload size={48} className="text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-2">Click to upload photo</p>
                            <p className="text-sm text-gray-500">JPG, PNG or WebP (Max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Photo Title *</Label>
                      <Input
                        id="title"
                        value={uploadData.title}
                        onChange={(e) => setUploadData({ ...uploadData, title: e.target.value })}
                        required
                        className="mt-2"
                        placeholder="Enter photo title"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={uploadData.category}
                        onValueChange={(value) => setUploadData({ ...uploadData, category: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <optgroup label="Gallery Categories">
                            {imageCategories.gallery.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                          <optgroup label="Website Sections">
                            {imageCategories.website.map((cat) => (
                              <SelectItem key={cat.value} value={cat.value}>
                                {cat.label}
                              </SelectItem>
                            ))}
                          </optgroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={uploadData.description}
                      onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                      className="mt-2"
                      rows={3}
                      placeholder="Brief description of the photo"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white btn-hover text-lg py-6"
                  >
                    {loading ? 'Uploading...' : 'Upload Photo'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Display Photos by Category */}
            <div className="space-y-6">
              {Object.entries(groupedPhotos).map(([category, categoryPhotos]) => (
                <Card key={category}>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6 capitalize">
                      {category.replace('-', ' ')} ({categoryPhotos.length})
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {categoryPhotos.map((photo) => (
                        <div key={photo.id} className="relative group">
                          <img
                            src={`${BACKEND_URL}${photo.file_url}`}
                            alt={photo.title}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          <p className="text-xs mt-2 text-gray-600 truncate">{photo.title}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Enquiries Tab - Same as before */}
          <TabsContent value="enquiries">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Admission Enquiries ({enquiries.length})</h2>
                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Student Name</p>
                            <p className="font-semibold">{enquiry.student_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Parent Name</p>
                            <p className="font-semibold">{enquiry.parent_name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold">{enquiry.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-semibold">{enquiry.phone}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Grade</p>
                            <p className="font-semibold">{enquiry.grade}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {enquiry.message && (
                          <div className="mt-4">
                            <p className="text-sm text-gray-500">Message</p>
                            <p className="text-gray-700">{enquiry.message}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab - Same as before */}
          <TabsContent value="messages">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Contact Messages ({messages.length})</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card key={message.id} className="bg-gray-50">
                      <CardContent className="p-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-semibold">{message.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-semibold">{message.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-semibold">{message.phone || 'N/A'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">{new Date(message.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Subject</p>
                          <p className="font-semibold text-lg">{message.subject}</p>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm text-gray-500">Message</p>
                          <p className="text-gray-700">{message.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
