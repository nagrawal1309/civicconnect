import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Camera, 
  MapPin, 
  Mic, 
  AlertTriangle, 
  Upload, 
  Navigation,
  FileText,
  CheckCircle
} from 'lucide-react';

export function ReportIssue() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { value: 'pothole', label: 'Potholes & Road Damage' },
    { value: 'garbage', label: 'Garbage & Sanitation' },
    { value: 'streetlight', label: 'Street Lighting' },
    { value: 'water', label: 'Water Supply' },
    { value: 'electricity', label: 'Electricity' },
    { value: 'traffic', label: 'Traffic Issues' },
    { value: 'drainage', label: 'Drainage & Sewage' },
    { value: 'other', label: 'Other' }
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Simulate duplicate detection
    if (category === 'pothole' && Math.random() > 0.5) {
      setShowDuplicateWarning(true);
    } else {
      setShowDuplicateWarning(false);
    }
  };

  const handleGetLocation = () => {
    setCurrentLocation('123 MG Road, Bangalore, Karnataka - 560001');
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl text-green-900 mb-2">Issue Reported Successfully!</h3>
          <p className="text-green-700 mb-4">
            Your report has been submitted and assigned ticket #CIV-2024-{Math.floor(Math.random() * 10000)}
          </p>
          <div className="space-y-2 text-sm text-green-600">
            <p>✅ Photo uploaded and processed</p>
            <p>✅ Location marked on map</p>
            <p>✅ Assigned to local authority</p>
            <p>✅ +25 points added to your account</p>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="mt-6 bg-green-600 hover:bg-green-700"
          >
            Report Another Issue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Report a Civic Issue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Issue Category</Label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="border-blue-200">
                <SelectValue placeholder="Select issue category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duplicate Warning */}
          {showDuplicateWarning && (
            <Alert className="border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                <strong>Similar issue detected nearby!</strong><br />
                There's a pothole report 50m away from your location. 
                Do you want to continue or add details to the existing report?
              </AlertDescription>
            </Alert>
          )}

          {/* Photo Capture */}
          <div className="space-y-3">
            <Label>Photo Evidence</Label>
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
              {!hasPhoto ? (
                <div className="space-y-3">
                  <Camera className="h-12 w-12 text-blue-400 mx-auto" />
                  <div>
                    <p className="text-blue-600">Take a photo of the issue</p>
                    <p className="text-sm text-gray-500">Clear photos help authorities respond faster</p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setHasPhoto(true)}
                      className="border-blue-200 text-blue-600"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Camera
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setHasPhoto(true)}
                      className="border-blue-200 text-blue-600"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Gallery
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob2xlJTIwcm9hZCUyMGRhbWFnZXxlbnwxfHx8fDE3NTc5NDk2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Captured issue"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Badge variant="outline" className="border-green-200 text-green-700">
                    Photo captured
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-3">
            <Label>Location</Label>
            <div className="space-y-3">
              {!currentLocation ? (
                <Button 
                  variant="outline" 
                  onClick={handleGetLocation}
                  className="w-full border-blue-200 text-blue-600"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Current Location
                </Button>
              ) : (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-green-800">{currentLocation}</p>
                      <p className="text-xs text-green-600">Location confirmed with GPS</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Mock Map */}
              <div className="h-32 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-blue-600">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Google Maps Integration</p>
                  <p className="text-xs">Interactive map with pin marking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label>Description</Label>
            <Textarea
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-blue-200 min-h-20"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={`border-blue-200 ${isRecording ? 'bg-red-50 text-red-600 border-red-200' : 'text-blue-600'}`}
              >
                <Mic className="h-4 w-4 mr-2" />
                {isRecording ? 'Stop Recording' : 'Voice Input'}
              </Button>
              {isRecording && (
                <Badge variant="outline" className="border-red-200 text-red-600 bg-red-50">
                  Recording...
                </Badge>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button 
            onClick={handleSubmit}
            disabled={!selectedCategory || !description || !hasPhoto || !currentLocation}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
          >
            Submit Issue Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}