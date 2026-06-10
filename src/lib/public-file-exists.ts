import fs from "fs";
import path from "path";

/** Returns whether a file exists under `public/` for a site-root path (e.g. `/images/foo.jpg`). */
export function publicFileExists(publicPath: string): boolean {
  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath);
}
