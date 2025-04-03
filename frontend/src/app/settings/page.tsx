"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast, Toaster } from "sonner";
import { 
  Settings, Sliders, Palette, Save, RotateCcw, 
  Monitor, User, Database, Lock, BellRing
} from "lucide-react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Visualization Settings
    defaultNodeSize: 10,
    defaultZoomLevel: 1,
    animationDuration: 750,
    showLabels: true,
    enableDrag: true,
    // Appearance Settings
    colorScheme: "default",
    fontFamily: "Inter",
    buttonRadius: "rounded",
    // Data Settings
    cacheData: true,
    autoRefresh: false,
    storageLimit: 100,
    // Notification Settings
    emailNotifications: false,
    soundEffects: true,
    notifyOnCompletion: true,
  });

  const [initialSettings, setInitialSettings] = useState({ ...settings });
  const [activeTab, setActiveTab] = useState("visualization");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Load saved settings from localStorage if they exist
    const savedSettings = localStorage.getItem("visualizer-settings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      setInitialSettings(parsedSettings);
    }
  }, []);

  useEffect(() => {
    // Check if settings have changed from initial state
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(initialSettings));
  }, [settings, initialSettings]);

  const handleChange = (name: string, value: any) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const saveSettings = () => {
    // Save settings to localStorage
    localStorage.setItem("visualizer-settings", JSON.stringify(settings));
    setInitialSettings({ ...settings });
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const resetSettings = () => {
    setSettings({ ...initialSettings });
    setHasChanges(false);
    toast.info("Changes discarded");
  };

  const resetToDefaults = () => {
    // Reset to initial default settings
    const defaultSettings = {
      defaultNodeSize: 10,
      defaultZoomLevel: 1,
      animationDuration: 750,
      showLabels: true,
      enableDrag: true,
      colorScheme: "default",
      fontFamily: "Inter",
      buttonRadius: "rounded",
      cacheData: true,
      autoRefresh: false,
      storageLimit: 100,
      emailNotifications: false,
      soundEffects: true,
      notifyOnCompletion: true,
    };
    
    setSettings(defaultSettings);
    setHasChanges(true);
    toast.info("Reset to default settings");
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Customize your visualization experience
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <Button 
              variant="outline" 
              onClick={resetSettings}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Discard
            </Button>
          )}
          <Button 
            onClick={saveSettings} 
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="visualization" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger 
            value="visualization" 
            className="flex items-center gap-2"
          >
            <Sliders className="h-4 w-4" />
            <span className="hidden sm:inline">Visualization</span>
            <span className="sm:hidden">Visual</span>
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="flex items-center gap-2"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
            <span className="sm:hidden">UI</span>
          </TabsTrigger>
          <TabsTrigger 
            value="data" 
            className="flex items-center gap-2"
          >
            <Database className="h-4 w-4" />
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center gap-2"
          >
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
            <span className="sm:hidden">Alerts</span>
          </TabsTrigger>
        </TabsList>

        {/* Visualization Settings */}
        <TabsContent value="visualization">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sliders className="h-5 w-5" />
                Visualization Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultNodeSize">Default Node Size</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="defaultNodeSize"
                      type="range"
                      min="1"
                      max="50"
                      step="1"
                      value={settings.defaultNodeSize}
                      onChange={(e) => handleChange("defaultNodeSize", Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="w-10 text-center font-mono bg-muted rounded-md px-1.5 py-0.5">
                      {settings.defaultNodeSize}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="defaultZoomLevel">Default Zoom Level</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="defaultZoomLevel"
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={settings.defaultZoomLevel}
                      onChange={(e) => handleChange("defaultZoomLevel", Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="w-10 text-center font-mono bg-muted rounded-md px-1.5 py-0.5">
                      {settings.defaultZoomLevel.toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="animationDuration">Animation Duration (ms)</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="animationDuration"
                      type="range"
                      min="0"
                      max="2000"
                      step="50"
                      value={settings.animationDuration}
                      onChange={(e) => handleChange("animationDuration", Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="w-16 text-center font-mono bg-muted rounded-md px-1.5 py-0.5">
                      {settings.animationDuration}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="showLabels" className="flex flex-col space-y-1">
                    <span>Show Node Labels</span>
                    <span className="font-normal text-sm text-muted-foreground">Display labels on graph nodes</span>
                  </Label>
                  <Switch
                    id="showLabels"
                    checked={settings.showLabels}
                    onCheckedChange={(checked) => handleChange("showLabels", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enableDrag" className="flex flex-col space-y-1">
                    <span>Enable Node Dragging</span>
                    <span className="font-normal text-sm text-muted-foreground">Allow nodes to be moved around</span>
                  </Label>
                  <Switch
                    id="enableDrag"
                    checked={settings.enableDrag}
                    onCheckedChange={(checked) => handleChange("enableDrag", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="colorScheme">Color Scheme</Label>
                  <select
                    id="colorScheme"
                    value={settings.colorScheme}
                    onChange={(e) => handleChange("colorScheme", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="default">Default</option>
                    <option value="monochrome">Monochrome</option>
                    <option value="pastel">Pastel</option>
                    <option value="vibrant">Vibrant</option>
                    <option value="categorical">Categorical</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Font Family</Label>
                  <select
                    id="fontFamily"
                    value={settings.fontFamily}
                    onChange={(e) => handleChange("fontFamily", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="OpenSans">Open Sans</option>
                    <option value="System">System UI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="buttonRadius">Button Style</Label>
                  <select
                    id="buttonRadius"
                    value={settings.buttonRadius}
                    onChange={(e) => handleChange("buttonRadius", e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="sharp">Sharp Corners</option>
                    <option value="rounded">Rounded</option>
                    <option value="pill">Pill Shaped</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Settings */}
        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storageLimit">Storage Limit (MB)</Label>
                  <div className="flex items-center gap-3">
                    <Input
                      id="storageLimit"
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={settings.storageLimit}
                      onChange={(e) => handleChange("storageLimit", Number(e.target.value))}
                      className="flex-1"
                    />
                    <div className="w-16 text-center font-mono bg-muted rounded-md px-1.5 py-0.5">
                      {settings.storageLimit}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="cacheData" className="flex flex-col space-y-1">
                    <span>Cache Data</span>
                    <span className="font-normal text-sm text-muted-foreground">Store data locally for faster access</span>
                  </Label>
                  <Switch
                    id="cacheData"
                    checked={settings.cacheData}
                    onCheckedChange={(checked) => handleChange("cacheData", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="autoRefresh" className="flex flex-col space-y-1">
                    <span>Auto Refresh</span>
                    <span className="font-normal text-sm text-muted-foreground">Automatically refresh visualizations</span>
                  </Label>
                  <Switch
                    id="autoRefresh"
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => handleChange("autoRefresh", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="emailNotifications" className="flex flex-col space-y-1">
                    <span>Email Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">Receive notifications via email</span>
                  </Label>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleChange("emailNotifications", checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="soundEffects" className="flex flex-col space-y-1">
                    <span>Sound Effects</span>
                    <span className="font-normal text-sm text-muted-foreground">Play sounds for important events</span>
                  </Label>
                  <Switch
                    id="soundEffects"
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => handleChange("soundEffects", checked)}
                  />
                </div>

                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notifyOnCompletion" className="flex flex-col space-y-1">
                    <span>Completion Notifications</span>
                    <span className="font-normal text-sm text-muted-foreground">Notify when visualizations are ready</span>
                  </Label>
                  <Switch
                    id="notifyOnCompletion"
                    checked={settings.notifyOnCompletion}
                    onCheckedChange={(checked) => handleChange("notifyOnCompletion", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={resetToDefaults}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
        
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={resetSettings}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Discard
            </Button>
            <Button 
              onClick={saveSettings}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
} 