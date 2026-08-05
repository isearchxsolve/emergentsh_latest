/**
 * MCP (Model Context Protocol) Server - Main Entry Point
 * Exports MCPServer and types
 */

export {
  MCPServer,
  createMCPServer,
  SandboxManager,
} from "./mcp-server.js";

export type {
  MCPTool,
  MCPResource,
  MCPResourceContent,
  MCPCallToolRequest,
  MCPCallToolResult,
  MCPListResourcesRequest,
  MCPListResourcesResult,
  MCPReadResourceRequest,
  MCPListToolsResult,
  MCPSession,
  MCPClientCapabilities,
  MCPServerCapabilities,
  MCPMessage,
  MCPNotification,
  MCPConfig,
  FileSystemToolArgs,
  TerminalToolArgs,
  SandboxToolArgs,
  GitToolArgs,
} from "./types.js";
