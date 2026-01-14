import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Map, 
  MapPin, 
  Filter, 
  Layers,
  AlertTriangle,
  Clock,
  CheckCircle,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

export function MapView() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issuesOnMap = [
    {
      id: 'CIV-2024-8789',
      title: 'Water logging on Brigade Road',
      category: 'Drainage',
      status: 'pending',
      priority: 'high',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      submittedTime: '2 hours ago',
      description: 'Severe water logging causing traffic disruption'
    },
    {
      id: 'CIV-2024-8788',
      title: 'Broken traffic signal',
      category: 'Traffic',
      status: 'in-progress',
      priority: 'high',
      coordinates: { lat: 12.9279, lng: 77.6271 },
      submittedTime: '4 hours ago',
      description: 'Traffic signal not functioning at major junction'
    },
    {
      id: 'CIV-2024-8787',
      title: 'Street light not working',
      category: 'Electricity',
      status: 'pending',
      priority: 'medium',
      coordinates: { lat: 12.9352, lng: 77.6245 },
      submittedTime: '6 hours ago',
      description: 'Multiple street lights out in residential area'
    },
    {
      id: 'CIV-2024-8786',
      title: 'Pothole on main road',
      category: 'Roads',
      status: 'resolved',
      priority: 'low',
      coordinates: { lat: 12.9698, lng: 77.7500 },
      submittedTime: '1 day ago',
      description: 'Large pothole filled and road repaired'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 bg-amber-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <AlertTriangle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-500';
      case 'medium': return 'border-amber-400 bg-amber-500';
      case 'low': return 'border-green-400 bg-green-500';
      default: return 'border-gray-400 bg-gray-500';
    }
  };

  const filteredIssues = selectedFilter === 'all' 
    ? issuesOnMap 
    : issuesOnMap.filter(issue => issue.status === selectedFilter);

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Map className="h-5 w-5" />
            Live Issue Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-green-600" />
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-40 border-green-200">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-green-600" />
              <Select defaultValue="satellite">
                <SelectTrigger className="w-32 border-green-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satellite">Satellite</SelectItem>
                  <SelectItem value="street">Street</SelectItem>
                  <SelectItem value="terrain">Terrain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map View */}
        <div className="lg:col-span-2">
          <Card className="border-green-200 h-[600px]">
            <CardContent className="p-4 h-full">
              <div className="relative h-full bg-green-50 rounded-lg border-2 border-dashed border-green-200 overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100" />
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                  <Button size="sm" variant="outline" className="bg-white border-green-200">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white border-green-200">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white border-green-200">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Issue Markers */}
                {filteredIssues.map((issue, index) => (
                  <div
                    key={issue.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20`}
                    style={{
                      left: `${30 + (index * 15)}%`,
                      top: `${40 + (index * 10)}%`
                    }}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 ${getPriorityColor(issue.priority)} shadow-lg flex items-center justify-center animate-pulse`}>
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                    {selectedIssue?.id === issue.id && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white border border-green-200 rounded-lg p-3 shadow-lg min-w-48 z-30">
                        <div className="text-sm font-medium text-green-900 mb-1">{issue.title}</div>
                        <div className="text-xs text-gray-600 mb-2">{issue.description}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(issue.status)}>
                            {getStatusIcon(issue.status)}
                            {issue.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{issue.submittedTime}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Map Center Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="text-center text-green-600">
                    <Map className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-lg">Google Maps Integration</p>
                    <p className="text-sm">PostGIS Geo-queries for location data</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issue List */}
        <div className="space-y-4">
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900 text-lg">
                Issues on Map ({filteredIssues.length})
              </CardTitle>
            </CardHeader>
          </Card>

          {filteredIssues.map((issue) => (
            <Card 
              key={issue.id} 
              className={`border-green-200 cursor-pointer transition-all hover:shadow-md ${selectedIssue?.id === issue.id ? 'ring-2 ring-green-300 bg-green-50' : ''}`}
              onClick={() => setSelectedIssue(issue)}
            >
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-green-900">{issue.title}</h4>
                    <Badge variant="outline" className={getStatusColor(issue.status)}>
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">{issue.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{issue.category}</span>
                    <span>{issue.submittedTime}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${getPriorityColor(issue.priority).replace('bg-', 'text-').replace('border-', 'border-')} border`}>
                      {issue.priority} priority
                    </Badge>
                    <span className="text-xs text-gray-500">ID: {issue.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Map Legend */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 text-lg">Map Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-400" />
              <span className="text-sm">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-amber-400" />
              <span className="text-sm">Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-green-400" />
              <span className="text-sm">Low Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500 border-2 border-gray-400" />
              <span className="text-sm">Resolved</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}