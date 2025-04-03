"use client";

import { useState, useEffect, useCallback } from "react";
import { RefreshCw, AlertCircle, Wifi, WifiOff } from "lucide-react";
import useWebSocket from "@/lib/hooks/useWebSocket";
import { WsMessageType } from "@/lib/config";
import { toast } from "sonner";

interface VisualizationData {
  nodes: {
    id: string;
    value: number;
    group: number;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
}

interface RealTimeVisualizationProps {
  initialData?: VisualizationData;
  onDataUpdate?: (data: VisualizationData) => void;
  visualizationType: "graph" | "tree" | "matrix";
  queryId?: string;  // ID of the query to subscribe to specific updates
}

export default function RealTimeVisualization({
  initialData,
  onDataUpdate,
  visualizationType,
  queryId,
}: RealTimeVisualizationProps) {
  const [visualizationData, setVisualizationData] = useState<VisualizationData | null>(initialData || null);
  const [isDataUpdating, setIsDataUpdating] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  // Handle WebSocket message processing
  const handleMessage = useCallback((message: any) => {
    if (message && message.type === WsMessageType.VISUALIZATION_UPDATE) {
      // Check if this update is for our query
      if (queryId && message.queryId && message.queryId !== queryId) {
        return; // Skip updates for other queries
      }
      
      setIsDataUpdating(true);
      
      // Apply the update to existing data
      setVisualizationData(prevData => {
        if (!prevData) {
          return message.data;
        }
        
        // Merge the new data with the existing data
        const updatedData = { 
          nodes: [...prevData.nodes],
          links: [...prevData.links]
        };
        
        // Update nodes
        if (message.data.nodes) {
          message.data.nodes.forEach((newNode: any) => {
            const existingNodeIndex = updatedData.nodes.findIndex((n) => n.id === newNode.id);
            if (existingNodeIndex >= 0) {
              updatedData.nodes[existingNodeIndex] = { ...updatedData.nodes[existingNodeIndex], ...newNode };
            } else {
              updatedData.nodes.push(newNode);
            }
          });
        }
        
        // Update links
        if (message.data.links) {
          message.data.links.forEach((newLink: any) => {
            const existingLinkIndex = updatedData.links.findIndex(
              (l) => l.source === newLink.source && l.target === newLink.target
            );
            if (existingLinkIndex >= 0) {
              updatedData.links[existingLinkIndex] = { ...updatedData.links[existingLinkIndex], ...newLink };
            } else {
              updatedData.links.push(newLink);
            }
          });
        }
        
        return updatedData;
      });
      
      setLastUpdateTime(new Date());
      
      // Show a brief update indicator
      setTimeout(() => {
        setIsDataUpdating(false);
      }, 1000);
      
      // Notify parent of data update
      if (onDataUpdate) {
        onDataUpdate(message.data);
      }
    }
  }, [queryId, onDataUpdate]);

  // Connection status handlers
  const handleConnect = useCallback(() => {
    toast.success("Connected to real-time data stream");
    
    // If we have a queryId, subscribe to updates for this specific visualization
    if (queryId) {
      send({
        type: 'subscribe',
        queryId: queryId
      });
    }
  }, [queryId]);

  const handleDisconnect = useCallback(() => {
    toast.error("Disconnected from real-time data stream. Reconnecting...");
  }, []);

  const handleError = useCallback((error: Error) => {
    toast.error(`WebSocket error: ${error.message}`);
  }, []);

  // Initialize the WebSocket connection
  const { isConnected, lastMessage, send, error } = useWebSocket({
    autoConnect: true,
    onMessage: handleMessage,
    onConnect: handleConnect,
    onDisconnect: handleDisconnect,
    onError: handleError,
  });

  // Effect to handle received messages
  useEffect(() => {
    if (lastMessage) {
      handleMessage(lastMessage);
    }
  }, [lastMessage, handleMessage]);

  // Initialize with dummy data if none exists and if we're not connected
  useEffect(() => {
    if (!visualizationData && !isConnected) {
      const dummyData: VisualizationData = {
        nodes: Array.from({ length: 20 }, (_, i) => ({ 
          id: `node-${i}`, 
          value: Math.random() * 100,
          group: Math.floor(Math.random() * 5)
        })),
        links: Array.from({ length: 30 }, () => ({
          source: `node-${Math.floor(Math.random() * 20)}`,
          target: `node-${Math.floor(Math.random() * 20)}`,
          value: Math.random() * 10
        }))
      };
      setVisualizationData(dummyData);
      setLastUpdateTime(new Date());
    }
  }, [visualizationData, isConnected]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      // Unsubscribe from updates if we have a queryId
      if (queryId && isConnected) {
        send({
          type: 'unsubscribe',
          queryId: queryId
        });
      }
    };
  }, [queryId, isConnected, send]);

  // Render different visualization types
  const renderVisualization = () => {
    if (!visualizationData) return null;
    
    switch (visualizationType) {
      case "graph":
        return (
          <div className="relative w-full h-full">
            {/* Network nodes (simplified representation) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Responsive Network Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Real-time data: {visualizationData.nodes.length} nodes, {visualizationData.links.length} connections
                </p>
              </div>
            </div>
            
            {visualizationData.nodes.map((node, index) => (
              <div 
                key={node.id}
                className="absolute rounded-full bg-primary transition-all duration-300 ease-in-out flex items-center justify-center text-xs text-white"
                style={{
                  width: `${Math.max(node.value / 5, 20)}px`, 
                  height: `${Math.max(node.value / 5, 20)}px`,
                  left: `${(index % 5) * 20 + 5}%`,
                  top: `${Math.floor(index / 5) * 20 + 5}%`,
                  opacity: isDataUpdating ? 0.6 : 0.9,
                  transform: `scale(${isDataUpdating ? 0.95 : 1})`,
                  backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'][node.group],
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        );
        
      case "tree":
        return (
          <div className="relative w-full h-full">
            {/* Tree visualization rendering */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Tree Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Real-time hierarchical data with {visualizationData.nodes.length} nodes
                </p>
              </div>
            </div>
            
            {/* Simple tree visualization (demo) */}
            <div className="absolute inset-0 flex flex-col items-center pt-16">
              <div className={`w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-8 transition-all duration-300 text-white ${isDataUpdating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
                Root
              </div>
              <div className="flex gap-16 relative">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="h-16 border-l border-primary"></div>
                    <div className={`w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-8 text-xs text-white transition-all duration-300 ${isDataUpdating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
                      {i + 1}
                    </div>
                    <div className="flex gap-8">
                      {Array.from({ length: 2 }).map((_, j) => (
                        <div key={j} className="flex flex-col items-center">
                          <div className="h-12 border-l border-primary"></div>
                          <div className={`w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs text-white transition-all duration-300 ${isDataUpdating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
                            {i}.{j}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case "matrix":
        return (
          <div className="relative w-full h-full">
            {/* Matrix visualization rendering */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">Matrix Visualization</p>
                <p className="text-xs text-muted-foreground">
                  Connection matrix with {visualizationData.links.length} connections
                </p>
              </div>
            </div>
            
            {/* Simple matrix visualization (demo) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-2 transition-all duration-300">
                {Array.from({ length: 25 }).map((_, index) => {
                  const value = Math.random();
                  return (
                    <div 
                      key={index} 
                      className="w-12 h-12 rounded-md flex items-center justify-center text-xs text-white transition-all duration-300"
                      style={{
                        backgroundColor: `rgba(59, 130, 246, ${value})`,
                        opacity: isDataUpdating ? 0.8 : 1,
                        transform: `scale(${isDataUpdating ? 0.95 : 1})`,
                      }}
                    >
                      {value.toFixed(1)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className={`w-full h-full transition-opacity duration-300 ${isDataUpdating ? 'opacity-70' : 'opacity-100'}`}>
        {renderVisualization()}
      </div>
      
      {/* Connection status indicator */}
      <div className="absolute top-2 left-2 text-xs px-2 py-1 rounded-full flex items-center gap-1">
        {isConnected ? (
          <span className="text-green-500 flex items-center gap-1">
            <Wifi className="h-3 w-3" />
            Connected
          </span>
        ) : (
          <span className="text-red-500 flex items-center gap-1">
            <WifiOff className="h-3 w-3" />
            Disconnected
          </span>
        )}
      </div>
      
      {/* Update indicator */}
      {isDataUpdating && (
        <div className="absolute top-2 right-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center">
          <RefreshCw className="h-3 w-3 animate-spin mr-1" />
          Live updating
        </div>
      )}
      
      {/* Error indicator */}
      {error && (
        <div className="absolute top-10 right-2 bg-red-100 text-red-500 text-xs px-2 py-1 rounded-full flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error.message}
        </div>
      )}
      
      {/* Last update time */}
      {lastUpdateTime && (
        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
          Last updated: {lastUpdateTime.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
} 