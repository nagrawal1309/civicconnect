import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { AuthScreen } from './components/AuthScreen';
import { CitizenDashboard } from './components/CitizenDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { Shield, User, LogOut } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'citizen' | 'admin'>('citizen');
  const [activeTab, setActiveTab] = useState('home');

  const handleLogin = (role: 'citizen' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab('home');
  };

  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl text-blue-900">CivicConnect</h1>
              <p className="text-sm text-green-700">Crowdsourced Civic Solutions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-blue-200 text-blue-700">
              {userRole === 'citizen' ? <User className="h-3 w-3 mr-1" /> : <Shield className="h-3 w-3 mr-1" />}
              {userRole === 'citizen' ? 'Citizen' : 'Admin'}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="text-blue-600 hover:text-blue-800"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {userRole === 'citizen' ? (
          <CitizenDashboard activeTab={activeTab} setActiveTab={setActiveTab} />
        ) : (
          <AdminDashboard />
        )}
      </div>

      {/* Tech Stack Info */}
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg max-w-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-blue-900">Tech Stack</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-blue-700 space-y-1">
              <div>• React.js + TypeScript</div>
              <div>• Node.js + Express</div>
              <div>• PostgreSQL + PostGIS</div>
              <div>• Aadhaar Authentication</div>
              <div>• Google Maps API</div>
              <div>• Firebase Storage</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}