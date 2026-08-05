/**
 * Sandbox Service - Main Entry Point
 * Exports ContainerManager and types
 */

export {
  ContainerManager,
  createContainerManager,
} from "./container-manager.js";

export type {
  ContainerConfig,
  ContainerState,
  ContainerStatus,
  ExecConfig,
  ExecResult,
  LogEntry,
  SandboxSession,
  BackgroundProcess,
  ProcessStatus,
  PortMapping,
  VolumeMount,
  ResourceLimits,
  SandboxEvents,
} from "./types.js";
