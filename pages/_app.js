import "../styles/globals.css";
import Layout from "../components/Layout";
import { Inter, Merriweather } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-body",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${inter.variable} ${merriweather.variable}`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
