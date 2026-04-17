import { spawn } from "node:child_process";

const child = spawn("pnpm", ["exec", "nuxi", "typecheck"], {
  stdio: ["inherit", "pipe", "pipe"],
  shell: process.platform === "win32",
});

const suppressionPattern = /Duplicated imports "useAppConfig"/;

function forwardFiltered(stream, writer) {
  let buffer = "";

  stream.on("data", (chunk) => {
    buffer += chunk.toString();

    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!suppressionPattern.test(line)) {
        writer.write(`${line}\n`);
      }
    }
  });

  stream.on("end", () => {
    if (buffer && !suppressionPattern.test(buffer)) {
      writer.write(buffer);
    }
  });
}

forwardFiltered(child.stdout, process.stdout);
forwardFiltered(child.stderr, process.stderr);

child.on("close", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
