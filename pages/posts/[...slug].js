import fs from "fs";
import matter from "gray-matter";
import styles from "../../styles/Post.module.css"
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'

import Comments from "../../components/Comments";
import CopyButton from "../../components/CopyButton";
import { Children } from "react";

// Custom Pre component for Copy Button
const Pre = ({ children, ...props }) => {
    // Extract text content from the code block
    let codeText = "";
    try {
        // If children is a <code> element (standard markdown)
        if (children && children.props && children.props.children) {
             codeText = children.props.children;
        } else if (typeof children === "string") {
            codeText = children;
        }
    } catch (e) {
        console.error("Error parsing code block for copy", e);
    }

    return (
        <div style={{ position: "relative" }}>
            <CopyButton text={codeText} />
            <pre {...props}>{children}</pre>
        </div>
    );
};

const components = {
    pre: Pre
};




// The page for each post
export default function Post({ frontmatter, mdxSource, relatedPosts, readingTime }) {
  const { title, author, category, date, bannerImage, tags } = frontmatter;

  return (
    <main className={styles.main}>
      <Head>
        {/* ... existing head content ... */}
        <title>{title} | IngestThis</title>
        <meta name="description" content={`"${title}" - ${tags.join(", ")}. Written by ${author}.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`Read "${title}" by ${author} on IngestThis.`} />
        <meta property="og:image" content={bannerImage || `https://ingestthis.com/api/og?title=${encodeURIComponent(title)}`} />
        <meta property="article:author" content={author} />
        <meta property="article:published_time" content={date} />
        <meta property="article:tag" content={tags.join(",")} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={`Read "${title}" by ${author} on IngestThis.`} />
        <meta property="twitter:image" content={bannerImage || `https://ingestthis.com/api/og?title=${encodeURIComponent(title)}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              image: [
                bannerImage || "https://ingestthis.com/images/banner.png",
              ],
              datePublished: date,
              author: {
                "@type": "Person",
                name: author,
                url: `https://ingestthis.com/blog/author/${author
                  .toLowerCase()
                  .replace(" ", "-")}`,
              },
            }),
          }}
        />
      </Head>



      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.metadata}>
        <div className={styles.metaRow}>
            <span>🗓 {date}</span>
            <span>👤 <Link href={`/blog/author/${author.toLowerCase().replace(" ", "-")}`}>{author}</Link></span>
            <span>⏱ {readingTime} min read</span>
        </div>
        <div className={styles.tagsRow}>
             <Link href={`/blog/category/${category}`} className={styles.categoryPill}>{category}</Link>
             {tags.map((tag) => (
                <Link href={`/blog/tag/${tag}`} key={tag} className={styles.tagHash}>#{tag}</Link>
             ))}
        </div>
      </div>
      <div className="blog-post">
        <MDXRemote {...mdxSource} components={components} />
      </div>
      <hr />
      <h3>Read Next</h3>
      <div className={styles.related}>
        {relatedPosts.map((post) => (
            <div key={post.slug} className={styles.relatedPost}>
            <Link href={`/posts/${post.slug}`} className={styles.relatedLink}>
                {post.frontmatter.title}
            </Link>
            </div>
        ))}
      </div>
      <Comments />
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
export async function getStaticProps({ params: { slug } }) {
  let fileName;
  
  if (slug.length === 2) {
    fileName = fs.readFileSync(
      `posts/${slug[0]}/${slug[1]}.md`,
      "utf-8"
    );
  } else {
    fileName = fs.readFileSync(`posts/${slug[0]}.md`, "utf-8");
  }

  const { data: frontmatter, content } = matter(fileName);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  })
  
  // Calculate reading time
  const wordCount = content.split(/\s+/g).length;
  const readingTime = Math.ceil(wordCount / 200);
  
  // Calculate related posts
  const allFiles = fs.readdirSync("posts");
  let allPosts = [];
  
  allFiles.forEach((f) => {
    if (!f.includes(".md")) {
        const subfiles = fs.readdirSync(`posts/${f}`);
        subfiles.forEach((sf) => {
            const raw = fs.readFileSync(`posts/${f}/${sf}`, "utf-8");
            const { data } = matter(raw);
            allPosts.push({ slug: `${f}/${sf.replace(".md", "")}`, frontmatter: data });
        });
        return;
    }
    const raw = fs.readFileSync(`posts/${f}`, "utf-8");
    const { data } = matter(raw);
    allPosts.push({ slug: f.replace(".md", ""), frontmatter: data });
  });

  const currentSlug = slug.join("/");
  const currentTags = frontmatter.tags || [];

  // Filter by tags (at least one matching tag), exclude current post
  const relatedPosts = allPosts.filter(p => {
    if (p.slug === currentSlug) return false;
    const pTags = p.frontmatter.tags || [];
    return pTags.some(t => currentTags.includes(t));
  }).slice(0, 3);

  return {
    props: {
        frontmatter,
        mdxSource,
        mdxSource,
        relatedPosts,
        readingTime
    },
  };
}
