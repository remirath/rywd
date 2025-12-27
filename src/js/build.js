console.log("Running build…");

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");
const SRC = path.join(ROOT, "src");
const PUBLIC = path.join(ROOT, "public");
const BUILD = path.join(ROOT, "build");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function clearBuild() {
  if (fs.existsSync(BUILD)) {
    fs.rmSync(BUILD, { recursive: true, force: true });
  }
  fs.mkdirSync(BUILD, { recursive: true });
}


clearBuild();

copyDir(path.join(SRC, "pages"), BUILD);

copyDir(PUBLIC, BUILD);

