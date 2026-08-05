/**
 * Virtual File System (VFS) Service - Main Entry Point
 * Exports VirtualFileSystem and types
 */

export {
  VirtualFileSystem,
  createVFS,
} from "./vfs.js";

export {
  GitRepository,
} from "./git-repository.js";

export type {
  VFSNode,
  FileContent,
  VFSOperation,
  CommitInfo,
  GitStatus,
  GitRemote,
  VFSConfig,
  VFSSession,
  VFSEvents,
} from "./types.js";
