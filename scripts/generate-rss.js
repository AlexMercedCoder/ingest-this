const fs = require("fs");
const matter = require("gray-matter");

const SITE_URL = "https://ingestthis.com";
const FEED_PATH = "./public/feed.xml";

const generateRSS = () => {
  let posts = [];

  // Read posts from posts directory
  const files = fs.readdirSync("posts");

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        const slug = `${fileName}/${f.replace(".md", "")}`;
        const readFile = fs.readFileSync(`posts/${fileName}/${f}`, "utf-8");
        const { data: frontmatter, content } = matter(readFile);
        posts.push({ slug, frontmatter, content });
      });
      return;
    }

    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);
    posts.push({ slug, frontmatter, content });
  });

  // Sort by date
  posts.sort((x, y) => new Date(y.frontmatter.date) - new Date(x.frontmatter.date));

  // Limit to last 20 posts
  posts = posts.slice(0, 20);

  const items = posts.map((post) => {
    return `
    <item>
      <title>${post.frontmatter.title.replace(/&/g, "&amp;")}</title>
      <link>${SITE_URL}/posts/${post.slug}</link>
      <guid>${SITE_URL}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.description || ""}]]></description>
    </item>`;
  });

  const rss = `<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>IngestThis</title>
      <link>${SITE_URL}</link>
      <description>Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects.</description>
      <language>en</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
      ${items.join("")}
    </channel>
  </rss>`;

  fs.writeFileSync(FEED_PATH, rss);
  console.log(`✅ RSS Feed generated at ${FEED_PATH}`);
};

generateRSS();
