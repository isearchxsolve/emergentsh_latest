/**
 * Core types for the Event Streamer service
 * Defines WebSocket message formats and event types
 */

export interface StreamMessage<T = unknown> {
  readonly type: string;
  readonly payload: T;
  readonly timestamp: Date;
  readonly id: string;
  readonly sessionId?: string;
}

export interface LogStreamMessage extends StreamMessage<LogPayload> {
  readonly type: "log:stdout" | "log:stderr";
}

export interface LogPayload {
  readonly stream: "stdout" | "stderr";
  readonly data: string;
  readonly containerId: string;
}

export interface ContainerEventMessage extends StreamMessage<ContainerEventPayload> {
  readonly type: 
    | "container:created"
    | "container:started"
    | "container:stopped"
    | "container:error";
}

export interface ContainerEventPayload {
  readonly containerId: string;
  readonly sessionId: string;
  readonly status: string;
  readonly exitCode?: number;
  readonly error?: string;
}

export interface ProcessEventMessage extends StreamMessage<ProcessEventPayload> {
  readonly type: "process:started" | "process:stopped" | "process:error";
}

export interface ProcessEventPayload {
  readonly processId: string;
  readonly sessionId: string;
  readonly command: readonly string[];
  readonly status: string;
  readonly pid?: number;
  readonly port?: number;
  readonly exitCode?: number;
  readonly error?: string;
}

export interface PortMappingMessage extends StreamMessage<PortMappingPayload> {
  readonly type: "port:mapped";
}

export interface PortMappingPayload {
  readonly containerPort: number;
  readonly hostPort: number;
  readonly containerId: string;
}

export interface SessionEventMessage extends StreamMessage<SessionEventPayload> {
  readonly type: "session:created" | "session:updated" | "session:deleted";
}

export interface SessionEventPayload {
  readonly sessionId: string;
  readonly userId: string;
  readonly projectId: string;
  readonly status: string;
}

export interface SubscriptionMessage extends StreamMessage<SubscriptionPayload> {
  readonly type: "subscribe" | "unsubscribe";
}

export interface SubscriptionPayload {
  readonly sessionId: string;
  readonly events: readonly string[];
}

export interface HeartbeatMessage extends StreamMessage<HeartbeatPayload> {
  readonly type: "heartbeat";
}

export interface HeartbeatPayload {
  readonly timestamp: Date;
  readonly clientId: string;
}

export type AnyStreamMessage =
  | LogStreamMessage
  | ContainerEventMessage
  | ProcessEventMessage
  | PortMappingMessage
  | SessionEventMessage
  | SubscriptionMessage
  | HeartbeatMessage;

export interface StreamClient {
  readonly id: string;
  readonly ws: import("ws").WebSocket;
  readonly subscriptions: Set<string>;
  readonly sessionId?: string;
  readonly connectedAt: Date;
  readonly lastHeartbeat: Date;
}

export interface StreamerConfig {
  readonly port: number;
  readonly heartbeatInterval: number;
  readonly maxMessageSize: number;
  readonly allowedOrigins: readonly string[];
}
