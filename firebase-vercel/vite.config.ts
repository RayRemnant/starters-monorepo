import path from "path"

import { glob } from "glob"
import { defineConfig } from "vite"

// Get all API function entry points
const apiFiles = glob.sync("api/*/index.ts")

// Create entry points object for Vite
const entries = apiFiles.reduce(
  (acc, file) => {
    // Convert 'api/getDoc/index.ts' to 'api/getDoc'
    const name = file.replace("/index.ts", "").replace(/\\/g, "/")
    acc[name] = path.resolve(file)
    return acc
  },
  {} as Record<string, string>
)

export default defineConfig({
  build: {
    // Build for Node.js environment
    target: "node18",

    // Output to preserve the API structure
    outDir: "dist",

    // Library mode for multiple entries
    lib: {
      entry: entries,
      fileName: (format, entryName) => `${entryName}/index.js`,
      formats: ["cjs"] // CommonJS for Node.js
    },

    rollupOptions: {
      // Keep these as external dependencies
      external: [
        "firebase-admin"
        // Add other external deps that should not be bundled
      ],

      output: {
        // Preserve the directory structure
        preserveModules: false,

        // Ensure each function gets its own bundle
        manualChunks: undefined
      }
    },

    // Don't minify for easier debugging
    minify: false,

    // Generate source maps
    sourcemap: true
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      "@/lib": path.resolve(__dirname, "lib")
    }
  }
})
