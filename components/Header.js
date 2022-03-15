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
        <Link href="/"><Image src={"/images/banner-logo-trans.PNG"} alt="GrokOverflow Logo" height={100} width={300}/></Link>
        </div>
        <nav className={styles.nav}>
            <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
            <Link href="/podcasts"><div className={styles.link}>PODCASTS</div></Link>
            <Link href="/video"><div className={styles.link}>VIDEOS</div></Link>
            <a href="https://join.slack.com/t/amwebdev/shared_invite/enQtNzc4NDA3MDU3MDE0LTZjNjIyZmQ3MzA5Y2Q3MWUwZjk3NTIyYjliOThlMWFjNTFkYWM1OGUxN2Y3NGExNGVhOGIzZTg0YTJjZTk5NDA"><div className={styles.link}>COMMUNITY</div></a>
        </nav>
    </header>
}

export default Header