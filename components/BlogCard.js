import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Blog.module.css";

export default function BlogCard({ post }) {
  const { title, description, date, bannerImage, author } = post.frontmatter;
  const { slug } = post;

  return (
    <article className={styles.card}>
      <Link href={`/posts/${slug}`}>

        <div className={styles.cardContent}>
          <div className={styles.cardMeta}>
            <span>{date}</span> • <span>{author}</span>
          </div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardExcerpt}>{description?.substring(0, 120)}...</p>
        </div>
      </Link>
    </article>
  );
}
