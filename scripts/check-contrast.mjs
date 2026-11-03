// Checks that every text color passes WCAG AA (4.5:1) on both backgrounds, in all four themes.
// usage: node scripts/check-contrast.mjs
import fs from "node:fs";

const css = fs.readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");
const TEXT = ["--ink", "--soft", "--accent", "--accent-2", "--gold"];
const BACKGROUNDS = ["--bg", "--bg-2"];

// WCAG relative luminance: linearize each sRGB channel, then weight by how bright the eye sees it
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

let failed = 0;
for (const theme of ["dawn", "day", "dusk", "night"]) {
  const block = css.match(new RegExp(`\\[data-theme="${theme}"\\]\\s*{([^}]*)}`))[1];
  const tokens = Object.fromEntries([...block.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
  for (const fg of TEXT) {
    for (const bg of BACKGROUNDS) {
      const r = ratio(tokens[fg], tokens[bg]);
      const ok = r >= 4.5;
      if (!ok) failed++;
      console.log(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(6)} ${fg.padEnd(10)} on ${bg.padEnd(5)} ${r.toFixed(2)}`);
    }
  }
}
console.log(failed ? `\n${failed} pair(s) below 4.5:1` : "\nall pairs pass 4.5:1");
process.exit(failed ? 1 : 0);
