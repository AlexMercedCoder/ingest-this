import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

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
        <section className={styles.hero}>
            <h1>IngestThis!</h1>
            <h2>Data Engineering, Science, and Architecture Content</h2>
            <p>
            Home for data professionals. Articles, tutorials, and resources for Data Engineers, Scientists, Analysts, and Architects.
            </p>
            <p>
          Guest submissions are welcome. Pitch me your idea by emailing me at
          alex@ingestthis.com or message me in the devNursery slack community.
            </p>
        </section>
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "IngestThis",
              url: "https://ingestthis.com/",
            }),
          }}
        />

        <section className={styles.socialGrid}>
            <a href="https://www.twitter.com/alexmercedcoder" className={styles.socialCard}>
                <h3>Twitter</h3>
                <p>General Dev Account</p>
            </a>
            <a href="https://www.twitter.com/amlakehouse" className={styles.socialCard}>
                <h3>Twitter</h3>
                <p>Data Engineering</p>
            </a>
             <a href="https://www.linkedin.com/in/alexmerced" className={styles.socialCard}>
                <h3>LinkedIn</h3>
                <p>Professional Profile</p>
            </a>
            <a href="https://www.instagram.com/alexmercedcoder" className={styles.socialCard}>
                <h3>Instagram</h3>
                <p>Personal & Tech</p>
            </a>
            <a href="https://www.github.com/alexmercedcoder" className={styles.socialCard}>
                <h3>GitHub</h3>
                <p>Code & Projects</p>
            </a>
            <a href="https://www.youtube.com/c/AlexMercedFullStackDeveloper" className={styles.socialCard}>
                <h3>YouTube</h3>
                <p>Video Tutorials</p>
            </a>
            <a href="https://odysee.com/@alexmercedcoder:e" className={styles.socialCard}>
                <h3>Odysee</h3>
                <p>Video Backup</p>
            </a>
             <a href="https://indieweb.social/@alexmerced" className={styles.socialCard}>
                <h3>Mastodon</h3>
                <p>Decentralized Social</p>
            </a>
            <a href="https://open.spotify.com/show/3KHzqR9eFW6bJ1Tqoh2juM" className={styles.socialCard}>
                <h3>DataNation</h3>
                <p>Podcast</p>
            </a>
            <a href="https://open.spotify.com/show/04ZuSb96sicLYm9xb3NpXC" className={styles.socialCard}>
                <h3>Web Dev 101</h3>
                <p>Podcast</p>
            </a>
            <a href="https://www.grokoverflow.com" className={styles.socialCard} style={{gridColumn: '1 / -1', textAlign: 'center'}}>
                <h3>GrokOverflow</h3>
                <p>My Developer Portfolio & Blog</p>
            </a>
        </section>
      </main>
    </div>
  );
}
