// WebSocket configuration
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws';

// API configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Visualization settings
export const VISUALIZATION_SETTINGS = {
  updateInterval: 1000, // milliseconds between WebSocket reconnection attempts
  autoReconnect: true,
  maxReconnectAttempts: 5,
};

// WebSocket message types for visualization data
export enum WsMessageType {
  QUERY_RESULT = 'query_result',
  VISUALIZATION_UPDATE = 'visualization_update',
  CONNECTED = 'connected',
  ERROR = 'error',
  CLARIFICATION_NEEDED = 'clarification_needed'
}

// Added for compatibility with the error display component
export const MessageType = WsMessageType;

// Interface for WebSocket messages
export interface WsMessage {
  type: WsMessageType;
  data: any;
  timestamp?: number;
}

// Clarification request interface
export interface ClarificationRequest {
  queryId: string;
  query: string;
  message: string;
  options?: string[];
  timestamp: string;
}

export interface QueryResult {
  id: string;
  query: string;
  result: any;
  timestamp: string;
}

export interface VisualizationUpdate {
  queryId: string;
  data: any;
  timestamp: string;
}

export interface ErrorMessage {
  message: string;
  timestamp: string;
}

export default {
  WS_URL,
  API_URL,
  VISUALIZATION_SETTINGS,
  WsMessageType,
}; 