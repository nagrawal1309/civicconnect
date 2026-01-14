import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Trophy, 
  Star, 
  Medal, 
  Award, 
  Target, 
  TrendingUp,
  Users,
  MapPin,
  CheckCircle,
  Zap
} from 'lucide-react';

export function Gamification() {
  const userStats = {
    points: 450,
    rank: 15,
    totalReports: 12,
    resolvedIssues: 8,
    streakDays: 5,
    level: 3
  };

  const badges = [
    { 
      id: 1, 
      name: 'First Reporter', 
      description: 'Submit your first issue report', 
      icon: <Star className="h-6 w-6" />, 
      earned: true, 
      earnedDate: '2024-01-01',
      color: 'text-yellow-600 bg-yellow-100'
    },
    { 
      id: 2, 
      name: 'Problem Solver', 
      description: 'Get 5 issues resolved', 
      icon: <CheckCircle className="h-6 w-6" />, 
      earned: true, 
      earnedDate: '2024-01-08',
      color: 'text-green-600 bg-green-100'
    },
    { 
      id: 3, 
      name: 'Community Champion', 
      description: 'Submit 10 issue reports', 
      icon: <Users className="h-6 w-6" />, 
      earned: true, 
      earnedDate: '2024-01-12',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      id: 4, 
      name: 'Quick Response', 
      description: 'Report resolved within 24 hours', 
      icon: <Zap className="h-6 w-6" />, 
      earned: false,
      color: 'text-purple-600 bg-purple-100'
    },
    { 
      id: 5, 
      name: 'Community Hero', 
      description: 'Maintain 7-day reporting streak', 
      icon: <Medal className="h-6 w-6" />, 
      earned: false,
      color: 'text-red-600 bg-red-100'
    },
    { 
      id: 6, 
      name: 'Area Expert', 
      description: 'Report 20 issues in your locality', 
      icon: <MapPin className="h-6 w-6" />, 
      earned: false,
      color: 'text-indigo-600 bg-indigo-100'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Raj Kumar', points: 1250, reports: 45, avatar: 'RK' },
    { rank: 2, name: 'Priya Singh', points: 980, reports: 38, avatar: 'PS' },
    { rank: 3, name: 'Amit Sharma', points: 875, reports: 32, avatar: 'AS' },
    { rank: 4, name: 'Neha Gupta', points: 720, reports: 28, avatar: 'NG' },
    { rank: 5, name: 'Vikram Rao', points: 650, reports: 25, avatar: 'VR' },
    { rank: 15, name: 'You', points: 450, reports: 12, avatar: 'YU' }, // Current user
  ];

  const nextLevelProgress = ((userStats.points % 200) / 200) * 100;
  const pointsToNextLevel = 200 - (userStats.points % 200);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-yellow-600" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Award className="h-5 w-5 text-amber-600" />;
    return <span className="h-5 w-5 flex items-center justify-center text-sm font-medium text-gray-600">#{rank}</span>;
  };

  return (
    <div className="space-y-6">
      {/* User Level and Progress */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl mb-1">Level {userStats.level}</h2>
              <p className="text-purple-100">Civic Champion</p>
            </div>
            <div className="text-right">
              <div className="text-3xl">{userStats.points}</div>
              <div className="text-sm text-purple-100">Total Points</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{pointsToNextLevel} points needed</span>
            </div>
            <Progress value={nextLevelProgress} className="h-2 bg-purple-200" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl text-blue-600 mb-1">#{userStats.rank}</div>
            <div className="text-sm text-gray-600">Global Rank</div>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl text-green-600 mb-1">{userStats.resolvedIssues}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card className="border-purple-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl text-purple-600 mb-1">{userStats.totalReports}</div>
            <div className="text-sm text-gray-600">Reports</div>
          </CardContent>
        </Card>
        <Card className="border-amber-200">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <div className="text-2xl text-amber-600 mb-1">{userStats.streakDays}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Medal className="h-5 w-5" />
            Your Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`${badge.earned ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'} transition-all hover:shadow-md`}
              >
                <CardContent className="p-4 text-center">
                  <div className={`inline-flex p-3 rounded-full mb-3 ${badge.color} ${!badge.earned && 'opacity-50 grayscale'}`}>
                    {badge.icon}
                  </div>
                  <h3 className={`font-medium mb-1 ${badge.earned ? 'text-green-900' : 'text-gray-600'}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs ${badge.earned ? 'text-green-700' : 'text-gray-500'}`}>
                    {badge.description}
                  </p>
                  {badge.earned && badge.earnedDate && (
                    <Badge variant="outline" className="mt-2 border-green-200 text-green-700 text-xs">
                      Earned {badge.earnedDate}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Community Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center gap-4 p-3 rounded-lg ${user.name === 'You' ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  {getRankIcon(user.rank)}
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={user.name === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white'}>
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${user.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                      {user.name}
                    </span>
                    {user.name === 'You' && (
                      <Badge variant="outline" className="border-blue-200 text-blue-700 text-xs">
                        You
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{user.reports} reports submitted</p>
                </div>
                
                <div className="text-right">
                  <div className={`font-medium ${user.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                    {user.points}
                  </div>
                  <p className="text-xs text-gray-500">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}