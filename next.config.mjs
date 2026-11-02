import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the project root (another package-lock.json exists higher up on this machine).
  outputFileTracingRoot: path.dirname(fileURLToPath(import.meta.url)),
  // Lets a check build run in a separate folder (NEXT_DIST_DIR=.next-check) without touching a running dev server.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
