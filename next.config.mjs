import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicit tracing root prevents Vercel's modifyConfig step from trying to
  // infer the project boundary (which fails opaquely on Next 16 + middleware
  // with the bcryptjs/iron-session import graph).
  outputFileTracingRoot: __dirname,

  // Don't bundle native-flavoured modules into the edge runtime.
  serverExternalPackages: ["bcryptjs"],
};

export default nextConfig;
