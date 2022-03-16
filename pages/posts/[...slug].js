import fs from "fs";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js"
import styles from "../../styles/Post.module.css"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import mdVideo from "markdown-it-video"

// syntax highlighting?
const md = new MarkdownIt({
  html: true,
  linkify: false,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
}).use(mdVideo, // <-- this use(package_name) is required 
{
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 },
  vine: { width: 600, height: 600, embed: 'simple' },
  prezi: { width: 550, height: 400 }
})



// The page for each post
export default function Post({ frontmatter, content }) {
  const { title, author, category, date, bannerImage, tags } = frontmatter;

  return (
    <main className={styles.main}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`"${title}" an article written by ${author} touching on ${tags.join(", ")}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <img src={bannerImage} className={styles.img} alt={title} />
      <div className={styles.details}>
      <h2>
        <Link href={`/blog/author/${author.toLowerCase().replace(" ", "-")}`}>{author}</Link> || {date}
      </h2>
      <h3>
      <Link href={`/blog/category/${category}`}>{category}</Link> || {tags.map((tag, index) => {
        return <Link href={`/blog/tag/${tag}`} key={tag}>{`${index !== 0 ? "-" : ""} ${tag} `}</Link>
      })}
      </h3>
      </div>
      <div className="blog-post" dangerouslySetInnerHTML={{ __html: md.render(content) }} />
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


  // return list of paths
  return {
    paths,
    fallback: false,
  };
}

// Generate the static props for the page
export async function getStaticProps({params: {slug}}) {

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
