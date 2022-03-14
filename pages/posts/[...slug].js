import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";

// The page for each post
export default function Post({ frontmatter, content }) {
  const { title, author, category, date, bannerImage, tags } = frontmatter;

  return (
    <main>
      <img src={bannerImage} />
      <h1>{title}</h1>
      <h2>
        {author} || {date}
      </h2>
      <h3>
        {category} || {tags.join()}
      </h3>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </main>
  );
}

// Generating the paths for each post
export async function getStaticPaths() {
  // Get list of all files from our posts directory
  const files = fs.readdirSync("posts");
  // Generate a path for each one
  const paths = [];

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);
      subfiles.forEach((f) => {
        paths.push(`/posts/${fileName}/${f.replace(".md", "")}`);
      });
      return "done";
    }

    paths.push(`/posts/${fileName.replace(".md", "")}`);
  });

  paths.forEach(p => console.log(p));

  // return list of paths
  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({params: {slug}}) {
  console.log("SLUG:", slug)
  if (slug.length === 2) {
    const fileName = fs.readFileSync(
      `posts/${slug[0]}/${slug[1]}.md`,
      "utf-8"
    );
    const { data: frontmatter, content } = matter(fileName);
    return {
      props: {
        frontmatter,
        content,
      },
    };
  }
  const fileName = fs.readFileSync(`posts/${slug[0]}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}
