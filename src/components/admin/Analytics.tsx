import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock,
  Users,
  MapPin,
  Calendar,
  Target,
  Award,
  AlertTriangle
} from 'lucide-react';

export function Analytics() {
  const monthlyStats = {
    currentMonth: {
      reported: 156,
      resolved: 134,
      pending: 22,
      avgResponseTime: 2.3
    },
    lastMonth: {
      reported: 143,
      resolved: 118,
      pending: 25,
      avgResponseTime: 2.8
    }
  };

  const categoryStats = [
    { category: 'Roads & Potholes', count: 45, percentage: 28.8, trend: 'up', change: '+12%' },
    { category: 'Sanitation', count: 38, percentage: 24.4, trend: 'down', change: '-5%' },
    { category: 'Street Lighting', count: 32, percentage: 20.5, trend: 'up', change: '+8%' },
    { category: 'Drainage', count: 24, percentage: 15.4, trend: 'up', change: '+15%' },
    { category: 'Traffic', count: 17, percentage: 10.9, trend: 'down', change: '-3%' }
  ];

  const performanceMetrics = [
    { 
      title: 'Resolution Rate',
      value: '87%',
      change: '+5%',
      trend: 'up',
      description: 'Issues resolved within SLA'
    },
    {
      title: 'Avg Response Time',
      value: '2.3 days',
      change: '-0.5d',
      trend: 'up',
      description: 'Time to first response'
    },
    {
      title: 'Citizen Satisfaction',
      value: '4.2/5',
      change: '+0.3',
      trend: 'up',
      description: 'Average rating from citizens'
    },
    {
      title: 'Escalation Rate',
      value: '12%',
      change: '-3%',
      trend: 'up',
      description: 'Issues escalated to higher authorities'
    }
  ];

  const areaStats = [
    { area: 'Koramangala', issues: 34, resolved: 28, percentage: 82 },
    { area: 'Whitefield', issues: 29, resolved: 25, percentage: 86 },
    { area: 'Indiranagar', issues: 25, resolved: 20, percentage: 80 },
    { area: 'Jayanagar', issues: 22, resolved: 19, percentage: 86 },
    { area: 'Marathahalli', issues: 19, resolved: 16, percentage: 84 }
  ];

  const timelineData = [
    { month: 'Aug', reported: 120, resolved: 110 },
    { month: 'Sep', reported: 135, resolved: 125 },
    { month: 'Oct', reported: 143, resolved: 140 },
    { month: 'Nov', reported: 156, resolved: 148 },
    { month: 'Dec', reported: 162, resolved: 155 },
    { month: 'Jan', reported: 156, resolved: 134 }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl text-blue-600 mb-1">{monthlyStats.currentMonth.reported}</div>
            <div className="text-sm text-gray-600">This Month</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+9%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl text-green-600 mb-1">{monthlyStats.currentMonth.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+14%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-amber-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl text-amber-600 mb-1">{monthlyStats.currentMonth.avgResponseTime}d</div>
            <div className="text-sm text-gray-600">Avg Response</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">-18%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl text-purple-600 mb-1">87%</div>
            <div className="text-sm text-gray-600">Resolution Rate</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+5%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-green-900">{metric.title}</h4>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="text-2xl text-green-600">{metric.value}</div>
                <p className="text-sm text-gray-600">{metric.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Issues by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryStats.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-green-900">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{category.count} issues</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(category.trend)}
                      <span className={`text-sm ${getTrendColor(category.trend)}`}>
                        {category.change}
                      </span>
                    </div>
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
                <div className="text-xs text-gray-500">{category.percentage}% of total issues</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Area-wise Performance */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Area-wise Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {areaStats.map((area, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-green-900 mb-1">{area.area}</div>
                  <div className="text-sm text-gray-600">
                    {area.resolved} resolved out of {area.issues} issues
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl text-green-600">{area.percentage}%</div>
                  <div className="text-xs text-gray-500">Resolution Rate</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Monthly Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-64 bg-gradient-to-t from-green-50 to-blue-50 border border-green-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-green-600">
                <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg">Interactive Chart</p>
                <p className="text-sm">Recharts integration for detailed analytics</p>
                <div className="mt-4 grid grid-cols-6 gap-2 text-xs">
                  {timelineData.map((data, index) => (
                    <div key={index} className="text-center">
                      <div className="text-green-600">{data.month}</div>
                      <div className="text-gray-600">R: {data.reported}</div>
                      <div className="text-blue-600">S: {data.resolved}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Issues Reported</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Issues Resolved</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Performance */}
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl text-blue-600 mb-1">3,420</div>
              <div className="text-sm text-blue-700">Active Citizens</div>
              <div className="text-xs text-gray-600 mt-1">+245 this month</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl text-green-600 mb-1">95%</div>
              <div className="text-sm text-green-700">System Uptime</div>
              <div className="text-xs text-gray-600 mt-1">Last 30 days</div>
            </div>
            
            <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
              <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl text-amber-600 mb-1">22</div>
              <div className="text-sm text-amber-700">Pending Issues</div>
              <div className="text-xs text-gray-600 mt-1">Needs attention</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}