import Head from "next/head";
import Image from "next/image";
import videoData from "./data";

export default function Videos({ videoData }) {
  return (
    <main>
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
