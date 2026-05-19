import styles from "../styles/Footer.module.css";
import Link from "next/link";

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
      <p className={styles.footerCopy}>
        &copy; {new Date().getFullYear()} Alex Merced &mdash;{" "}
        <a href="https://www.alexmercedcoder.dev" rel="author noopener noreferrer">alexmercedcoder.dev</a>
      </p>
    </footer>
  );
}

export default Footer;
