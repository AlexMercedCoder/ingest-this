import network from "../network/network.json";
import styles from "../styles/Footer.module.css";

// Network links come from network/network.json (generated from the entity
// layer); this site is retired, so the footer is the network and nothing else.
function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.run} aria-label="The Alex Merced Network">
        {network.footer.groups.map((group) => (
          <div key={group.title} className={styles.group}>
            <h2 className={styles.runTitle}>{group.title}</h2>
            <ul className={styles.runList}>
              {group.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className={styles.link}>
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className={styles.allSites}>
          <a href={network.footer.allSitesUrl} className={styles.link}>
            {network.footer.allSitesLabel}
          </a>
        </p>
      </nav>

      <div className={styles.base}>
        <p className={styles.disclaimer}>
          The views, thoughts, and opinions expressed on this site belong solely
          to Alex Merced and do not represent the views of any organization or
          employer.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
