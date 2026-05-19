const fs = require("fs");
const matter = require("gray-matter");

const SITE_URL = "https://ingestthis.com";
const FILE_PATH = "./public/llms.txt";

const generateLLMSTxt = () => {
  let posts = [];
  const files = fs.readdirSync("posts");

  files.forEach((fileName) => {
    // Handling nested year directories or direct files
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        const slug = `${fileName}/${f.replace(".md", "")}`;
        const readFile = fs.readFileSync(`posts/${fileName}/${f}`, "utf-8");
        const { data: frontmatter } = matter(readFile);
        posts.push({ slug, frontmatter });
      });
      return;
    }

    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    posts.push({ slug, frontmatter });
  });

  posts.sort((x, y) => new Date(y.frontmatter.date) - new Date(x.frontmatter.date));

  // Collect unique categories for Topics section
  const categories = [...new Set(posts.map((p) => p.frontmatter.category).filter(Boolean))].sort();

  const items = posts.map((post) => {
    return `- [${post.frontmatter.title}](${SITE_URL}/posts/${post.slug}): ${post.frontmatter.description || "Article about " + post.frontmatter.title}`;
  });

  const content = `# IngestThis

> Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects.

## About

IngestThis is a technical blog focused on the modern data ecosystem — covering Data Engineering fundamentals, Apache Iceberg, Data Lakehouses, AI-ready data infrastructure, and developer tools. It is authored primarily by Alex Merced (Head of Developer Relations at Dremio), with guest contributions from the data community.

- **Author:** Alex Merced
- **Author Site:** https://www.alexmercedcoder.dev
- **Author LinkedIn:** https://www.linkedin.com/in/alexmerced
- **Author Twitter:** https://www.twitter.com/alexmercedcoder
- **Contact:** alex@ingestthis.com
- **Community:** https://join.slack.com/t/datanationcom-gti9492/shared_invite/zt-12xrk4qmd-y~6jUFFd7kdaLhgLURKwoA
- **RSS Feed:** ${SITE_URL}/feed.xml
- **Sitemap:** ${SITE_URL}/sitemap.xml

## Topics Covered

${categories.map((c) => `- ${c}`).join("\n")}

## Technical Articles & Tutorials

${items.join("\n")}
`;

  fs.writeFileSync(FILE_PATH, content);
  console.log(`✅ llms.txt generated at ${FILE_PATH}`);
};

generateLLMSTxt();
