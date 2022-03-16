import Head from "next/head";
import videoData from "../../data/data";
import styles from "../../styles/Other.module.css"

export default function Videos({ videoData }) {
  return (
    <main className={styles.main}>
          <Head>
        <title>GrokOverflow - developer video playlists</title>
        <meta name="description" content="GrokOverflow - video playlists for developers on topics like frontend, backend, data, deployment and more." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Video Playlists</h1>
      {videoData.map((v) => {
        return (
          <div key={v.title}>
            <h3>{v.title}</h3>
            <ul>
              {v.playlists.map((p) => {
                return (
                  <a href={p.url} key={p.title}>
                    <li>{p.title}</li>
                  </a>
                );
              })}
            </ul>
          </div>
        );
      })}
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {
      videoData,
    },
  };
}
