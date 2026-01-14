import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Search, 
  Filter, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MoreHorizontal,
  ArrowUp,
  MessageSquare,
  Calendar
} from 'lucide-react';

export function TrackIssues() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const issues = [
    {
      id: 'CIV-2024-8745',
      title: 'Broken streetlight on MG Road',
      category: 'Electricity',
      status: 'resolved',
      priority: 'medium',
      submittedDate: '2024-01-10',
      resolvedDate: '2024-01-12',
      progress: 100,
      description: 'Street light pole #45 not working since 3 days',
      updates: [
        { date: '2024-01-12', message: 'Issue resolved - New LED bulb installed', status: 'resolved' },
        { date: '2024-01-11', message: 'Technician assigned - Work in progress', status: 'in-progress' },
        { date: '2024-01-10', message: 'Issue reported and verified', status: 'pending' }
      ]
    },
    {
      id: 'CIV-2024-8756',
      title: 'Large pothole near City Mall entrance',
      category: 'Roads',
      status: 'in-progress',
      priority: 'high',
      submittedDate: '2024-01-08',
      progress: 65,
      description: 'Deep pothole causing traffic issues and vehicle damage',
      updates: [
        { date: '2024-01-11', message: 'Road repair crew scheduled for tomorrow', status: 'in-progress' },
        { date: '2024-01-09', message: 'Issue escalated to PWD department', status: 'in-progress' },
        { date: '2024-01-08', message: 'Issue reported and acknowledged', status: 'pending' }
      ]
    },
    {
      id: 'CIV-2024-8734',
      title: 'Garbage pile accumulation on Park Street',
      category: 'Sanitation',
      status: 'pending',
      priority: 'medium',
      submittedDate: '2024-01-05',
      progress: 20,
      description: 'Large garbage pile blocking footpath for over a week',
      updates: [
        { date: '2024-01-07', message: 'Forwarded to sanitation department', status: 'pending' },
        { date: '2024-01-05', message: 'Issue reported and documented', status: 'pending' }
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
                         issue.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const canEscalate = (issue: any) => {
    const daysSinceSubmitted = Math.floor((new Date().getTime() - new Date(issue.submittedDate).getTime()) / (1000 * 3600 * 24));
    return issue.status !== 'resolved' && daysSinceSubmitted >= 7;
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Track Your Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-blue-200"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'pending', 'in-progress', 'resolved'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
                className={filter === status ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-200 text-blue-600'}
              >
                {status === 'all' ? 'All Issues' : status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <Card key={issue.id} className="border-blue-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(issue.status)}
                    <h3 className="text-lg text-blue-900">{issue.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Badge variant="outline" className="border-blue-200 text-blue-700">
                      {issue.category}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                      {issue.priority} priority
                    </Badge>
                    <span>ID: {issue.id}</span>
                  </div>
                </div>
                <Badge variant="outline" className={getStatusColor(issue.status)}>
                  {issue.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-gray-700">{issue.description}</p>
              
              {/* Progress */}
              {issue.status !== 'resolved' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{issue.progress}%</span>
                  </div>
                  <Progress value={issue.progress} className="h-2" />
                </div>
              )}

              {/* Timeline */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-blue-900">Recent Updates</h4>
                <div className="space-y-2">
                  {issue.updates.slice(0, 2).map((update, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {update.date}
                      </div>
                      <p className="text-sm text-gray-700 flex-1">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-600">
                  <MoreHorizontal className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                {canEscalate(issue) && (
                  <Button variant="outline" size="sm" className="border-red-200 text-red-600">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    Escalate
                  </Button>
                )}
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