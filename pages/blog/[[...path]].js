import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Blog.module.css";
import Head from "next/head";
import { useState, useRef } from "react";
import Fuse from "fuse.js";
import BlogCard from "../../components/BlogCard";

// The Blog Page Content
export default function Blog({ posts, categories, pageTitle }) {
  const searchRef = useRef(null);
  const maxSlice = Math.ceil(posts.length / 20);

  const getPostSlice = (page) => {
    const firstPost = (page - 1) * 20;
    const lastPost = page < maxSlice ? page * 20 : posts.length - 1;
    console.log(firstPost, lastPost);

    return {
      page,
      slice: posts.slice(firstPost, lastPost),
    };
  };

  // Fuse.js configuration
  const fuseOptions = {
    keys: ["frontmatter.title", "frontmatter.tags", "frontmatter.description"],
    threshold: 0.3,
  };

  const [postSlice, setPostSlice] = useState(getPostSlice(1));

  const search = () => {
    const term = searchRef.current.value;
    if (!term) {
        setPostSlice(getPostSlice(1));
        return;
    }

    const fuse = new Fuse(posts, fuseOptions);
    const result = fuse.search(term);
    const results = result.map(r => r.item);

    setPostSlice({
      page: 1,
      slice: results,
    });
  };

  return (
    <main className={styles.main}>
      <Head>
        <title>IngestThis - Blog & Articles</title>
        <meta
          name="description"
          content="Browse the latest articles on Data Engineering, Data Science, and Architecture on IngestThis."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IngestThis - Blog & Articles" />
        <meta property="og:description" content="Browse the latest articles on Data Engineering, Data Science, and Architecture on IngestThis." />
        <meta property="og:image" content="https://ingestthis.com/images/banner.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="IngestThis - Blog & Articles" />
        <meta property="twitter:description" content="Browse the latest articles on Data Engineering, Data Science, and Architecture on IngestThis." />
        <meta property="twitter:image" content="https://ingestthis.com/images/banner.png" />
      </Head>
      <aside className={styles.featured}>
        {pageTitle ? (
            <h1>{pageTitle}</h1>
        ) : (
            <>
            <h1>Featured Post</h1>
            <Link href={`/posts/${posts[0].slug}`}>
            {posts[0].frontmatter.title}
            </Link>
            </>
        )}
      </aside>

      <aside className={styles.blogs}>
        {postSlice.slice.map((post) => (
            <BlogCard key={post.slug} post={post} />
        ))}
      </aside>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            const page = postSlice.page > 1 ? postSlice.page - 1 : 1;
            setPostSlice(getPostSlice(page));
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            const page =
              postSlice.page < maxSlice ? postSlice.page + 1 : maxSlice;
            setPostSlice(getPostSlice(page));
          }}
        >
          Next
        </button>
      </div>
      <aside className={styles.c}>
        {/* Search moved to Header */}
        <div className={styles.categories}>
          <h4 className={styles.rtitle}>Categories</h4>
          {categories.map((c) => {
            return (
              <div key={c}>
                <Link href={`/blog/category/${c}`}>{c}</Link>
              </div>
            );
          })}
        </div>
      </aside>
    </main>
  );
}

// Generating paths for categories, tags, years

export async function getStaticPaths(...args) {
  let paths = ["/blog"];

  // get list of files from the posts folder
  const files = fs.readdirSync("posts");

  // get frontmatter & slug from each post
  let posts = [];

  const addPost = (fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    posts.push({
      slug,
      frontmatter,
    });
  };

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);

      subfiles.forEach((f) => {
        addPost(`${fileName}/${f}`);
      });

      return true;
    }

    addPost(fileName);
  });

  posts.forEach(({ frontmatter }) => {
    // path for each category
    paths.push(`/blog/category/${frontmatter.category}`);
    // path for each tag
    frontmatter.tags.forEach((tag) => {
      paths.push(`/blog/tag/${tag}`);
    });
    // paths for each author
    paths.push(
      `/blog/author/${frontmatter.author.toLowerCase().replace(" ", "-")}`
    );
  });

  paths = [...new Set(paths)];

  return {
    paths,
    fallback: false,
  };
}

//Generating the Static Props for the Blog Page
export async function getStaticProps({ params: { path } }) {
  // get list of files from the posts folder
  const files = fs.readdirSync("posts");

  // get frontmatter & slug from each post
  let posts = [];

  const addPost = (fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);

    posts.push({
      slug,
      frontmatter,
    });
  };

  files.forEach((fileName) => {
    if (!fileName.includes(".md")) {
      const subfiles = fs.readdirSync(`posts/${fileName}`);

      subfiles.forEach((f) => {
        addPost(`${fileName}/${f}`);
      });

      return true;
    }

    addPost(fileName);
  });

  // generate lists of categories
  let categories = [];
  posts.forEach(({ frontmatter }) => categories.push(frontmatter.category));
  categories = [...new Set(categories)];

  // filter by category or tag for a category or tag page
  let pageTitle = null;

  if (path) {
    if (path[0] === "category") {
      pageTitle = `Category: ${path[1]}`;
      posts = posts.filter(({ frontmatter }) => {
        return frontmatter.category === path[1];
      });
    }

    if (path[0] === "tag") {
      pageTitle = `Tag: ${path[1]}`;
      posts = posts.filter(({ frontmatter }) => {
        return frontmatter.tags.includes(path[1]);
      });
    }

    if (path[0] === "author") {
        const authorName = path[1].replace("-", " "); // Naive cleanup
        pageTitle = `Author: ${authorName}`; 
      posts = posts.filter(({ frontmatter }) => {
        return frontmatter.author.toLowerCase() === authorName;
      });
    }
  }

  posts.sort(
    (x, y) =>
      new Date(y.frontmatter.date).getTime() -
      new Date(x.frontmatter.date).getTime()
  );

  // Return the pages static props
  return {
    props: {
      posts,
      categories,
      pageTitle
    },
  };
}
