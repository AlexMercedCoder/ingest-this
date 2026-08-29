import Head from "next/head";
import books from "../data/books.json";
import styles from "../styles/Books.module.css";

export default function Books() {
  const { intro, books: list, count, totalInCatalog, catalog } = books;

  return (
    <>
      <Head>
        <title>Books by Alex Merced</title>
        <meta name="description" content={intro} />
      </Head>

      <main className={styles.page}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Books by Alex Merced</p>
          <h1>Read further</h1>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.meta}>
            {count} of {totalInCatalog} titles.{" "}
            <a href={catalog} target="_blank" rel="noopener noreferrer">
              See the complete catalog
            </a>
          </p>
        </header>

        <ul className={styles.list}>
          {list.map((book) => (
            <li className={styles.item} key={book.slug}>
              <a
                className={styles.cover}
                href={book.canonicalPage}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img src={book.cover} alt="" loading="lazy" decoding="async" />
              </a>
              <div>
                <h2 className={styles.title}>
                  <a href={book.canonicalPage} target="_blank" rel="noopener noreferrer">
                    {book.title}
                  </a>
                </h2>
                {book.publisher ? <p className={styles.publisher}>{book.publisher}</p> : null}
                <p className={styles.description}>{book.description}</p>
                <p className={styles.links}>
                  <a href={book.canonicalPage} target="_blank" rel="noopener noreferrer">
                    Details
                  </a>
                  <a href={book.amazon} target="_blank" rel="noopener noreferrer">
                    Buy on Amazon
                  </a>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
