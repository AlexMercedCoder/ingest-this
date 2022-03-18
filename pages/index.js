import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GrokOverflow - tutorials, podcasts and videos for developers</title>
        <meta name="description" content="GrokOverflow - tutorials, podcasts and videos for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to GrokOverflow!</h1>
        <h2>Content for devs, coders and engineers</h2>
        <p> My name is Alex Merced (AlexMercedCoder.com) and on this website you willll find lots of blogs, videos and podcasts on all sorts of different types of software development. Check out the blog section and feel free to click on any category, tag or author to quickly find the blog post your looking for.</p>
        <p>Guest submissions are welcome. Pitch me your idea by emailing me at alex@grokoverflow.com or message me in the devNursery slack community linked in the navigation.</p>
        <p>
          Also make sure to follow me on the following platforms:
          <ul>
            <a href="https://www.twitter.com/alexmercedcoder"><li>Twitter (General Development account)</li></a>
            <a href="https://www.twitter.com/amlakehouse"><li>Twitter (Data Engineering Account)</li></a>
            <a href="https://www.linkedin.com/in/alexmerced"><li>LinkedIn</li></a>
            <a href="https://www.instagram.com/alexmercedcoder"><li>Instagram</li></a>
            <a href="https://www.github.com/alexmercedcoder"><li>Github</li></a>
            <a href="https://www.youtube.com/c/AlexMercedFullStackDeveloper"><li>Youtube.com</li></a>
            <a href="https://odysee.com/@alexmercedcoder:e"><li>Odysee (Alternative Video Network)</li></a>
            <a href="https://indieweb.social/@alexmerced"><li>Mastodon (Twitter Alternative)</li></a>
          </ul>
        </p>
      </main>
    </div>
  )
}
