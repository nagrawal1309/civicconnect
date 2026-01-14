import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { AdminHome } from './admin/AdminHome';
import { IssueManagement } from './admin/IssueManagement';
import { Analytics } from './admin/Analytics';
import { MapView } from './admin/MapView';
import { LayoutDashboard, Map, FileText, BarChart3 } from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Navigation */}
        <div className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-green-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <Map className="h-4 w-4 mr-2" />
              Map View
            </TabsTrigger>
            <TabsTrigger value="issues" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <FileText className="h-4 w-4 mr-2" />
              Issues
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <TabsContent value="dashboard" className="mt-0">
          <AdminHome />
        </TabsContent>
        
        <TabsContent value="map" className="mt-0">
          <MapView />
        </TabsContent>
        
        <TabsContent value="issues" className="mt-0">
          <IssueManagement />
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <Analytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}