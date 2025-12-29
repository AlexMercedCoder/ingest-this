import { useState } from "react";
import styles from "../styles/CopyButton.module.css";

export default function CopyButton({ text }) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <button className={styles.copyButton} onClick={copy} aria-label="Copy code">
      {isCopied ? "✓ Copied" : "Copy"}
    </button>
  );
}
