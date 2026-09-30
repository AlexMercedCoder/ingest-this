// IngestThis is retired as an article site (decision D1, 2026-09-29): every post
// 301s to its canonical copy (see netlify.toml), so llms.txt only says where
// the articles went.
const fs = require("fs");

const body = `# IngestThis (retired)
> IngestThis was one of Alex Merced's article sites. It no longer publishes articles. Every former post URL on https://ingestthis.com redirects (301) to the canonical copy of that article on one of the sites below.

Author: Alex Merced, Head of Developer Relations at Dremio (https://alexmerced.com)

## Where the articles live now
- [Alex Merced's Lakehouse Blog](https://iceberglakehouse.com/): Apache Iceberg, lakehouse catalogs, table formats, and data engineering reference guides
- [Data Lakehouse Hub](https://datalakehousehub.com/): lakehouse news and roundups, agentic AI, AI coding agent guides, and community events
- [Coding Tutorials Blog](https://tuts.alexmercedcoder.dev/): programming tutorials in JavaScript, React, Node.js, Python, Ruby, Go, Rust, and more

## More
- [Alex Merced](https://alexmerced.com/)
- [Books by Alex Merced](https://books.alexmerced.com/)
- [All of Alex's sites](https://alexmerced.com/network.html)
`;

fs.writeFileSync("./public/llms.txt", body);
console.log("Wrote retired-site llms.txt");
