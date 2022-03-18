import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

function Header (props){
    return <header className={styles.header}>
        <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/agate.min.css"/>
        </Head>
        <div id="logo">
        <Link href="/"><Image src={"/images/ig-transparent.PNG"} alt="IngestThis Logo" height={100} width={300}/></Link>
        </div>
        <nav className={styles.nav}>
            <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
            <a href="https://join.slack.com/t/datanationcom-gti9492/shared_invite/zt-12xrk4qmd-y~6jUFFd7kdaLhgLURKwoA"><div className={styles.link}>COMMUNITY</div></a>
        </nav>
    </header>
}

export default Header