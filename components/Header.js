import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Header.module.css'
import Link from 'next/link'

function Header (props){
    return <header className={styles.header}>
        <div id="logo">
    <Image src={"/images/banner-logo-trans.PNG"} alt="GrokOverflow Logo" height={100} width={300}/>
        </div>
        <nav className={styles.nav}>
            <Link href="/blog"><div className={styles.link}>BLOG</div></Link>
            <Link href="/blog"><div className={styles.link}>PODCASTS</div></Link>
            <Link href="/blog"><div className={styles.link}>VIDEOS</div></Link>
            <a href="https://join.slack.com/t/amwebdev/shared_invite/enQtNzc4NDA3MDU3MDE0LTZjNjIyZmQ3MzA5Y2Q3MWUwZjk3NTIyYjliOThlMWFjNTFkYWM1OGUxN2Y3NGExNGVhOGIzZTg0YTJjZTk5NDA"><div className={styles.link}>COMMUNITY</div></a>
        </nav>
    </header>
}

export default Header