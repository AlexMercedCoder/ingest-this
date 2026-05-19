import Head from 'next/head'
import styles from '../styles/Header.module.css'
import Link from 'next/link'
import Script from 'next/script'
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";

import { useState, useEffect } from "react";
import SearchModal from "./SearchModal";

function Header (props){
    const router = useRouter();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchPosts, setSearchPosts] = useState([]);

    // Prefetch search data when user hovers or opens
    const fetchSearchData = async () => {
        if (searchPosts.length > 0) return;
        const res = await fetch("/api/search");
        const data = await res.json();
        setSearchPosts(data);
    };

    return (
     <>
      <header className={styles.header}>
                <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-VV24N90YMR"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VV24N90YMR');
        `}
      </Script>
        <Head>
        <link rel="canonical" href={`https://ingestthis.com${router.asPath.split("?")[0]}`} />
        <meta property="og:site_name" content="IngestThis" />
        <link rel="alternate" type="application/rss+xml" title="IngestThis RSS Feed" href="/feed.xml" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/agate.min.css"/>
        </Head>
        <div id="logo" style={{display:'flex', alignItems:'center'}}>
          <Link href="/" style={{display:'flex', alignItems:'center', gap:'10px', textDecoration:'none'}}>
            {/* Data-pipeline icon */}
            <svg width="40" height="40" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{flexShrink:0}}>
              <rect x="1" y="1" width="12" height="4" rx="1.5" stroke="#bbb2ce" strokeWidth="1.5"/>
              <rect x="1" y="9" width="12" height="4" rx="1.5" stroke="#bbb2ce" strokeWidth="1.5"/>
              <rect x="1" y="17" width="12" height="4" rx="1.5" stroke="#bbb2ce" strokeWidth="1.5"/>
              <path d="M17 11h4M17 11l-2.5-2.5M17 11l-2.5 2.5" stroke="#bbb2ce" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {/* Wordmark */}
            <span style={{
              fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif",
              fontWeight: 700,
              fontSize: '3rem',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              userSelect: 'none',
            }}>
              <span style={{color:'#bbb2ce'}}>Ingest</span><span style={{color:'#e4b976'}}>This</span>
            </span>
          </Link>
        </div>
        <nav className={styles.nav}>
            <button 
                className={styles.searchTrigger}
                onClick={() => {
                    fetchSearchData();
                    setIsSearchOpen(true);
                }}
                onMouseEnter={fetchSearchData}
                aria-label="Search"
            >
                🔍
            </button>
            <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
            <a href="https://join.slack.com/t/datanationcom-gti9492/shared_invite/zt-12xrk4qmd-y~6jUFFd7kdaLhgLURKwoA"><div className={styles.link}>COMMUNITY</div></a>
            <a href="https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF?si=9b37b1ba28e2444b"><div className={styles.link}>PODCAST</div></a>
            <ThemeToggle />
        </nav>
    </header>
    {isSearchOpen && <SearchModal posts={searchPosts} onClose={() => setIsSearchOpen(false)} />}
    </>
    );
}

export default Header