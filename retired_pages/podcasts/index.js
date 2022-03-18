import Head from 'next/head'
import styles from "../../styles/Other.module.css"

export default function Podcasts() {
  return (<main className={styles.main}>
    <Head>
        <title>GrokOverflow - developer podcast listings</title>
        <meta name="description" content="GrokOverflow - listing of podcasts for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1>Development Podcasts</h1>
    <h3>Make sure to subscribe to my podcasts on iTunes/Stitcher/Spotify</h3>

    <ul>
      <a href="https://open.spotify.com/show/1kMcquypdIElTu4Nu98XPM"><li>Web Dev 101 Podcast</li></a>
      <a href="https://open.spotify.com/show/3v0FiFQ4cssESk9SxKmVfJ"><li>DataNation (data engineering, analytics and science)</li></a>
    </ul>

    <h4>Other Great Podcasts (Start your own easily using Anchor.fm)</h4>
    <ul>
      <li>
        Syntax
      </li>
      <li>
        HTML All the Things
      </li>
      <li>
        Javscript Jabber
      </li>
      <li>
        Daily Tech News Show
      </li>
      <li>
        The Vanilla JS Podcast
      </li>
      <li>
        The Data Engineering Show
      </li>
      <li>
        Web Rush
      </li>
      <li>
        Dev Theory
      </li>
      <li>
        JS Party
      </li>
      <li>
        Data Engineering Podcast
      </li>
      <li>
        Linux Unplugged
      </li>
      <li>
        This Week in Tech
      </li>
      <li>
        Azure DevOps Podcast
      </li>
      <li>
        AWS Podcast
      </li>
      <li>
        This Week in Linux
      </li>
      <li>
        The Cloudcast
      </li>
      <li>
        Svelte Radio
      </li>
      <li>
        devMode.fm
      </li>
      <li>
        Command Line Heroes
      </li>
      <li>
        The Azure Podcast
      </li>
      <li>
        Kubernetes Podcast
      </li>

    </ul>
  </main>)
}