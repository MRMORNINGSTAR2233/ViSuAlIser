import { useState, useEffect, useCallback, useRef } from 'react';
import WebSocketService, { WebSocketEvent, initializeWebSocket, getWebSocketService } from '../websocket';
import { WS_URL, WsMessage, WsMessageType } from '../config';

interface UseWebSocketOptions {
  url?: string;
  autoConnect?: boolean;
  onMessage?: (data: any) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  lastMessage: any | null;
  connect: () => void;
  disconnect: () => void;
  send: (data: any) => boolean;
  error: Error | null;
}

export default function useWebSocket({
  url = WS_URL,
  autoConnect = true,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
}: UseWebSocketOptions = {}): UseWebSocketReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const wsService = useRef<WebSocketService | null>(null);
  
  // Initialize WebSocket service
  useEffect(() => {
    if (!wsService.current) {
      // Check if a WebSocket service already exists
      wsService.current = getWebSocketService() || initializeWebSocket(url);
      
      if (autoConnect) {
        wsService.current.connect();
      }
    }
    
    return () => {
      // Don't disconnect on component unmount as other components may use the WebSocket
      // The service will handle this automatically
    };
  }, [url, autoConnect]);

  // Set up event listeners
  useEffect(() => {
    if (!wsService.current) return;
    
    const handleConnect = () => {
      setIsConnected(true);
      setError(null);
      if (onConnect) onConnect();
    };
    
    const handleDisconnect = () => {
      setIsConnected(false);
      if (onDisconnect) onDisconnect();
    };
    
    const handleMessage = (data: any) => {
      setLastMessage(data);
      if (onMessage) onMessage(data);
    };
    
    const handleError = (err: Error) => {
      setError(err);
      if (onError) onError(err);
    };
    
    // Register event listeners
    const unsubConnect = wsService.current.onConnect(handleConnect);
    const unsubDisconnect = wsService.current.onDisconnect(handleDisconnect);
    const unsubMessage = wsService.current.onMessage(handleMessage);
    const unsubError = wsService.current.onError(handleError);
    
    // Update initial connection state
    if (wsService.current.isConnected()) {
      setIsConnected(true);
    }
    
    // Clean up event listeners
    return () => {
      unsubConnect();
      unsubDisconnect();
      unsubMessage();
      unsubError();
    };
  }, [onConnect, onDisconnect, onMessage, onError]);

  // Connect method
  const connect = useCallback(() => {
    if (wsService.current) {
      wsService.current.connect();
    }
  }, []);

  // Disconnect method
  const disconnect = useCallback(() => {
    if (wsService.current) {
      wsService.current.disconnect();
    }
  }, []);

  // Send method
  const send = useCallback((data: any) => {
    if (wsService.current) {
      return wsService.current.send(data);
    }
    return false;
  }, []);

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect,
    send,
    error,
  };
} 