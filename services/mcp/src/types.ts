/**
 * Core types for the MCP (Model Context Protocol) Server
 * Enables external LLMs to interface with the Emergent.sh clone
 */

export interface MCPTool {
  readonly name: string;
  readonly description: string;
  readonly inputSchema: {
    readonly type: "object";
    readonly properties: Record<string, unknown>;
    readonly required?: readonly string[];
  };
}

export interface MCPResource {
  readonly uri: string;
  readonly name: string;
  readonly description?: string;
  readonly mimeType?: string;
}

export interface MCPResourceContent {
  readonly uri: string;
  readonly mimeType: string;
  readonly text?: string;
  readonly blob?: string; // base64 encoded
}

export interface MCPCallToolRequest {
  readonly name: string;
  readonly arguments: Record<string, unknown>;
}

export interface MCPCallToolResult {
  readonly content: Array<{
    readonly type: "text" | "image" | "resource";
    readonly text?: string;
    readonly data?: string;
    readonly mimeType?: string;
  }>;
  readonly isError?: boolean;
}

export interface MCPListResourcesRequest {
  readonly cursor?: string;
}

export interface MCPListResourcesResult {
  readonly resources: MCPResource[];
  readonly nextCursor?: string;
}

export interface MCPReadResourceRequest {
  readonly uri: string;
}

export interface MCPListToolsResult {
  readonly tools: MCPTool[];
}

export interface MCPSession {
  readonly id: string;
  readonly clientId: string;
  readonly capabilities: MCPClientCapabilities;
  readonly createdAt: Date;
  readonly lastActivity: Date;
}

export interface MCPClientCapabilities {
  readonly roots?: {
    readonly listChanged?: boolean;
  };
  readonly sampling?: {};
  readonly elicitation?: {};
}

export interface MCPServerCapabilities {
  readonly tools?: {
    readonly listChanged?: boolean;
  };
  readonly resources?: {
    readonly subscribe?: boolean;
    readonly listChanged?: boolean;
  };
  readonly prompts?: {
    readonly listChanged?: boolean;
  };
  readonly logging?: {};
}

export interface MCPMessage {
  readonly jsonrpc: "2.0";
  readonly id?: string | number;
  readonly method?: string;
  readonly params?: Record<string, unknown>;
  readonly result?: unknown;
  readonly error?: {
    readonly code: number;
    readonly message: string;
    readonly data?: unknown;
  };
}

export interface MCPNotification {
  readonly jsonrpc: "2.0";
  readonly method: string;
  readonly params?: Record<string, unknown>;
}

export interface MCPConfig {
  readonly port: number;
  readonly host: string;
  readonly path: string;
  readonly allowedOrigins: readonly string[];
  readonly sessionTimeout: number;
}

export interface FileSystemToolArgs {
  readonly operation: "read" | "write" | "list" | "delete" | "move" | "copy" | "stat" | "search";
  readonly path: string;
  readonly content?: string;
  readonly targetPath?: string;
  readonly pattern?: string;
}

export interface TerminalToolArgs {
  readonly operation: "exec" | "spawn" | "kill" | "list";
  readonly command?: string;
  readonly args?: readonly string[];
  readonly workingDir?: string;
  readonly environment?: Record<string, string>;
  readonly sessionId?: string;
  readonly processId?: string;
}

export interface SandboxToolArgs {
  readonly operation: "create" | "start" | "stop" | "exec" | "logs" | "ports";
  readonly sessionId?: string;
  readonly userId?: string;
  readonly projectId?: string;
  readonly config?: Record<string, unknown>;
  readonly command?: readonly string[];
}

export interface GitToolArgs {
  readonly operation: "status" | "commit" | "push" | "pull" | "history" | "diff" | "branch" | "checkout";
  readonly sessionId: string;
  readonly message?: string;
  readonly remote?: string;
  readonly branch?: string;
  readonly filepath?: string;
}
