"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast, Toaster } from "sonner";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { 
  UploadCloud, FileText, ZoomIn, ZoomOut, Network, 
  BarChart3, GitBranch, RefreshCw, Share2, Download,
  PanelLeft, Sliders, Loader2
} from "lucide-react";
import RealTimeVisualization from "@/components/visualization/RealTimeVisualization";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { WsMessageType, MessageType } from "@/lib/config";
import { ErrorMessageDisplay } from "@/components/ui/error-message";

export default function VisualizationPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [query, setQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [visualizationGenerated, setVisualizationGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("graph");
  const [showControls, setShowControls] = useState(true);
  const [queryId, setQueryId] = useState<string>("");
  const [inputQuery, setInputQuery] = useState("");
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [clarificationRequest, setClarificationRequest] = useState({ visible: false, message: "" });

  // Set up WebSocket connection for submitting queries
  const { send, isConnected: wsIsConnected } = useWebSocket({
    autoConnect: true,
    onMessage: (message) => {
      const data = message.data;
      
      try {
        const parsedData = JSON.parse(data);
        console.log("Received WS message:", parsedData);
        
        // Handle different message types
        if (parsedData.type === WsMessageType.QUERY_RESULT) {
          setIsProcessing(false);
          setQueryId(parsedData.id || "");
          setVisualizationGenerated(true);
          toast.success("Query processed successfully!");
        } else if (parsedData.type === WsMessageType.ERROR) {
          setIsProcessing(false);
          setErrorMessage(parsedData.message || "An error occurred");
          toast.error("Error processing query");
        } else if (parsedData.type === WsMessageType.CLARIFICATION_NEEDED) {
          setIsProcessing(false);
          setClarificationRequest({
            visible: true,
            message: parsedData.message || "We need more information about your query"
          });
        } else if (parsedData.type === MessageType.VISUALIZATION_UPDATE) {
          // ... existing visualization update code ...
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      toast.success(`${fileArray.length} file(s) uploaded`);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      const fileArray = Array.from(e.dataTransfer.files);
      setFiles((prevFiles) => [...prevFiles, ...fileArray]);
      toast.success(`${fileArray.length} file(s) uploaded`);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    toast.info("File removed");
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file");
      return;
    }

    if (!query.trim()) {
      toast.error("Please enter a visualization query");
      return;
    }

    if (!wsIsConnected) {
      toast.error("Not connected to the server. Please try again.");
      return;
    }

    setIsProcessing(true);

    // Create form data to send files alongside the query
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('query', query);

    // Send query via WebSocket
    send({
      type: 'query',
      query: query,
      fileNames: files.map(file => file.name),
    });

    // Or use a timeout for simulated demo
    if (process.env.NODE_ENV === 'development') {
      // Simulate processing just for demo in development
      setTimeout(() => {
        // Generate a random queryId if the WebSocket doesn't respond
        const generatedQueryId = `query-${Math.random().toString(36).substring(2, 9)}`;
        setQueryId(generatedQueryId);
        setIsProcessing(false);
        setVisualizationGenerated(true);
        toast.success("Visualization generated successfully!");
      }, 2000);
    }
  };

  const resetVisualization = () => {
    // If we have a queryId, unsubscribe from updates
    if (queryId && wsIsConnected) {
      send({
        type: 'unsubscribe',
        queryId: queryId
      });
    }

    setVisualizationGenerated(false);
    setFiles([]);
    setQuery("");
    setActiveTab("graph");
    setQueryId("");
  };

  const handleClarificationResponse = (response: string) => {
    if (wsIsConnected) {
      send({
        type: 'clarification_response',
        query: query,
        response: response
      });
      setClarificationRequest({ visible: false, message: "" });
      setIsProcessing(true);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      {/* Header with title and controls */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Visualization Dashboard</h1>
        {visualizationGenerated && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowControls(!showControls)}
              className="h-9 w-9 rounded-full"
              title={showControls ? "Hide Controls" : "Show Controls"}
            >
              <PanelLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              title="Share Visualization"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              title="Download Results"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-9 w-9 rounded-full" 
              onClick={resetVisualization}
              title="New Visualization"
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {!visualizationGenerated ? (
        <Card className="p-6 rounded-xl shadow-sm border">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Create Your Visualization</h2>
              <p className="text-muted-foreground">
                Upload your data and describe the visualization you need
              </p>
            </div>

            <div className="space-y-8">
              {/* Step 1: Data Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-medium">Upload Your Data</h3>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
                    isDragging ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <UploadCloud className="h-10 w-10 text-primary" />
                    </div>
                    <p className="text-center font-medium">
                      Drag and drop your data files here
                    </p>
                    <p className="text-center text-sm text-muted-foreground">
                      Supports CSV, JSON, Excel, and other common data formats
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-4 mt-6">
                    <h4 className="font-medium">Uploaded Files ({files.length})</h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-lg border p-3 bg-card"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <div className="p-1.5 rounded-md bg-primary/10 shrink-0">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              ({(file.size / 1024).toFixed(2)} KB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="rounded-full h-8 w-8 p-0"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Query Input Section */}
              <div className="space-y-4 mt-10">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-medium">Describe Your Visualization</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Use natural language to describe what visualization you want to create
                </p>
                
                <div className="bg-card border rounded-xl p-4">
                  <Textarea
                    placeholder="E.g., 'Show me a network graph of connections between people in my dataset' or 'Create a tree visualization of the organizational hierarchy'"
                    className="min-h-32 bg-background resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
                    value={query}
                    onChange={handleQueryChange}
                  />
                </div>
                
                <div className="pt-6">
                  <Button 
                    className="w-full rounded-full" 
                    size="lg" 
                    onClick={handleSubmit}
                    disabled={isProcessing || !wsIsConnected}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : !wsIsConnected ? (
                      "Connecting to server..."
                    ) : (
                      "Generate Visualization"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {showControls && (
            <Card className="p-4 md:col-span-1 rounded-xl shadow-sm border">
              <CardHeader className="px-2 pt-2 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sliders className="h-4 w-4" />
                  Visualization Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="px-2 py-0">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zoom Level</label>
                    <div className="flex items-center">
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full">
                        <ZoomOut className="h-3.5 w-3.5" />
                      </Button>
                      <Input
                        type="range"
                        min="0.1"
                        max="2"
                        step="0.1"
                        defaultValue="1"
                        className="mx-2"
                      />
                      <Button variant="outline" size="icon" className="h-7 w-7 rounded-full">
                        <ZoomIn className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Node Size</label>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      defaultValue="10"
                      className="w-full rounded-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Layout Type</label>
                    <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                      <option>Force-Directed</option>
                      <option>Circular</option>
                      <option>Hierarchical</option>
                      <option>Grid</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color By</label>
                    <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                      <option>Category</option>
                      <option>Value</option>
                      <option>Connectivity</option>
                      <option>Cluster</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center rounded-full"
                      onClick={resetVisualization}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      New Visualization
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className={`${showControls ? 'md:col-span-3' : 'md:col-span-4'}`}>
            <Card className="rounded-xl shadow-sm border">
              <CardHeader className="px-5 pb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-xl">Network Visualization</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Based on your query: "{query}"</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-5 pb-6">
                <Tabs defaultValue="graph" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-2 rounded-lg p-1 h-11">
                    <TabsTrigger 
                      value="graph" 
                      className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => setActiveTab("graph")}
                    >
                      <Network className="h-4 w-4 mr-2" /> Graph
                    </TabsTrigger>
                    <TabsTrigger 
                      value="tree" 
                      className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => setActiveTab("tree")}
                    >
                      <GitBranch className="h-4 w-4 mr-2" /> Tree
                    </TabsTrigger>
                    <TabsTrigger 
                      value="matrix" 
                      className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      onClick={() => setActiveTab("matrix")}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> Matrix
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Graph Visualization Tab */}
                  <TabsContent value="graph" className="pt-4">
                    <div className="w-full h-[600px] border rounded-xl bg-muted/20 overflow-hidden">
                      <RealTimeVisualization 
                        visualizationType="graph" 
                        queryId={queryId}
                        onDataUpdate={(data) => {
                          console.log("Received graph data update:", data);
                        }}
                      />
                    </div>
                  </TabsContent>
                  
                  {/* Tree Visualization Tab */}
                  <TabsContent value="tree" className="pt-4">
                    <div className="w-full h-[600px] border rounded-xl bg-muted/20 overflow-hidden">
                      <RealTimeVisualization 
                        visualizationType="tree" 
                        queryId={queryId}
                        onDataUpdate={(data) => {
                          console.log("Received tree data update:", data);
                        }}
                      />
                    </div>
                  </TabsContent>
                  
                  {/* Matrix Visualization Tab */}
                  <TabsContent value="matrix" className="pt-4">
                    <div className="w-full h-[600px] border rounded-xl bg-muted/20 overflow-hidden">
                      <RealTimeVisualization 
                        visualizationType="matrix" 
                        queryId={queryId}
                        onDataUpdate={(data) => {
                          console.log("Received matrix data update:", data);
                        }}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      <Toaster />

      <ErrorMessageDisplay 
        isVisible={!!errorMessage}
        message={errorMessage}
        onClose={() => setErrorMessage("")}
      />

      <ErrorMessageDisplay 
        isVisible={clarificationRequest.visible}
        message={clarificationRequest.message}
        isQueryClarification={true}
        onClose={() => setClarificationRequest({ visible: false, message: "" })}
        onSubmitResponse={handleClarificationResponse}
      />
    </div>
  );
} 