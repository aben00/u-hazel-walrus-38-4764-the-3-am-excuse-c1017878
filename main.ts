// The 3 AM Excuse — a hardware wallet refuses to sign at 3 AM.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// not only whitespace, a single line in the wallet's own voice.
// The wallet's excuse: 3 AM decisions belong to FOMO, not to its owner —
// it only takes orders from the caffeinated, contract-reading version.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "At 3 AM it's not you, it's the FOMO talking — I only sign for the version of you that's had coffee.";

function selfCheck(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

selfCheck(ENTRY);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
