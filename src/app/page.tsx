"use client";

import ControlPanel from "@/components/ControlPanel";
import WebcamCapture from "@/components/WebcamCapture";
import FaceResults from "@/components/FaceResults";
import {
  Activity,
  Camera,
  Settings,
  User,
  Brain,
  Database,
  Command,
  Menu,
  Gauge,
  Cpu,
  X,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background/50 flex overflow-hidden">
      {/* Sidebar - Collapsible */}
      <div
        className={`${
          sidebarCollapsed ? "w-14" : "w-56"
        } hidden lg:flex flex-col border-r bg-card/95 shadow-sm h-screen sticky top-0 transition-all duration-300 z-30`}
      >
        <div
          className={`p-3 flex ${
            sidebarCollapsed ? "justify-center" : "items-center gap-2"
          } border-b`}
        >
          <Command className="h-4 w-4 text-primary" />
          {!sidebarCollapsed && (
            <span className="font-outfit font-semibold text-primary">
              Voicera
            </span>
          )}
        </div>

        <nav className="flex-1 p-2">
          <div
            className={`px-1 py-2 ${
              sidebarCollapsed ? "flex flex-col items-center" : ""
            }`}
          >
            {!sidebarCollapsed && (
              <p className="text-[11px] font-medium text-muted-foreground mb-2 uppercase px-1">
                Navigation
              </p>
            )}
            <div className="space-y-1 w-full">
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-primary font-medium text-xs h-8 hover:bg-primary/10`}
              >
                <LayoutDashboard
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-xs h-8 hover:bg-accent/50`}
              >
                <Camera
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Recognition</span>}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-xs h-8 hover:bg-accent/50`}
              >
                <Brain
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Models</span>}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-xs h-8 hover:bg-accent/50`}
              >
                <Database
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Database</span>}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-xs h-8 hover:bg-accent/50`}
              >
                <Activity
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Analytics</span>}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-0" : "justify-start"
                } text-xs h-8 hover:bg-accent/50`}
              >
                <Settings
                  className={`${sidebarCollapsed ? "" : "mr-2"} h-3.5 w-3.5`}
                />
                {!sidebarCollapsed && <span>Settings</span>}
              </Button>
            </div>
          </div>
        </nav>

        <div
          className={`p-3 border-t mt-auto ${
            sidebarCollapsed ? "flex justify-center" : ""
          }`}
        >
          {sidebarCollapsed ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setSidebarCollapsed(false)}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-3 w-3 text-primary" />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium">Admin</p>
                  <p className="text-[10px] text-muted-foreground">System</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setSidebarCollapsed(true)}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setShowMobileMenu(false)}
        >
          <div
            className="h-full w-64 bg-card p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Command className="h-4 w-4 text-primary" />
                <span className="font-outfit font-semibold text-primary">
                  Voicera
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowMobileMenu(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase">
                  Navigation
                </p>
                <div className="space-y-1">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-primary text-xs h-8 hover:bg-primary/10"
                  >
                    <LayoutDashboard className="mr-2 h-3.5 w-3.5" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Camera className="mr-2 h-3.5 w-3.5" />
                    Recognition
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Brain className="mr-2 h-3.5 w-3.5" />
                    Models
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Database className="mr-2 h-3.5 w-3.5" />
                    Database
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Activity className="mr-2 h-3.5 w-3.5" />
                    Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-xs h-8"
                  >
                    <Settings className="mr-2 h-3.5 w-3.5" />
                    Settings
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-10 border-b bg-card/90 backdrop-blur-sm sticky top-0 z-30 flex items-center px-3 shadow-sm">
          <div className="flex items-center gap-2 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 lg:hidden"
              onClick={() => setShowMobileMenu(true)}
            >
              <Menu className="h-4 w-4" />
            </Button>
            <div className="font-outfit font-semibold text-primary text-sm">
              Voicera
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1.5">
              <LayoutDashboard className="h-3 w-3" />
              Dashboard
            </Button>
            <span className="text-muted-foreground text-xs">/</span>
            <span className="text-xs">Facial Recognition</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 text-xs gap-1.5 hidden sm:flex"
            >
              <Cpu className="h-3 w-3" />
              System: Online
            </Button>
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-primary" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-3 overflow-auto bg-muted/5">
          <div className="mx-auto max-w-7xl space-y-3">
            {/* Control Panel Section */}
            <div className="grid grid-cols-1 gap-3">
              <ControlPanel />
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Webcam Area - Takes 8/12 on large screens */}
              <div className="lg:col-span-8">
                <Card className="overflow-hidden shadow-sm border h-[400px] sm:h-[450px]">
                  <CardHeader className="p-2 border-b flex-row items-center justify-between space-y-0 bg-card/95">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                      <CardTitle className="text-xs">
                        Facial Recognition Feed
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[10px] m-0">
                      Real-time detection
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 h-full flex overflow-hidden">
                    <WebcamCapture />
                  </CardContent>
                </Card>
              </div>

              {/* Results Area - Takes 4/12 on large screens */}
              <div className="lg:col-span-4">
                <Card className="h-[400px] sm:h-[450px] flex flex-col shadow-sm border">
                  <CardHeader className="p-2 border-b space-y-0 bg-card/95">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs flex items-center gap-1.5">
                        <Brain className="h-3 w-3 text-primary" />
                        Analysis Results
                      </CardTitle>
                      <CardDescription className="text-[10px] m-0">
                        Emotion detection
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="p-2 pt-3 flex-1 overflow-auto">
                    <FaceResults />
                  </CardContent>
                </Card>
              </div>

              {/* Dashboard Stats Row */}
              <div className="lg:col-span-12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        System Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Active</div>
                        <div className="h-6 w-6 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                          <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Processing
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Real-time</div>
                        <div className="h-6 w-6 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
                          <Activity className="h-3 w-3 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        CPU Load
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">28%</div>
                        <div className="h-6 w-6 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center">
                          <Cpu className="h-3 w-3 text-amber-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Data Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">12,345</div>
                        <div className="h-6 w-6 bg-purple-50 dark:bg-purple-500/10 rounded-full flex items-center justify-center">
                          <Database className="h-3 w-3 text-purple-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Additional Stats Row */}
              <div className="lg:col-span-12">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Uptime
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">99.99%</div>
                        <div className="h-6 w-6 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                          <Gauge className="h-3 w-3 text-green-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Response Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">120ms</div>
                        <div className="h-6 w-6 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
                          <ArrowUpRight className="h-3 w-3 text-blue-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Error Rate
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">0.01%</div>
                        <div className="h-6 w-6 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center">
                          <X className="h-3 w-3 text-red-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/95 shadow-sm border">
                    <CardHeader className="p-2 pb-0">
                      <CardTitle className="text-[10px] text-muted-foreground font-normal">
                        Data Processed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-2 pt-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">1.2TB</div>
                        <div className="h-6 w-6 bg-yellow-50 dark:bg-yellow-500/10 rounded-full flex items-center justify-center">
                          <BarChart3 className="h-3 w-3 text-yellow-500" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
