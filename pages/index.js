import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

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

export default function Home() {
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

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <h1>IngestThis!</h1>
          <h2>Data Engineering, Science, and Architecture Content</h2>
          <p>
            Home for data professionals. Articles, tutorials, and resources for Data Engineers,
            Scientists, Analysts, and Architects.
          </p>
          <p>
            Guest submissions are welcome. Pitch your idea by emailing{" "}
            <a href="mailto:alex@ingestthis.com">alex@ingestthis.com</a> or join the{" "}
            <a href="https://join.slack.com/t/thedatalakehousehub/shared_invite/zt-274yc8sza-mI2zhCW8LGkOh1uxuf8T5Q" rel="noopener noreferrer">The Data Lakehouse Hub Slack community</a>.
          </p>
          <a href="/blog" className={styles.heroCta}>Read the Blog →</a>
        </section>

        {/* ── JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "IngestThis",
              url: "https://ingestthis.com/",
              description: "Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects covering Data Engineering, Apache Iceberg, Data Lakehouses, and AI.",
              potentialAction: {
                "@type": "SearchAction",
                target: { "@type": "EntryPoint", urlTemplate: "https://ingestthis.com/blog?q={search_term_string}" },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "IngestThis",
                url: "https://ingestthis.com/",
                logo: { "@type": "ImageObject", url: "https://ingestthis.com/images/ig-logo-huddle.png" },
                sameAs: [
                  "https://twitter.com/amdatalakehouse",
                  "https://www.linkedin.com/in/alexmerced",
                  "https://www.youtube.com/@alexmerceddata",
                  "https://bsky.app/profile/alextalksdatalakehouses.fyi",
                ],
              },
            }),
          }}
        />

        {/* ── MUST READS ── */}
        <section className={styles.mustReads}>
          <div className={styles.mustReadsHeader}>
            <span className={styles.mustReadsBadge}>Must Reads</span>
            <h2 className={styles.mustReadsTitle}>Data Lakehouses &amp; Agentic Analytics</h2>
            <p className={styles.mustReadsSubtitle}>
              Authoritative guides to the modern data ecosystem — curated from Dremio&apos;s engineering blog.
            </p>
          </div>
          <div className={styles.mustReadsGrid}>
            {MUST_READS.map((article) => (
              <a
                key={article.url}
                href={article.url}
                className={styles.mustReadCard}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.mustReadTag}>{article.tag}</span>
                <h3 className={styles.mustReadTitle}>{article.title}</h3>
                <p className={styles.mustReadSummary}>{article.summary}</p>
                <span className={styles.mustReadCta}>Read on Dremio.com →</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONNECT ── */}
        <section className={styles.connectSection}>
          <h2 className={styles.connectTitle}>Connect with Alex</h2>
          <div className={styles.socialGrid}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className={styles.socialCard}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <h3>{link.name}</h3>
                <p>{link.desc}</p>
              </a>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
