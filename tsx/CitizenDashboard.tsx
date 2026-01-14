import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CitizenHome } from './citizen/CitizenHome';
import { ReportIssue } from './citizen/ReportIssue';
import { TrackIssues } from './citizen/TrackIssues';
import { Gamification } from './citizen/Gamification';
import { Home, Plus, FileText, Trophy } from 'lucide-react';

interface CitizenDashboardProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function CitizenDashboard({ activeTab, setActiveTab }: CitizenDashboardProps) {
  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-blue-200 shadow-lg z-40">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-white rounded-none">
            <TabsTrigger 
              value="home" 
              className="flex-col gap-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger 
              value="report" 
              className="flex-col gap-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs">Report</span>
            </TabsTrigger>
            <TabsTrigger 
              value="track" 
              className="flex-col gap-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs">Track</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rewards" 
              className="flex-col gap-1 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700"
            >
              <Trophy className="h-5 w-5" />
              <span className="text-xs">Rewards</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-blue-200">
            <TabsTrigger value="home" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Home className="h-4 w-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="report" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Report Issue
            </TabsTrigger>
            <TabsTrigger value="track" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <FileText className="h-4 w-4 mr-2" />
              Track Issues
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <Trophy className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content */}
        <div className="pb-20 md:pb-0">
          <TabsContent value="home" className="mt-0">
            <CitizenHome onNavigate={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="report" className="mt-0">
            <ReportIssue />
          </TabsContent>
          
          <TabsContent value="track" className="mt-0">
            <TrackIssues />
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-0">
            <Gamification />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}