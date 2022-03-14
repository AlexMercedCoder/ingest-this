import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Footer.module.css'
import Link from 'next/link'

function Footer (props){
    return <footer className={styles.footer}>copyright 2022 by Alex Merced of AlexMercedCoder.com</footer>
}

export default Footer