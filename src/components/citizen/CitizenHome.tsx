import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Plus, MapPin, Clock, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

interface CitizenHomeProps {
  onNavigate: (tab: string) => void;
}

export function CitizenHome({ onNavigate }: CitizenHomeProps) {
  const userStats = {
    reportsSubmitted: 12,
    issuesResolved: 8,
    points: 450,
    rank: 15,
    badgesEarned: 3
  };

  const recentIssues = [
    { id: 1, title: 'Broken streetlight on MG Road', status: 'resolved', category: 'Electricity', date: '2 days ago' },
    { id: 2, title: 'Pothole near City Mall', status: 'in-progress', category: 'Roads', date: '5 days ago' },
    { id: 3, title: 'Garbage pile on Park Street', status: 'pending', category: 'Sanitation', date: '1 week ago' }
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

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl mb-2">Welcome back!</h2>
              <p className="text-blue-100">Ready to make your community better?</p>
            </div>
            <div className="text-right">
              <div className="text-3xl">{userStats.points}</div>
              <div className="text-sm text-blue-100">Points earned</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Action */}
      <Card className="border-blue-200 shadow-sm">
        <CardContent className="p-6">
          <Button 
            onClick={() => onNavigate('report')} 
            className="w-full h-16 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg"
          >
            <Plus className="h-6 w-6 mr-3" />
            Report a New Issue
          </Button>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-blue-600 mb-1">{userStats.reportsSubmitted}</div>
            <div className="text-sm text-gray-600">Reports</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-green-600 mb-1">{userStats.issuesResolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-purple-600 mb-1">#{userStats.rank}</div>
            <div className="text-sm text-gray-600">Rank</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl text-amber-600 mb-1">{userStats.badgesEarned}</div>
            <div className="text-sm text-gray-600">Badges</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Badge */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Progress to Next Badge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Community Hero (5 more reports)</span>
              <span>83%</span>
            </div>
            <Progress value={83} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Recent Issues */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Your Recent Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(issue.status)}
                    <span className="text-sm">{issue.title}</span>
                  </div>
                  <div className="text-xs text-gray-500">{issue.category} • {issue.date}</div>
                </div>
                <Badge variant="outline" className={getStatusColor(issue.status)}>
                  {issue.status}
                </Badge>
              </div>
            ))}
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('track')}
            className="w-full mt-4 border-blue-200 text-blue-600 hover:bg-blue-50"
          >
            View All Issues
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}