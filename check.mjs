import { execFile } from "node:child_process";
import { writeFile } from "node:fs/promises";
import { promisify } from "node:util";

const exec = promisify(execFile);

const bold = (text) => `\x1b[1m${text}\x1b[0m`;

const tools = [
  { name: "Node.js", command: "node", args: ["-v"] },
  { name: "npm", command: "npm", args: ["-v"] },
  { name: "Git", command: "git", args: ["--version"] },
  { name: "Claude Code", command: "claude", args: ["--version"] },
  {
    name: "VSCode",
    command: "code",
    args: ["--version"],
    parseLine: 0,
  },
  { name: "Ghostty", command: "ghostty", args: ["--version"] },
];

async function checkTool({ name, command, args, parseLine }) {
  try {
    const { stdout } = await exec(command, args);
    let version = stdout.trim();
    if (parseLine !== undefined) {
      version = version.split("\n")[parseLine];
    }
    console.log(`  ✅ ${name}: ${version}`);
    return { name, version, status: "ok" };
  } catch {
    console.log(`  ❌ ${name}: not found`);
    return { name, version: null, status: "ng" };
  }
}

async function main() {
  console.log();
  console.log(bold("Dev Environment Checker"));
  console.log("─".repeat(40));

  const results = await Promise.all(tools.map(checkTool));

  const allOk = results.every((r) => r.status === "ok");
  const ngCount = results.filter((r) => r.status === "ng").length;

  console.log("─".repeat(40));

  if (allOk) {
    console.log("🎉 All tools are installed!");
  } else {
    console.log(`⚠️  ${ngCount} tool(s) not found.`);
  }

  const checkedAt = new Date().toISOString();
  const jsonOutput = {
    checkedAt,
    results: results.map(({ name, version, status }) => ({
      name,
      version,
      status,
    })),
  };
  await writeFile("results.json", JSON.stringify(jsonOutput, null, 2) + "\n");
  console.log(`\nResults saved to results.json`);

  console.log();
}

main();
