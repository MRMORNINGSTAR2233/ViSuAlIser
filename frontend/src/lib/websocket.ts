import { EventEmitter } from 'events';

// Define event types to provide type safety
export enum WebSocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  DATA = 'data',
  ERROR = 'error'
}

type MessageListener = (data: any) => void;
type ConnectionListener = () => void;
type ErrorListener = (error: Error) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000; // 3 seconds
  private reconnectTimeoutId: NodeJS.Timeout | null = null;
  private eventEmitter = new EventEmitter();
  private autoReconnect = true;

  constructor(url: string) {
    this.url = url;
  }

  // Connect to the WebSocket server
  connect(): void {
    if (this.socket?.readyState === WebSocket.OPEN) {
      console.log('WebSocket is already connected');
      return;
    }

    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.eventEmitter.emit(WebSocketEvent.CONNECT);
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.eventEmitter.emit(WebSocketEvent.DATA, data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        this.eventEmitter.emit(WebSocketEvent.ERROR, new Error('Failed to parse message'));
      }
    };

    this.socket.onclose = (event) => {
      console.log(`WebSocket disconnected: ${event.reason || 'No reason provided'}`);
      this.eventEmitter.emit(WebSocketEvent.DISCONNECT);
      this.socket = null;

      // Attempt to reconnect if configured to do so
      if (this.autoReconnect) {
        this.attemptReconnect();
      }
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.eventEmitter.emit(WebSocketEvent.ERROR, new Error('WebSocket connection error'));
    };
  }

  // Disconnect from WebSocket server
  disconnect(): void {
    if (this.socket) {
      this.autoReconnect = false; // Prevent reconnection attempts
      
      if (this.reconnectTimeoutId) {
        clearTimeout(this.reconnectTimeoutId);
        this.reconnectTimeoutId = null;
      }

      this.socket.close();
      this.socket = null;
      console.log('WebSocket disconnected by client');
    }
  }

  // Send data to the WebSocket server
  send(data: any): boolean {
    if (this.socket?.readyState === WebSocket.OPEN) {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.socket.send(message);
      return true;
    } else {
      console.error('Cannot send message: WebSocket is not connected');
      return false;
    }
  }

  // Private method to handle reconnection logic
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error(`Max reconnection attempts (${this.maxReconnectAttempts}) reached. Giving up.`);
      this.eventEmitter.emit(WebSocketEvent.ERROR, new Error('Max reconnection attempts reached'));
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    this.reconnectTimeoutId = setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
  }

  // Event listeners
  onConnect(listener: ConnectionListener): () => void {
    this.eventEmitter.on(WebSocketEvent.CONNECT, listener);
    return () => this.eventEmitter.off(WebSocketEvent.CONNECT, listener);
  }

  onDisconnect(listener: ConnectionListener): () => void {
    this.eventEmitter.on(WebSocketEvent.DISCONNECT, listener);
    return () => this.eventEmitter.off(WebSocketEvent.DISCONNECT, listener);
  }

  onMessage(listener: MessageListener): () => void {
    this.eventEmitter.on(WebSocketEvent.DATA, listener);
    return () => this.eventEmitter.off(WebSocketEvent.DATA, listener);
  }

  onError(listener: ErrorListener): () => void {
    this.eventEmitter.on(WebSocketEvent.ERROR, listener);
    return () => this.eventEmitter.off(WebSocketEvent.ERROR, listener);
  }

  // Check if WebSocket is currently connected
  isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }
}

// Create singleton instance for the app to use
let websocketService: WebSocketService | null = null;

// Initialize the WebSocket service with the backend URL
export function initializeWebSocket(url: string): WebSocketService {
  if (!websocketService) {
    websocketService = new WebSocketService(url);
  }
  return websocketService;
}

// Get the existing WebSocket service instance
export function getWebSocketService(): WebSocketService | null {
  return websocketService;
}

export default WebSocketService; 