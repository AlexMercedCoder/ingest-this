/**
 * Build-time OG image generator for IngestThis
 *
 * Uses satori to render JSX → SVG, then @resvg/resvg-js to convert SVG → PNG.
 * Generates /og/<slug>.png images for every post in posts/,
 * saving them under public/og/ so they're served as static files.
 *
 * Run via postbuild: node scripts/generate-og-images.mjs
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

// ── Configuration ──────────────────────────────────────────────────────────
const DOMAIN = "ingestthis.com";
const BRAND = "IngestThis";
const COLORS = {
  accent: "#0f766e",    // teal
  bg: "#f8fafc",        // white-ish
  text: "#1e293b",      // slate-800
};

const OG_WIDTH = 1200;
const OG_HEIGHT = 600;
const POSTS_DIR = path.resolve("posts");
const OUTPUT_DIR = path.resolve("public/og");

// ── Font loading ───────────────────────────────────────────────────────────

async function loadFont(url) {
  const res = await fetch(url);
  return res.arrayBuffer();
}

// ── Satori component ───────────────────────────────────────────────────────

function ogTemplate({ title }) {
  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.bg,
        fontFamily: "Inter",
        padding: "0 80px",
        position: "relative",
      },
      children: [
        // Top accent bar
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 20,
              backgroundColor: COLORS.accent,
            },
          },
        },
        // Brand name
        {
          type: "div",
          props: {
            style: {
              color: COLORS.accent,
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: 24,
            },
            children: BRAND,
          },
        },
        // Title
        {
          type: "div",
          props: {
            style: {
              color: COLORS.text,
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.25,
              textAlign: "center",
              maxWidth: 900,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            },
            children: title,
          },
        },
        // Bottom accent bar
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 8,
              backgroundColor: COLORS.accent,
            },
          },
        },
        // Domain watermark bottom-right
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              bottom: 24,
              right: 40,
              color: "#94a3b8",
              fontSize: 18,
              fontWeight: 500,
            },
            children: DOMAIN,
          },
        },
      ],
    },
  };
}

// ── Slug derivation ────────────────────────────────────────────────────────

/**
 * Derive a clean slug from a post's file path relative to the posts/ directory.
 * Removes the .md extension and uses the path segments.
 *
 * Examples:
 *   posts/2026/2026-01-foo.md     → 2026/2026-01-foo
 *   posts/04-foo.md               → 04-foo
 */
function deriveSlug(absolutePath) {
  const relative = path.relative(POSTS_DIR, absolutePath);
  return relative.replace(/\.md$/, "");
}

// ── Image generation ───────────────────────────────────────────────────────

async function generateOGImage(postPath) {
  const raw = fs.readFileSync(postPath, "utf-8");
  const { data: frontmatter } = matter(raw);
  const title = frontmatter.title || "IngestThis Blog";
  const slug = deriveSlug(postPath);
  const outputPath = path.join(OUTPUT_DIR, `${slug}.png`);

  // Already exists? Skip (we only regenerate when posts change)
  if (fs.existsSync(outputPath)) {
    console.log(`  ✓ SKIP  ${slug} (exists)`);
    return;
  }

  // Render JSX-like tree to SVG via satori
  const svg = await satori(ogTemplate({ title }), {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      {
        name: "Inter",
        data: await loadFont(
          "https://fonts.cdnfonts.com/s/19790/Inter_18pt-Bold.woff"
        ),
        weight: 700,
        style: "normal",
      },
      {
        name: "Inter",
        data: await loadFont(
          "https://fonts.cdnfonts.com/s/19790/Inter_18pt-Medium.woff"
        ),
        weight: 500,
        style: "normal",
      },
    ],
  });

  // Convert SVG to PNG buffer
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: OG_WIDTH },
    background: COLORS.bg,
  });
  const pngBuffer = resvg.render().asPng();

  // Ensure output subdirectory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Write PNG
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`  ✓ OK    ${slug}`);
}

// ── Entry point ────────────────────────────────────────────────────────────

async function main() {
  console.log("\n── OG Image Generator ──────────────────────────────\n");
  console.log(`  Output: ${OUTPUT_DIR}\n`);

  // Collect all .md files from posts/ (recursive, nested year dirs)
  const postFiles = [];

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".md")) {
        postFiles.push(fullPath);
      }
    }
  }

  walk(POSTS_DIR);

  console.log(`  Found ${postFiles.length} posts\n`);

  let count = 0;
  for (const file of postFiles) {
    await generateOGImage(file);
    count++;
  }

  console.log(`\n  Done! Generated/checked ${count} OG images.\n`);
}

main().catch((err) => {
  console.error("OG image generation failed:", err);
  process.exit(1);
});
