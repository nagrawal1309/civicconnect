import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Search,
  Filter,
  Eye,
  Edit,
  ArrowUp,
  MessageSquare,
  User,
  MapPin,
  Calendar,
  Camera,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

export function IssueManagement() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateNote, setUpdateNote] = useState('');

  const issues = [
    {
      id: 'CIV-2024-8789',
      title: 'Water logging on Brigade Road',
      category: 'Drainage',
      status: 'pending',
      priority: 'high',
      submittedDate: '2024-01-15',
      submittedTime: '2 hours ago',
      location: 'Brigade Road, Bangalore',
      coordinates: '12.9716, 77.5946',
      description: 'Severe water logging on Brigade Road causing major traffic disruption during monsoon. Water level reaches up to 2 feet in some areas.',
      reporterName: 'Raj Kumar',
      reporterPhone: '+91 9876543210',
      photo: 'https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob2xlJTIwcm9hZCUyMGRhbWFnZXxlbnwxfHx8fDE3NTc5NDk2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      updates: [
        { date: '2024-01-15', message: 'Issue reported and verified', status: 'pending', updatedBy: 'System' }
      ]
    },
    {
      id: 'CIV-2024-8788',
      title: 'Broken traffic signal at Silk Board',
      category: 'Traffic',
      status: 'in-progress',
      priority: 'high',
      submittedDate: '2024-01-14',
      submittedTime: '4 hours ago',
      location: 'Silk Board Junction, Bangalore',
      coordinates: '12.9279, 77.6271',
      description: 'Traffic signal completely non-functional at major junction causing severe traffic congestion and safety concerns.',
      reporterName: 'Priya Singh',
      reporterPhone: '+91 9876543211',
      photo: 'https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob2xlJTIwcm9hZCUyMGRhbWFnZXxlbnwxfHx8fDE3NTc5NDk2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      updates: [
        { date: '2024-01-15', message: 'Technician assigned, repair in progress', status: 'in-progress', updatedBy: 'Traffic Dept' },
        { date: '2024-01-14', message: 'Issue escalated to traffic department', status: 'pending', updatedBy: 'Admin' }
      ]
    },
    {
      id: 'CIV-2024-8787',
      title: 'Street light not working in Koramangala',
      category: 'Electricity',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-01-13',
      submittedTime: '6 hours ago',
      location: '5th Block, Koramangala',
      coordinates: '12.9352, 77.6245',
      description: 'Multiple street lights not working in residential area causing safety concerns during night hours.',
      reporterName: 'Amit Sharma',
      reporterPhone: '+91 9876543212',
      photo: 'https://images.unsplash.com/photo-1709934730506-fba12664d4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob2xlJTIwcm9hZCUyMGRhbWFnZXxlbnwxfHx8fDE3NTc5NDk2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      updates: [
        { date: '2024-01-13', message: 'Issue reported and documented', status: 'pending', updatedBy: 'System' }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || issue.status === filter;
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleUpdateStatus = () => {
    if (selectedIssue && updateStatus) {
      // Simulate status update
      console.log('Updating status:', { issueId: selectedIssue.id, status: updateStatus, note: updateNote });
      setUpdateStatus('');
      setUpdateNote('');
      setSelectedIssue(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Issue Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search issues by title, category, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-green-600" />
              <Select value={filter} onValueChange={setFilter}>
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
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
              <div className="text-xl text-amber-600">{issues.filter(i => i.status === 'pending').length}</div>
              <div className="text-xs text-amber-700">Pending</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-xl text-blue-600">{issues.filter(i => i.status === 'in-progress').length}</div>
              <div className="text-xs text-blue-700">In Progress</div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="text-xl text-green-600">{issues.filter(i => i.status === 'resolved').length}</div>
              <div className="text-xs text-green-700">Resolved</div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg border border-red-200">
              <div className="text-xl text-red-600">{issues.filter(i => i.priority === 'high').length}</div>
              <div className="text-xs text-red-700">High Priority</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="border-green-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(issue.status)}
                    <h3 className="text-xl text-green-900">{issue.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Badge variant="outline" className="border-green-200 text-green-700">
                      {issue.category}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                      {issue.priority} priority
                    </Badge>
                    <span>ID: {issue.id}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {issue.reporterName}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {issue.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {issue.submittedTime}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getStatusColor(issue.status)}>
                    {issue.status.replace('-', ' ')}
                  </Badge>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedIssue(issue)}
                        className="border-green-200 text-green-600 hover:bg-green-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-green-900">Issue Details - {issue.id}</DialogTitle>
                      </DialogHeader>
                      
                      {selectedIssue && (
                        <div className="space-y-6">
                          {/* Issue Info */}
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <h3 className="font-medium text-green-900 mb-2">{selectedIssue.title}</h3>
                                <p className="text-gray-700">{selectedIssue.description}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-gray-500">Category:</span>
                                  <div className="font-medium">{selectedIssue.category}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Priority:</span>
                                  <div className="font-medium">{selectedIssue.priority}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Reporter:</span>
                                  <div className="font-medium">{selectedIssue.reporterName}</div>
                                </div>
                                <div>
                                  <span className="text-gray-500">Phone:</span>
                                  <div className="font-medium">{selectedIssue.reporterPhone}</div>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-gray-500">Location:</span>
                                  <div className="font-medium">{selectedIssue.location}</div>
                                  <div className="text-xs text-gray-500">{selectedIssue.coordinates}</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                                  <Camera className="h-4 w-4" />
                                  Photo Evidence
                                </h4>
                                <ImageWithFallback 
                                  src={selectedIssue.photo}
                                  alt="Issue photo"
                                  className="w-full h-48 object-cover rounded-lg border border-green-200"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Update Status */}
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-medium text-green-900 flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Update Status
                            </h4>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  New Status
                                </label>
                                <Select value={updateStatus} onValueChange={setUpdateStatus}>
                                  <SelectTrigger className="border-green-200">
                                    <SelectValue placeholder="Select new status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="resolved">Resolved</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Update Note
                                </label>
                                <Textarea
                                  placeholder="Add a note about this update..."
                                  value={updateNote}
                                  onChange={(e) => setUpdateNote(e.target.value)}
                                  className="border-green-200"
                                />
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                onClick={handleUpdateStatus}
                                disabled={!updateStatus}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Update Status
                              </Button>
                              <Button variant="outline" className="border-amber-200 text-amber-600">
                                <ArrowUp className="h-4 w-4 mr-1" />
                                Escalate
                              </Button>
                            </div>
                          </div>

                          {/* Update History */}
                          <div className="space-y-4 border-t pt-4">
                            <h4 className="font-medium text-green-900">Update History</h4>
                            <div className="space-y-3">
                              {selectedIssue.updates.map((update, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-center gap-2 text-xs text-gray-500 min-w-20">
                                    <Calendar className="h-3 w-3" />
                                    {update.date}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-700">{update.message}</p>
                                    <p className="text-xs text-gray-500 mt-1">Updated by: {update.updatedBy}</p>
                                  </div>
                                  <Badge variant="outline" className={getStatusColor(update.status)}>
                                    {update.status}
                                  </Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <p className="text-gray-700 mb-3">{issue.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Last updated: {issue.updates[0]?.date}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-green-200 text-green-600">
                    <Edit className="h-4 w-4 mr-1" />
                    Update
                  </Button>
                  <Button variant="outline" size="sm" className="border-amber-200 text-amber-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Escalate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <Card className="border-gray-200">
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No issues found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}