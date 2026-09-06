import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({

  test: {
    projects: [
      { extends: "./frontend/vitest.config.ts" },
      { extends: "./services/sandbox/vitest.config.ts" },
      { extends: "./services/vfs/vitest.config.ts" },
      { extends: "./services/streamer/vitest.config.ts" },
      { extends: "./services/mcp/vitest.config.ts" },
      { extends: "./services/deploy/vitest.config.ts" },
      { extends: "./services/qa-runner/vitest.config.ts" },
    ],
  }
});