import { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Photos' },
    { value: 'classroom', label: 'Classrooms' },
    { value: 'events', label: 'Events' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'sports', label: 'Sports' },
    { value: 'activities', label: 'Activities' },
    { value: 'campus', label: 'Campus' }
  ];

  useEffect(() => {
    fetchPhotos();
  }, [selectedCategory]);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const url = selectedCategory === 'all' ? `${API}/photos` : `${API}/photos?category=${selectedCategory}`;
      const response = await axios.get(url);
      setPhotos(response.data.photos || []);
    } catch (error) {
      console.error('Error fetching photos:', error);
      toast.error('Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 md:mt-24 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 text-center">
          Photo <span className="text-blue-600">Gallery</span>
        </h1>

        {/* Category Filter */}
        <div className="mb-6 max-w-md mx-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Photos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No photos found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden card-hover">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={`${BACKEND_URL}${photo.file_url}`}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{photo.title}</h3>
                    {photo.description && (
                      <p className="text-sm text-gray-600">{photo.description}</p>
                    )}
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {photo.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
