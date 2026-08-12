import Head from "next/head";
import Image from "next/image";
import fs from "fs";
import matter from "gray-matter";
import styles from "../styles/Home.module.css";
import BlogCard from "../components/BlogCard";

// Must Read articles
const MUST_READS = [
  {
    title: "The Semantic Layer: Definitive Guide",
    summary: "A comprehensive guide to the Semantic Layer — how it creates a single source of truth for metrics, powers headless BI, and makes AI agents answer business questions accurately.",
    url: "https://www.dremio.com/blog/semantic-layer-the-definitive-guide/",
    tag: "Semantic Layer",
  },
  {
    title: "Apache Polaris: The Catalog Standard for Lakehouses and AI",
    summary: "How Apache Polaris is emerging as the universal Iceberg catalog standard, enabling multi-engine interoperability and governed AI access across the lakehouse ecosystem.",
    url: "https://www.dremio.com/blog/apache-polaris-the-catalog-standard-for-lakehouses-and-ai/",
    tag: "Apache Polaris",
  },
  {
    title: "What Are Table Formats and Why Were They Needed?",
    summary: "The origin story of open table formats — the problems with Hive, why Apache Iceberg, Delta Lake, and Hudi were created, and what they unlock for modern data platforms.",
    url: "https://www.dremio.com/blog/what-are-table-formats-and-why-were-they-needed/",
    tag: "Table Formats",
  },
  {
    title: "What Is Dremio?",
    summary: "A clear-eyed breakdown of what Dremio is, how its semantic layer, query federation, Reflections, and Apache Arrow Flight power the Intelligent Lakehouse Platform.",
    url: "https://www.dremio.com/blog/what-is-dremio/",
    tag: "Dremio",
  },
  {
    title: "What Apache Iceberg Native Actually Means",
    summary: "Not all 'Iceberg support' is equal. This piece breaks down what it means to be genuinely Apache Iceberg native versus bolt-on, and why it matters for your lakehouse.",
    url: "https://www.dremio.com/blog/what-apache-iceberg-native-actually-means/",
    tag: "Apache Iceberg",
  },
  {
    title: "Open Source and the Data Lakehouse",
    summary: "How the Apache Software Foundation's open-source projects — Iceberg, Arrow, Parquet, Polaris — form the modular foundation of the modern open data lakehouse.",
    url: "https://www.dremio.com/blog/open-source-and-the-data-lakehouse/",
    tag: "Open Source",
  },
  {
    title: "What Is Agentic Analytics?",
    summary: "Agentic AI is reshaping how organizations interact with data. This guide explains agentic analytics, the role of the semantic layer, and why query performance matters for AI agents.",
    url: "https://www.dremio.com/blog/what-is-agentic-analytics/",
    tag: "Agentic AI",
  },
  {
    title: "Definitive Guide to the Data Lakehouse",
    summary: "The complete, authoritative guide to the Data Lakehouse architecture — what it is, why it supersedes the data warehouse + data lake combination, and how to build one.",
    url: "https://www.dremio.com/blog/definitive-guide-to-the-data-lakehouse/",
    tag: "Data Lakehouse",
  },
  {
    title: "How Dremio Keeps Agentic Analytics Fast Without Manual Tuning",
    summary: "How Dremio's layered autonomous performance architecture — Reflections, caching, vectorized execution — handles unpredictable AI agent query patterns at interactive speed.",
    url: "https://www.dremio.com/blog/how-dremio-keeps-agentic-analytics-fast-without-manual-tuning/",
    tag: "AI & Performance",
  },
];

// Updated social links from alexmerced.com
const SOCIAL_LINKS = [
  { name: "GitHub", desc: "Code & Projects", url: "https://github.com/alexmercedcoder" },
  { name: "LinkedIn", desc: "Professional Profile", url: "https://www.linkedin.com/in/alexmerced" },
  { name: "YouTube (Data)", desc: "Data Engineering Videos", url: "https://www.youtube.com/@alexmerceddata" },
  { name: "YouTube (Dev)", desc: "Web Dev Tutorials", url: "https://www.youtube.com/@alexmercedcoder" },
  { name: "BlueSky", desc: "Data Lakehouse Updates", url: "https://bsky.app/profile/alextalksdatalakehouses.fyi" },
  { name: "Twitter / X", desc: "Data Lakehouse Community", url: "https://twitter.com/amdatalakehouse" },
  { name: "Mastodon", desc: "Decentralized Social", url: "https://me.dm/@thealexmerced" },
  { name: "TikTok", desc: "Short-form Tech Content", url: "https://www.tiktok.com/@alexmercedcoder" },
  { name: "Instagram", desc: "Personal & Tech", url: "https://www.instagram.com/alexmercedcoder" },
  { name: "Tech Podcast", desc: "DataNation on Spotify", url: "https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF" },
  { name: "Newsletter", desc: "Weekly Lakehouse Insights", url: "https://amdatalakehouse.substack.com/" },
  { name: "All Books", desc: "Alex's Published Works", url: "https://books.alexmerced.com" },
  { name: "DataLakehouseHub", desc: "Lakehouse Community Hub", url: "https://main.datalakehousehub.com" },
  { name: "DataEngnr.com", desc: "Data Engineering Knowledge Base", url: "https://dataengnr.com" },
  { name: "Buy Me a Coffee", desc: "Support the Content", url: "https://buymeacoffee.com/alexmerced" },
];

export default function Home({ posts, postCount }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>IngestThis - Data Engineering, Science, and Architecture Content</title>
        <meta
          name="description"
          content="IngestThis is the home for data professionals. Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ingestthis.com/" />
        <meta property="og:title" content="IngestThis - Data Engineering Content" />
        <meta property="og:description" content="Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects." />
        <meta property="og:image" content="https://ingestthis.com/images/banner.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://ingestthis.com/" />
        <meta property="twitter:title" content="IngestThis - Data Engineering Content" />
        <meta property="twitter:description" content="Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects." />
        <meta property="twitter:image" content="https://ingestthis.com/images/banner.png" />
      </Head>

      <main className={styles.main}>

        {/* ── Masthead ── */}
        <header className={styles.masthead}>
          <p className={styles.kicker}>
            Data engineering <span>·</span> science <span>·</span> architecture
          </p>
          <h1 className={styles.wordmark}>
            Ingest<span className={styles.wordmarkAccent}>This</span>
          </h1>
          <p className={styles.standfirst}>
            Working notes for people who move data for a living. Pipelines,
            lakehouses, table formats, and the architecture underneath them.
          </p>
          <div className={styles.mastheadActions}>
            <a href="/blog" className={styles.btnSignal}>Read the archive</a>
            <a
              href="https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q"
              rel="noopener noreferrer"
              className={styles.btnLine}
            >
              Join the Slack
            </a>
          </div>
          <dl className={styles.colophon}>
            <div><dt>Articles</dt><dd>{postCount}+</dd></div>
            <div><dt>Topics</dt><dd>Iceberg, pipelines, AI</dd></div>
            <div><dt>Submissions</dt><dd>Open</dd></div>
            <div><dt>Price</dt><dd>Free</dd></div>
          </dl>
        </header>

        {/* ── Index of latest articles ── */}
        <section className={styles.indexSection}>
          <div className={styles.sectionHead}>
            <h2>Latest</h2>
            <a href="/blog" className={styles.sectionLink}>All articles</a>
          </div>

          <ol className={styles.index}>
            {posts && posts.map((post, i) => (
              <li key={post.slug}>
                <a href={`/posts/${post.slug}`} className={styles.indexRow}>
                  <span className={styles.indexNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.indexBody}>
                    <span className={styles.indexTitle}>
                      {post.frontmatter.title}
                    </span>
                    {post.frontmatter.description && (
                      <span className={styles.indexDek}>
                        {post.frontmatter.description}
                      </span>
                    )}
                  </span>
                  <span className={styles.indexMeta}>
                    {post.frontmatter.date}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Reference shelf ── */}
        <section className={styles.shelfSection}>
          <div className={styles.sectionHead}>
            <h2>Reference shelf</h2>
            <span className={styles.sectionNote}>Long reads from around the web</span>
          </div>
          <div className={styles.shelf}>
            {MUST_READS.map((item, i) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.shelfItem}
              >
                <span className={styles.shelfTag}>{item.tag}</span>
                <h3 className={styles.shelfTitle}>{item.title}</h3>
                <p className={styles.shelfSummary}>{item.summary}</p>
                <span className={styles.shelfCta}>Read</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Colophon / elsewhere ── */}
        <section className={styles.elsewhere}>
          <div className={styles.sectionHead}>
            <h2>Elsewhere</h2>
            <span className={styles.sectionNote}>
              Pitch an idea: <a href="mailto:alex@ingestthis.com">alex@ingestthis.com</a>
            </span>
          </div>
          <ul className={styles.linkColumns}>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <span>{link.name}</span>
                  <em>{link.desc}</em>
                </a>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
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

  posts.sort(
    (x, y) =>
      new Date(y.frontmatter.date).getTime() -
      new Date(x.frontmatter.date).getTime()
  );

  return {
    props: {
      posts: posts.slice(0, 8),
      // Rounded down so the figure stays honest as the archive grows.
      postCount: Math.floor(posts.length / 25) * 25,
    },
  };
}
