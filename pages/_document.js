import fs from "fs";
import path from "path";
import { Html, Head, Main, NextScript } from "next/document";

// Shared network head (GA4, click events, canonical Person JSON-LD), generated
// by alexmercedcom/scripts/build-network-shared.mjs and read at build time so a
// regenerate updates the site. Never paste its contents into templates.
const headHtml = fs.readFileSync(path.join(process.cwd(), "network", "network-head.html"), "utf-8");
const network = JSON.parse(fs.readFileSync(path.join(process.cwd(), "network", "network.json"), "utf-8"));

const toProps = (attrs) => {
  const props = {};
  const re = /([a-zA-Z:-]+)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(attrs))) props[m[1] === "async" ? "async" : m[1]] = m[2] === undefined ? true : m[2];
  return props;
};

const networkScripts = [...headHtml.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map((m, i) => {
  const props = toProps(m[1]);
  const inner = m[2];
  return inner.trim() ? (
    <script key={`network-${i}`} {...props} dangerouslySetInnerHTML={{ __html: inner }} />
  ) : (
    <script key={`network-${i}`} {...props} />
  );
});

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {networkScripts}
        <meta name="twitter:site" content={network.twitterSite} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
