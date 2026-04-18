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

  const items = posts.map((post) => {
    return `- [${post.frontmatter.title}](${SITE_URL}/posts/${post.slug}): ${post.frontmatter.description || "Article about " + post.frontmatter.title}`;
  });

  const content = `# IngestThis

Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects.

## Technical Articles & Tutorials

${items.join("\n")}
`;

  fs.writeFileSync(FILE_PATH, content);
  console.log(`✅ llms.txt generated at ${FILE_PATH}`);
};

generateLLMSTxt();
