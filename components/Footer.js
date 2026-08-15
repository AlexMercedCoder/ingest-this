import styles from "../styles/Footer.module.css";
import Link from "next/link";

const NETWORK = [
  {
    title: "Alex Merced",
    sites: [
      { label: "AlexMerced.com", url: "https://alexmerced.com" },
      { label: "WhoIsAlexMerced.com", url: "https://whoisalexmerced.com" },
      { label: "AlexMercedMedia.com", url: "https://alexmercedmedia.com" },
      { label: "Books", url: "https://books.alexmerced.com" },
      { label: "AlexMercedCoder.dev", url: "https://alexmercedcoder.dev" },
      { label: "AlexMercedData.com", url: "https://alexmerceddata.com" },
    ],
  },
  {
    title: "Lakehouse & Data",
    sites: [
      { label: "DataLakehouseHub.com", url: "https://datalakehousehub.com" },
      { label: "IcebergLakehouse.com", url: "https://iceberglakehouse.com" },
      { label: "AgenticLakehouse.com", url: "https://agenticlakehouse.com" },
      { label: "SemanticLakehouse.com", url: "https://semanticlakehouse.com" },
      { label: "DataEngnr.com", url: "https://dataengnr.com" },
    ],
  },
  {
    title: "Blogs",
    sites: [
      { label: "AlexMerced.blog", url: "https://alexmerced.blog" },
      { label: "GrokOverflow.com", url: "https://grokoverflow.com" },
    ],
  },
];

function Footer(props) {
  return (
    <footer className={styles.footer}>
      <nav className={styles.footerNav} aria-label="Footer navigation">
        <div className={styles.footerSection}>
          <strong>Topics</strong>
          <Link href="/blog/category/Data Engineering">Data Engineering</Link>
          <Link href="/blog/category/Apache Iceberg">Apache Iceberg</Link>
          <Link href="/blog/category/Data Lakehouse">Data Lakehouse</Link>
          <Link href="/blog/category/AI">AI &amp; Machine Learning</Link>
        </div>
        <div className={styles.footerSection}>
          <strong>Site</strong>
          <Link href="/blog">All Articles</Link>
          <Link href="/feed.xml">RSS Feed</Link>
          <a href="https://sitemap.ingestthis.com" rel="noopener noreferrer">Sitemap</a>
        </div>
        <div className={styles.footerSection}>
          <strong>Author</strong>
          <a href="https://www.alexmercedcoder.dev" rel="author noopener noreferrer">Alex Merced</a>
          <a href="https://www.linkedin.com/in/alexmerced" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.twitter.com/alexmercedcoder" rel="noopener noreferrer">Twitter / X</a>
        </div>
      </nav>

      <nav className={styles.network} aria-label="The Alex Merced Network">
        <h2 className={styles.networkTitle}>The Alex Merced Network</h2>
        <div className={styles.networkGrid}>
          {NETWORK.map((group) => (
            <div key={group.title} className={styles.footerSection}>
              <strong>{group.title}</strong>
              {group.sites.map((site) => (
                <a
                  key={site.url}
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </nav>
      <p className={styles.footerCopy}>
        &copy; {new Date().getFullYear()} Alex Merced &mdash;{" "}
        <a href="https://www.alexmercedcoder.dev" rel="author noopener noreferrer">alexmercedcoder.dev</a>
      </p>
      <p style={{fontSize:'0.8rem',marginTop:'0.25rem',opacity:0.7}}>
        The views, thoughts, and opinions expressed on this site belong solely to Alex Merced and do not represent the views of any organization or employer.
      </p>
    </footer>
  );
}

export default Footer;
