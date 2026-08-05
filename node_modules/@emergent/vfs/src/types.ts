/**
 * Core types for the Virtual File System (VFS) service
 * In-memory VFS with Git sync capabilities
 */

export interface VFSNode {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly type: "file" | "directory";
  readonly size: number;
  readonly mimeType?: string;
  readonly content?: string | Uint8Array;
  readonly children?: Map<string, VFSNode>;
  readonly parent?: VFSNode;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly metadata: Record<string, unknown>;
}

export interface FileContent {
  readonly path: string;
  readonly content: string | Uint8Array;
  readonly encoding?: BufferEncoding;
  readonly mimeType?: string;
}

export interface VFSOperation {
  readonly id: string;
  readonly type: "create" | "read" | "update" | "delete" | "move" | "copy";
  readonly path: string;
  readonly targetPath?: string;
  readonly content?: string | Uint8Array;
  readonly timestamp: Date;
  readonly sessionId: string;
  readonly userId: string;
}

export interface CommitInfo {
  readonly hash: string;
  readonly message: string;
  readonly author: {
    readonly name: string;
    readonly email: string;
  };
  readonly timestamp: Date;
  readonly parents: readonly string[];
  readonly treeHash: string;
}

export interface GitStatus {
  readonly currentBranch: string;
  readonly isClean: boolean;
  readonly staged: readonly string[];
  readonly unstaged: readonly string[];
  readonly untracked: readonly string[];
  readonly ahead: number;
  readonly behind: number;
}

export interface GitRemote {
  readonly name: string;
  readonly url: string;
  readonly fetchRefspec?: string;
  readonly pushRefspec?: string;
}

export interface VFSConfig {
  readonly rootPath: string;
  readonly gitEnabled: boolean;
  readonly gitRemoteUrl?: string;
  readonly gitBranch?: string;
  readonly autoCommit: boolean;
  readonly autoPush: boolean;
  readonly maxFileSize: number;
  readonly allowedExtensions: readonly string[];
}

export interface VFSSession {
  readonly id: string;
  readonly userId: string;
  readonly projectId: string;
  readonly rootNode: VFSNode;
  readonly operations: VFSOperation[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface VFSEvents {
  "file:created": { node: VFSNode; sessionId: string };
  "file:updated": { node: VFSNode; sessionId: string; oldContent?: string };
  "file:deleted": { path: string; sessionId: string };
  "file:moved": { oldPath: string; newPath: string; sessionId: string };
  "directory:created": { node: VFSNode; sessionId: string };
  "directory:deleted": { path: string; sessionId: string };
  "git:committed": { commit: CommitInfo; sessionId: string };
  "git:pushed": { remote: string; ref: string; sessionId: string };
  "git:pulled": { remote: string; ref: string; sessionId: string };
  "sync:started": { sessionId: string };
  "sync:completed": { sessionId: string; changes: number };
  "sync:error": { sessionId: string; error: Error };
}
