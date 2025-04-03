import { DataUpload } from "@/components/data/DataUpload";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, DatabaseIcon, DownloadIcon } from "lucide-react";

export default function DataPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Data Management</h1>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="upload">Upload Your Data</TabsTrigger>
          <TabsTrigger value="samples">Sample Datasets</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload">
          <div className="border rounded-lg bg-card p-6 shadow-sm">
            <DataUpload />
          </div>
        </TabsContent>
        
        <TabsContent value="samples">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Network Data</CardTitle>
                </div>
                <CardDescription>Social network connections dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A dataset containing social network connections, perfect for graph visualizations.
                  Includes nodes representing people and edges representing relationships.
                </p>
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Format:</span> CSV
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> 1.2MB
                  </div>
                  <div>
                    <span className="font-medium">Nodes:</span> 500
                  </div>
                  <div>
                    <span className="font-medium">Edges:</span> 2,500
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <DownloadIcon className="mr-2 h-4 w-4" /> Use This Dataset
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Hierarchical Data</CardTitle>
                </div>
                <CardDescription>Organization structure dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A hierarchical dataset showing organizational structure, ideal for tree visualizations.
                  Contains departments, teams, and reporting relationships.
                </p>
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Format:</span> JSON
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> 0.8MB
                  </div>
                  <div>
                    <span className="font-medium">Depth:</span> 5 levels
                  </div>
                  <div>
                    <span className="font-medium">Nodes:</span> 200
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <DownloadIcon className="mr-2 h-4 w-4" /> Use This Dataset
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Sales Data</CardTitle>
                </div>
                <CardDescription>Regional sales performance dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A dataset containing sales data by region, product, and time period.
                  Perfect for matrix and comparison visualizations.
                </p>
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Format:</span> Excel
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> 2.5MB
                  </div>
                  <div>
                    <span className="font-medium">Regions:</span> 8
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> 12 months
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <DownloadIcon className="mr-2 h-4 w-4" /> Use This Dataset
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5 text-primary" />
                  <CardTitle>Custom Dataset</CardTitle>
                </div>
                <CardDescription>Build your own sample dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a custom dataset with parameters you define.
                  Choose the type, size, and characteristics of your data.
                </p>
                <div className="text-sm grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium">Types:</span> Graph, Tree, Table
                  </div>
                  <div>
                    <span className="font-medium">Formats:</span> CSV, JSON, Excel
                  </div>
                  <div>
                    <span className="font-medium">Size:</span> Customizable
                  </div>
                  <div>
                    <span className="font-medium">Complexity:</span> Variable
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="outline">
                  Generate Custom Data
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Toaster />
    </div>
  );
} 