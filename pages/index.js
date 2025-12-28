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
        <h1>Welcome to IngestThis!</h1>
        <h2>Content for Data Engineers, Scientists, Analysts and Architects</h2>
        <p>
          {" "}
          My name is Alex Merced (alexmercedcoder.dev) and on this website you
          will be the home of a content that data professionals and aspiring
          data professionals may find useful.
        </p>
        <p>
          Guest submissions are welcome. Pitch me your idea by emailing me at
          alex@ingestthis.com or message me in the devNursery slack community
          linked in the navigation.
        </p>
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
        <p>
          Also make sure to follow me on the following platforms:
          <ul>
            <li>
              <a href="https://www.twitter.com/alexmercedcoder">
                Twitter (General Development account)
              </a>
            </li>
            <li>
              <a href="https://www.twitter.com/amlakehouse">
                Twitter (Data Engineering Account)
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/alexmerced">LinkedIn</a>
            </li>
            <li>
              <a href="https://www.instagram.com/alexmercedcoder">Instagram</a>
            </li>
            <li>
              <a href="https://www.github.com/alexmercedcoder">Github</a>
            </li>
            <li>
              <a href="https://www.youtube.com/c/AlexMercedFullStackDeveloper">
                Youtube.com
              </a>
            </li>
            <li>
              <a href="https://odysee.com/@alexmercedcoder:e">
                Odysee (Alternative Video Network)
              </a>
            </li>
            <li>
              <a href="https://indieweb.social/@alexmerced">
                Mastodon (Twitter Alternative)
              </a>
            </li>
            <li>
              <a href="https://open.spotify.com/show/3KHzqR9eFW6bJ1Tqoh2juM">
                DataNation Podcast
              </a>
            </li>
            <li>
              <a href="https://open.spotify.com/show/04ZuSb96sicLYm9xb3NpXC">
                Web Dev 101 Podcast
              </a>
            </li>
            <li>
              <a href="https://www.grokoverflow.com">
                GrokOverflow - Content for Devs
              </a>
            </li>
          </ul>
        </p>
      </main>
    </div>
  );
}
