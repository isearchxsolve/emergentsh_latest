/**
 * Core types for the Sandbox service
 * Defines container management, port mapping, and execution interfaces
 */

export interface ContainerConfig {
  readonly image: string;
  readonly workingDir: string;
  readonly environment: Readonly<Record<string, string>>;
  readonly ports: readonly PortMapping[];
  readonly volumes: readonly VolumeMount[];
  readonly resources: ResourceLimits;
  readonly networkMode: string;
}

export interface PortMapping {
  readonly containerPort: number;
  readonly hostPort?: number;
  readonly protocol: "tcp" | "udp";
}

export interface VolumeMount {
  readonly source: string;
  readonly target: string;
  readonly type: "bind" | "volume" | "tmpfs";
  readonly readOnly: boolean;
}

export interface ResourceLimits {
  readonly cpuQuota: number;
  readonly cpuPeriod: number;
  readonly memoryLimit: number; // bytes
  readonly memorySwapLimit: number; // bytes
  readonly pidsLimit: number;
}

export interface ContainerState {
  readonly id: string;
  readonly sessionId: string;
  readonly status: ContainerStatus;
  readonly createdAt: Date;
  readonly startedAt?: Date;
  readonly finishedAt?: Date;
  readonly exitCode?: number;
  readonly ports: ReadonlyMap<number, number>; // container -> host
  readonly pid?: number;
}

export type ContainerStatus =
  | "creating"
  | "created"
  | "starting"
  | "running"
  | "paused"
  | "stopping"
  | "stopped"
  | "exited"
  | "dead"
  | "error";

export interface ExecConfig {
  readonly cmd: readonly string[];
  readonly workingDir?: string;
  readonly environment?: Readonly<Record<string, string>>;
  readonly attachStdout: boolean;
  readonly attachStderr: boolean;
  readonly attachStdin: boolean;
  readonly tty: boolean;
  readonly user?: string;
}

export interface ExecResult {
  readonly exitCode: number;
  readonly stdout: string;
  readonly stderr: string;
  readonly duration: number;
}

export interface LogEntry {
  readonly timestamp: Date;
  readonly stream: "stdout" | "stderr";
  readonly data: string;
  readonly containerId: string;
}

export interface SandboxSession {
  readonly id: string;
  readonly userId: string;
  readonly projectId: string;
  readonly container: ContainerState;
  readonly processes: ReadonlyMap<string, BackgroundProcess>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface BackgroundProcess {
  readonly id: string;
  readonly sessionId: string;
  readonly command: readonly string[];
  readonly workingDir: string;
  readonly environment: Readonly<Record<string, string>>;
  readonly status: ProcessStatus;
  readonly pid?: number;
  readonly port?: number;
  readonly startedAt: Date;
  readonly stdout: readonly LogEntry[];
  readonly stderr: readonly LogEntry[];
}

export type ProcessStatus =
  | "starting"
  | "running"
  | "stopping"
  | "stopped"
  | "crashed"
  | "exited";

export interface SandboxEvents {
  "container:created": { container: ContainerState };
  "container:started": { container: ContainerState };
  "container:stopped": { container: ContainerState; exitCode: number };
  "container:error": { container: ContainerState; error: Error };
  "log:stdout": LogEntry;
  "log:stderr": LogEntry;
  "process:started": { process: BackgroundProcess };
  "process:stopped": { process: BackgroundProcess; exitCode: number };
  "process:error": { process: BackgroundProcess; error: Error };
  "port:mapped": { containerPort: number; hostPort: number };
}
