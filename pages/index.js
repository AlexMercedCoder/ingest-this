import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>
          IngestThis - content for Data Engineers, Scientists, Analysts and
          Architects
        </title>
        <meta
          name="description"
          content="IngestThis - content for Data Engineers, Scientists, Analysts and Architects"
        />
        <link rel="icon" href="/favicon.ico" />
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
        <p>
          Also make sure to follow me on the following platforms:
          <ul>
            <a href="https://www.twitter.com/alexmercedcoder">
              <li>Twitter (General Development account)</li>
            </a>
            <a href="https://www.twitter.com/amlakehouse">
              <li>Twitter (Data Engineering Account)</li>
            </a>
            <a href="https://www.linkedin.com/in/alexmerced">
              <li>LinkedIn</li>
            </a>
            <a href="https://www.instagram.com/alexmercedcoder">
              <li>Instagram</li>
            </a>
            <a href="https://www.github.com/alexmercedcoder">
              <li>Github</li>
            </a>
            <a href="https://www.youtube.com/c/AlexMercedFullStackDeveloper">
              <li>Youtube.com</li>
            </a>
            <a href="https://odysee.com/@alexmercedcoder:e">
              <li>Odysee (Alternative Video Network)</li>
            </a>
            <a href="https://indieweb.social/@alexmerced">
              <li>Mastodon (Twitter Alternative)</li>
            </a>
            <a href="https://open.spotify.com/show/3KHzqR9eFW6bJ1Tqoh2juM">
              <li>DataNation Podcast</li>
            </a>
            <a href="https://open.spotify.com/show/04ZuSb96sicLYm9xb3NpXC">
              <li>Web Dev 101 Podcast</li>
            </a>
            <a href="https://www.grokoverflow.com">
              <li>GrokOverflow - Content for Devs</li>
            </a>
          </ul>
        </p>
      </main>
    </div>
  );
}
