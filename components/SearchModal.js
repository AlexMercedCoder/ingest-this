import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import styles from "../styles/SearchModal.module.css";

export default function SearchModal({ posts, onClose }) {
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const fuseOptions = {
    keys: ["frontmatter.title", "frontmatter.tags", "frontmatter.description"],
    threshold: 0.3,
  };

  useEffect(() => {
    if (inputRef.current) {
        inputRef.current.focus();
    }
    
    const handleEsc = (e) => {
        if (e.key === "Escape") onClose();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const search = (e) => {
    const term = e.target.value;
    if (!term) {
        setResults([]);
        return;
    }

    const fuse = new Fuse(posts, fuseOptions);
    const result = fuse.search(term);
    setResults(result.map(r => r.item).slice(0, 5));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
            <input 
                ref={inputRef}
                type="text" 
                placeholder="Search articles..." 
                className={styles.input}
                onChange={search}
            />
            <button onClick={onClose} className={styles.closeBtn}>&times;</button>
        </div>
        <div className={styles.results}>
            {results.length > 0 ? (
                results.map(post => (
                    <Link href={`/posts/${post.slug}`} key={post.slug} className={styles.resultItem} onClick={onClose}>
                        <h4>{post.frontmatter.title}</h4>
                        <p>{post.frontmatter.description?.substring(0, 100)}...</p>
                    </Link>
                ))
            ) : (
                <div className={styles.empty}>
                    Type to search
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
