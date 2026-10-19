import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";

describe("Adaptive Dynamic SVG Favicon", () => {
  const faviconPath = path.resolve(process.cwd(), "public/favicon.svg");
  const indexPath = path.resolve(process.cwd(), "index.html");

  it("public/favicon.svg implements dynamic prefers-color-scheme dark/light adaptation", () => {
    expect(fs.existsSync(faviconPath)).toBe(true);
    const content = fs.readFileSync(faviconPath, "utf-8");

    // Must be valid SVG
    expect(content).toContain("<svg");
    expect(content).toContain("</svg>");

    // Must contain dynamic media query for dark mode
    expect(content).toContain("@media (prefers-color-scheme: dark)");

    // Must use brand Teal color #00bba7 and must not contain obsolete placeholder blue #3b82f6
    expect(content).toContain("#00bba7");
    expect(content).not.toContain("#3b82f6");
    expect(content).not.toContain("#1d4ed8");

    // Must render CL monogram
    expect(content).toContain("CL");
  });

  it("index.html includes theme-color support and links to /favicon.svg", () => {
    expect(fs.existsSync(indexPath)).toBe(true);
    const html = fs.readFileSync(indexPath, "utf-8");

    expect(html).toContain('href="/favicon.svg"');
    expect(html).toContain('name="theme-color"');
  });
});

